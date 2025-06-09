# Use the official Node.js image
FROM node:20

# Set working directory in container
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Run Prisma generate
RUN npx prisma generate

# Build TypeScript to dist/
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Chang the last line to "npm start" to run the app in production (29/05)
CMD ["npm", "run", "dev"]
