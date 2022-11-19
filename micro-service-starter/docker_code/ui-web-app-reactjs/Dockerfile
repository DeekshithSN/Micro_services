FROM node:8.7-alpine
LABEL maintainer="deekshith@gmail.com"
RUN useradd uiapp 
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
USER uiapp
CMD ["npm","start"]