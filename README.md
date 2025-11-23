# simpleApi

docker network create mynet
docker volume create mysql_data
docker build -t simpleapi .


docker run -d \
  --name mysql \
  --network mynet \
  --restart always \
  -e MYSQL_ROOT_PASSWORD=rootpass \
  -e MYSQL_DATABASE=testdb \
  -p 3306:3306 \
  -v mysql_data:/var/lib/mysql \
  mysql:8.0



docker run -d \
  --name simpleapi \
  --network mynet \
  --restart always \
  -p 3000:3000 \
  -e PORT=3000 \
  -e DB_HOST=mysql \
  -e DB_USER=root \
  -e DB_PASSWORD=rootpass \
  -e DB_NAME=testdb \
  api_mysql_image



