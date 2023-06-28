FROM node:18
WORKDIR /app
COPY . .

EXPOSE 3000
ENV NODE_ENV=product
RUN npm install
CMD ["npm","run","start"]