# Use the official Node.js image
FROM node:16.17.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install dependencies with legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose port 3000 (default for React development server)
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
