# Use a Node base image
FROM node:20.5-slim

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY pccw-front/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY pccw-front ./

# Your app binds to port 3001, so expose this port
EXPOSE 3001

# Start the app
CMD ["npm", "start"]
