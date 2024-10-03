# base image
FROM --platform=linux/amd64 node:18-alpine AS base
# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src
# copy source files
COPY . /usr/src
RUN rm -rf .next node_modules package-lock.json yarn.lock
# install dependencies
RUN npm i -g only-allow
RUN npm i --omit=dev

FROM base AS builder
ENV NODE_OPTIONS="--max-old-space-size=3584"
RUN npm run build

FROM builder AS runner
EXPOSE 3000
CMD npm start