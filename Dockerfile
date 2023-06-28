FROM node:18
WORKDIR /workdir
COPY . .

EXPOSE 3000
ENV NODE_ENV=product

CMD ["sh", "-c", "npm run $NODE_ENV"]