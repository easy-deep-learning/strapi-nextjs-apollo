# Install dependencies only when needed
FROM node:14-alpine AS deps
# One common issue that may arise is a missing shared library required for use of process.dlopen.
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4 138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
# strapi deps
# https://github.com/strapi/strapi-docker/blob/master/base/alpine/Dockerfile
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash
RUN apk --no-cache --virtual build-dependencies add python make g++
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:14-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# Production image, copy all the files and run next
FROM node:14-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S strapi -u 1001

COPY --from=builder /app/api ./api
COPY --from=builder /app/build ./build
COPY --from=builder /app/config ./config
COPY --from=builder /app/exports ./exports
COPY --from=builder /app/extensions ./extensions
COPY --from=builder /app/public ./public
COPY --from=builder /app/favicon.ico ./favicon.ico
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER strapi

EXPOSE 1337

CMD ["yarn", "start"]
