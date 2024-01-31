FROM node:21.4.0-alpine
WORKDIR /app/idregion
RUN npm install -g nodemon
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:model
EXPOSE 4000
CMD [ "npm", "start" ]