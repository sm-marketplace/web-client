#################
# Build the app #
#################
FROM node:16-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm install -g @angular/cli
RUN ng build --configuration development --output-path=/dist

################
# Run in NGINX #
################
FROM nginx:alpine

COPY --from=build /dist /usr/share/nginx/html
COPY --from=build /app/ci/templates /app/ci

CMD [\
"/bin/sh",  "-c", "\
envsubst < /app/ci/__env.js       > /usr/share/nginx/html/__env.js      &&\
envsubst < /app/ci/__contract.js  > /usr/share/nginx/html/__contract.js &&\
exec nginx -g 'daemon off;'\
"]