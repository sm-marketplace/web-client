# #################
# # Build the app #
# #################
# FROM node:16-alpine as build
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm install -g @angular/cli
# RUN ng build --configuration development --output-path=/dist

################
# Run in NGINX #
################
FROM nginx:alpine

COPY dist/web-client /usr/share/nginx/html
COPY ci/templates /app/ci/templates

CMD [\
"/bin/sh",  "-c", "\
envsubst < /app/ci/templates/__env.js       > /usr/share/nginx/html/__env.js      &&\
envsubst < /app/ci/templates/__contract.js  > /usr/share/nginx/html/__contract.js &&\
exec nginx -g 'daemon off;'\
"]