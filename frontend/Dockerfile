FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Run Vite dev server bound to all interfaces
CMD ["npm", "run", "dev", "--", "--host"]
