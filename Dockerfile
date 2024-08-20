FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma Client
RUN npx prisma generate --schema=src/prisma/schema.prisma

ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3000

CMD ["npm", "run", "dev"]
