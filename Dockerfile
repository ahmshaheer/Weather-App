# Stage 1
# FROM node:18-alpine 
# WORKDIR /app
# COPY package.json .
# RUN npm install 
# COPY . .
# CMD ["npm","run","dev","start"]


# Use BuildKit for better performance and debugging
# syntax=docker/dockerfile:1.2

# Stage 1: Build Stage
FROM node:18-alpine 

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json .

# Install dependencies with npm
# Using a different registry to avoid potential issues with the default one
RUN npm cache clean --force \
    && npm install --registry=https://registry.npmjs.org/ --verbose || (mkdir -p /app/npm-debug && cp /root/.npm/_logs/* /app/npm-debug/ && exit 1)

# Copy all remaining application files
COPY . .

# Command to run the application
CMD ["npm", "run", "dev"]
