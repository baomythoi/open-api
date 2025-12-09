import BaseCommon from '@core/base.common';
import { connect, Connection, Channel } from 'amqplib';

/* eslint-disable no-console */
export default new class RabbitMQService {
  private connection!: Connection;
  private channelWrapper!: Channel;

  private async reconnect() {
    BaseCommon.logger.info('Connecting to RabbitMQ...');

    try {
      const heartbeat = 60; // Set heartbeat interval in seconds
      this.connection = await connect(process.env.RABBITMQ_URL || '', { heartbeat });
      BaseCommon.logger.info('RabbitMQ connected ✓');

      this.connection.on('error', (error) => {
        BaseCommon.logger.error(`RabbitMQ connection error ✘: ${error?.message}`);
      });

      this.connection.on('close', () => {
        BaseCommon.logger.error('RabbitMQ Connection closed ✘. Attempting to reconnect...');
        setTimeout(() => this.reconnect(), 5000); // Retry after 5 seconds
      });

      // Create a new channel
      this.channelWrapper = await this.connection.createChannel();
      BaseCommon.logger.info('RabbitMQ channel created ✓');

    } catch (error: any) {
      BaseCommon.logger.error(`Failed to connect to RabbitMQ ✘: ${error?.message}`);
      setTimeout(() => this.reconnect(), 5000); // Retry connection
    }
  }

  getChannel = async (): Promise<Channel> => {
    if (!this.connection || !this.channelWrapper) {
      await this.reconnect(); // Attempt to connect if not connected
    }

    // If the connection is established, check the channel
    if (this.channelWrapper && !this.channelWrapper.connection) {
      BaseCommon.logger.error('RabbitMQ channel is closed ✘. Recreating channel...');
      this.channelWrapper = await this.connection.createChannel();
    }

    return this.channelWrapper;
  }

  createChannel = async (): Promise<Channel> => {
    const channelWrapper = await this.connection.createChannel();
    return channelWrapper;
  }

  closeConnection = async (): Promise<void> => {
    if (this.connection) {
      await this.connection.close();
    }
  }
}