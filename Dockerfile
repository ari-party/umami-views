FROM node:22-alpine

RUN npm install -g pnpm

WORKDIR /server

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

CMD ["pnpm", "start"]
