# develop stage

# Use the official Node.js 14.17 image as the base image
FROM node:14.17 as develop-stage

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Vue CLI globally
RUN npm install -g @vue/cli

# Install project dependencies
# RUN npm install

# Copy the entire project to the working directory
COPY . .


# Start the Vue.js app
# CMD ["npm", "run", "serve"]


# teste stages
# build stage
FROM develop-stage as build-stage
RUN npm install
RUN vue build

# production stage
FROM nginx:1.21.0-alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]