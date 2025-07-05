import { buildServer } from '@utils/server';

async function startService() {
  const fastifyInstance = await buildServer();

  try {
    const PORT = process.env.PORT || 0;

    await fastifyInstance.listen({
      port: +PORT,
      host: '0.0.0.0'
    });
  } catch (err) {
    fastifyInstance.log.error(err);
  }
};

startService();