# Use Node.js image as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies defined in package.json
RUN npm install

# Copy the entire application code to the working directory
COPY . .

# Run Prisma CLI to generate Prisma client after dependencies are installed
RUN npx prisma generate

# Expose port 3000 to allow access to the application from outside the container
EXPOSE 3000

# Specify the command to run the application when the container starts
CMD [ "npm", "run", "dev" ]
