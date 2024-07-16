# base image
FROM --platform=linux/amd64 node:18-alpine
ENV NODE_OPTIONS="--max-old-space-size=8192"
# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src
# copy source files
COPY . /usr/src
# install dependencies
RUN yarn install
# start app
RUN yarn build
EXPOSE 3000
CMD yarn start