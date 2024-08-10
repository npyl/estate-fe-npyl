# base image
FROM --platform=linux/amd64 node:18-alpine
ENV NODE_OPTIONS="--max-old-space-size=8192"
# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src
# copy source files
COPY . /usr/src
RUN rm -rf .next node_modules package-lock.json yarn.lock
# install dependencies (See doc/build.md for build errors and use --ignore-optional for yarn)
RUN npm i
# start app
RUN npm run build
EXPOSE 3000
CMD npm start