FROM node:18

WORKDIR /app

COPY express-server/package*.json ./

RUN npm install

COPY express-server .

EXPOSE 3000

# Run server.js when the container launches
CMD ["npm", "start"]