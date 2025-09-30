# Use the official Node.js 18 image as base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Install serve to run the built application
RUN npm install -g serve

# Remove dev dependencies to reduce image size
RUN npm prune --production

# Expose port 8000
EXPOSE 8000

# Start the application
CMD ["serve", "-s", "dist", "-l", "8000"]
