FROM node:22-bullseye
WORKDIR /app

COPY . .
RUN npm install

ENV NODE_ENV=production


EXPOSE 3000

ENV PORT=3000

CMD ["node", "index.js"]