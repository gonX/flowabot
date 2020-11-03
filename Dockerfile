FROM node:10-slim

WORKDIR /usr/src/app

# for alpine
# RUN apk --no-cache add git python3 pkgconfig pixman-dev cairo-dev pango-dev make g++ libjpeg-turbo-dev librsvg-dev giflib-dev

RUN apt-get update && apt-get install -y git python3 pkg-config libpixman-1-dev libcairo2-dev make g++ libjpeg62-turbo-dev librsvg2-dev libgif-dev && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

# user may need to run `node node_modules/highcharts-export-server/build.js` and accept license manually
RUN echo -e "yes\n\n\n\n\nyes\n\n\n\n" |npm install

COPY . .

VOLUME /usr/src/app/scratch

CMD npm start
