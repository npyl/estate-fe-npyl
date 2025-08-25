# base image
FROM --platform=linux/amd64 node:20-alpine AS base
# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src
# copy source files
COPY . /usr/src
# install dependencies
RUN rm -rf .next node_modules package-lock.json yarn.lock \
    && npm i -g only-allow \
    && npm i --omit-dev 

FROM base AS builder
ENV NODE_OPTIONS="--max-old-space-size=5120"
RUN npm run build

FROM builder AS runner
EXPOSE 3000
CMD ["npm", "start"]
