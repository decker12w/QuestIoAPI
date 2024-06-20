# Fase de construção
FROM node:21 as build

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build
RUN npm ci --only=production

# Fase de produção
FROM node:21-alpine3.20

WORKDIR /app

# Copie todos os arquivos necessários do build
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json
COPY --from=build /app/prisma ./prisma

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "start:migrate:prod"]

