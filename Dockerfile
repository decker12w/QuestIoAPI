# Fase de construção
FROM node:21 as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install
COPY . .

RUN npx prisma generate
RUN npm run build
RUN npm ci --only=production 

# Fase de produção
FROM node:21-alpine3.20

WORKDIR /app

COPY --from=build /app/node_modules/@fastify/swagger-ui/static /static
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json

EXPOSE 4000

CMD [ "npm" ,"run","start:build" ]
