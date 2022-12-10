@echo off
set IMAGE=rogrp6/smmp-web-client:dev
docker build . -t %IMAGE%
docker push %IMAGE%