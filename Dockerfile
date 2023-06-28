FROM node:18
COPY bin .
COPY config .
COPY public .
COPY env .
COPY src .
COPY package.json .
COPY package-lock.json .
COPY app.js .
COPY resource .

EXPOSE 3000
ENV NODE_ENV=product
RUN npm install
CMD ["npm","run","start"]