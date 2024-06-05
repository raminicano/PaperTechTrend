build:
	docker build -t nodejs .
run:
	docker run -it -d -p 8500:8500 --name nodejs --env-file .env nodejs
exec:
	docker exec -it nodejs /bin/bash
logs:
	docker logs nodejs
ps:
	docker ps -a
img:
	docker images
rm:
	docker rm -f $$(docker ps -aq)
rmi:
	docker rmi $$(docker images -q)