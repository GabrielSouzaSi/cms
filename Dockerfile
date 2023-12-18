# develop stage

# Use the official Node.js 14.17 image as the base image
FROM node:14.17 as develop-stage

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Vue CLI globally
RUN npm install -g @vue/cli

# Copy the entire project to the working directory
COPY . .

# build stage
FROM develop-stage as build-stage
RUN npm install
RUN npm run build

# production stage
FROM nginx:1.21.0-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]