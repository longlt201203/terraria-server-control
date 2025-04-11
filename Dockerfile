FROM node:22

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND yarn.lock are copied
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["yarn", "start"]