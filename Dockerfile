FROM node:22-alpine

RUN apk --no-cache add curl

RUN corepack enable pnpm

COPY . /server
WORKDIR /server

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile

CMD ["pnpm", "start"]
