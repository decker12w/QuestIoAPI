RUN npm run migrations:deploy
RUN npm run build
RUN npm ci --only=production && npm cache clean --force