# /bin/bash

cd server
yarn build:ts
docker build -t vidurkhanal/kpass12:latest .
docker push vidurkhanal/kpass12:latest
ssh root@198.211.96.230 "docker pull vidurkhanal/kpass12:latest && docker tag vidurkhanal/kpass12:latest dokku/api:latest && dokku tags:deploy api latest"