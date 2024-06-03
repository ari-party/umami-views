# umami views

[![License](https://img.shields.io/github/license/ari-party/umami-views?style=for-the-badge)](./LICENSE)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Airbnb](https://img.shields.io/badge/Airbnb-%23ff5a5f.svg?style=for-the-badge&logo=Airbnb&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

graph with [umami](https://github.com/umami-software/umami) views data built on [star-history](https://github.com/star-history/star-history)

<img style="height: 400px" src="https://umami-views.astrid.exposed/svg?shareURL=https://eu.umami.is/share/LGazGOecbDtaIwDr/umami.is&theme=light" />

## usage

```bash
$ curl -G https://example.com/svg \
    # The share url provided by Umami
    -d 'shareURL=https://umami.is/share/abcdefghijklmnop/example.com' \
    # Either light or dark
    -d 'theme=light' \
    # Don't include if you don't want the svg to be transparent (value can be anything)
    -d 'transparent=1' \
```

the server sets the `cache-control` header to `max-age=3600, stale-while-revalidate=21600` so clients cache the response(s) for an hour and revalidate within 6.

## installation

### docker

```bash
# Pull the Docker image
$ docker pull ghcr.io/ari-party/umami-views:latest

$ docker run -d --name umami-views -p 8080:8080 ghcr.io/ari-party/umami-views:latest
# `-d detached`, it will run in the background
# `--name umami-views`, assign a name to prevent a random name
# `-p 8080:8080`, replace the lefthand 8080 with a port that you prefer,
#                 the server will be available on that port for you
```

### manual

```bash
# Clone the repository
$ git clone https://github.com/ari-party/umami-views.git

# Install the dependencies with pnpm (install with `npm i -g pnpm`)
$ pnpm install

# Copy the `.env.example` file as `.env` and edit the port to your wish

# Start the server
$ pnpm start
```
