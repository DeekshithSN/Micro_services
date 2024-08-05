FROM node:17.9.0-slim

LABEL maintainer="mellitus okoro"

RUN useradd userapi

WORKDIR /sr/src/app

COPY . . 

RUN npm install

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

EXPOSE 1004

USER userapi

ENV MONGO_URL=""

ENV ADMIN_EMAI=""

CMD [ "npm","start" ]

