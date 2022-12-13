FROM --platform=linux/amd64 node:18-slim

RUN mkdir -p /app
WORKDIR /app

COPY . ./

ENV NODE_ENV=production
ENV CI=true

RUN npm run client:install
RUN npm run client:build

RUN npm install

EXPOSE 8080
CMD ["npm", "run", "start"];