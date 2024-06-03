FROM node:22-alpine

WORKDIR /server

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
