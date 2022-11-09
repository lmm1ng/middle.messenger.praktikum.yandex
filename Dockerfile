FROM node:16-alpine AS build

WORKDIR /web

#COPY dist/ /web
#COPY Dockerfile /web
#COPY node_modules/ /web
COPY package.json /web
COPY package-lock.json /web
#COPY README.md /web
COPY server.js /web
COPY src /web/src
#COPY test/ /web
COPY tsconfig.json /web
COPY webpack.config.js /web

RUN npm install && npm run build

EXPOSE 3000
ENV PORT=3000

CMD ["node", "./server.js"]
