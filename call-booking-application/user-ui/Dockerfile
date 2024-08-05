FROM node:17.9.0-slim

LABEL maintainer="mellitus okoro"

RUN useradd userui

WORKDIR /sr/src/app

COPY . . 

RUN npm install

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

EXPOSE 3000

USER userapi

CMD [ "npm","start" ]
