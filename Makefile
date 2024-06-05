build:
	docker build -t papertech-app .
run:
	docker run -it -d -p 8500:8500 -p 8000:8000 --name papertech-app --env-file .env papertech-app
exec:
	docker exec -it papertech-app /bin/bash
logs:
	docker logs papertech-app
ps:
	docker ps -a
img:
	docker images
rm:
	docker rm -f $$(docker ps -aq)
rmi:
	docker rmi $$(docker images -q)