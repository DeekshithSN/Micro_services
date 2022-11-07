FROM node:17.9.0-slim
LABEL maintainer="DeekshithSN"
RUN useradd userapi
WORKDIR /app
COPY . .
RUN npm install 
EXPOSE 1004
USER userapi
ENV MONGO_URL=""
ENV ADMIN_EMAIL=""
CMD ["npm","start"]