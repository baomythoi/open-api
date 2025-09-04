# -----------------------------
# Builder stage
# -----------------------------
FROM node:20.14.0-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Clean old build + build TypeScript
RUN yarn rimraf ./acme && yarn build


# -----------------------------
# Runner stage
# -----------------------------
FROM node:20.14.0-alpine AS runner

WORKDIR /usr/src/app

# Copy only needed files
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/yarn.lock ./
COPY --from=builder /usr/src/app/acme ./acme

# Install only production dependencies
RUN yarn install --frozen-lockfile --production

# Set environment variables
ARG PORT=9200
ENV PORT=${PORT}

EXPOSE ${PORT}

# Run app with yarn start
CMD ["yarn", "start"]