# Use the official Node.js 14.17 image as the base image
FROM node:14.17

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Vue CLI globally
RUN npm install -g @vue/cli

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose the port that the Vue.js app will run on
EXPOSE 8080

# Start the Vue.js app
CMD ["npm", "run", "serve"]