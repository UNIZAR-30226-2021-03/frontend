# https://www.webuters.com/deploy-reactjs-with-docker/

### STAGE 1: BUILD ###
# Maybe use: node:9.11.1
FROM node as build
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
# ENV PATH  ?
COPY ./app/package.json /usr/src/app/package.json
#RUN npm install react-scripts -g --silent
# da error CRITICAL a veces si a veces no
RUN npm install -g npm
RUN npm install --silent
COPY ./app /usr/src/app
RUN ls /usr/src/app
#RUN rm /usr/src/app/package-lock.json
RUN ls /usr/src/app
RUN npm run build

### STAGE 2: PRODUCTION ###
FROM node
RUN mkdir -p /usr/src/app/build
WORKDIR /usr/src/app/build
COPY --from=build /usr/src/app/build /usr/src/app/build
EXPOSE 5000
CMD ["npx", "serve", "-s"]