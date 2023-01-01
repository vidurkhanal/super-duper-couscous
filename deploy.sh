# /bin/bash

cd server
yarn build:ts
docker build -t vidurkhanal/kpass12:latest .
docker push vidurkhanal/kpass12:latest
cd
ssh -i .ssh/docean root@137.184.194.64 "docker pull vidurkhanal/kpass12:latest && docker tag vidurkhanal/kpass12:latest dokku/api:latest && dokku tags:deploy api latest"