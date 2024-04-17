FROM node:20
WORKDIR /app
COPY package*.json ./
COPY .development.env ./
RUN npm install
COPY . .
EXPOSE 5004
CMD ["npm", "start:docker"]
