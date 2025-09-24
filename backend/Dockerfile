FROM node:22

WORKDIR /usr/src/app

RUN apt update && apt install -y git


# Copy package.json and package-lock.json
# And install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

EXPOSE 3000
CMD [ "npm", "run", "dev" ]