# Base image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json into the container
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
