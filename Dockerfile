FROM node:20
WORKDIR /app
COPY package*.json ./
COPY .env ./
RUN npm install
COPY . .
EXPOSE 5020
CMD ["npm", "start:docker"]
