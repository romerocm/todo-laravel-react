FROM node:18-alpine

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

EXPOSE 3000

# Use the new command to ensure host is set
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]