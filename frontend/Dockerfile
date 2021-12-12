FROM node:15.11.0-alpine

WORKDIR /frontend

COPY ./package*.json ./

RUN npm install --verbose

COPY . ./
COPY ./localhost.pem ./
COPY ./localhost-key.pem ./
#COPY ../backend/localhost.pem ./
#COPY ../backend/localhost-key.pem ./

CMD [ "npm", "run", "start" ]