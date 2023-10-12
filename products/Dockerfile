FROM node:18.10.0

WORKDIR /app/products

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8001

CMD ["npm", "start"]