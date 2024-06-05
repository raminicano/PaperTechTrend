start: appdep appsvc appsrc
get: getdep getsvc getpod
getnode:
	kubectl get nodes
appdep:
	kubectl apply -f deployment.yaml
appsvc:
	kubectl apply -f service.yaml
appsrc:
	kubectl apply -f secret.yaml
getdep:
	kubectl get deployment -o wide
getsvc:
	kubectl get svc -o wide
getpod:
	kubectl get pods -o wide
delsvc:
	kubectl delete svc papertechtrend-service
deldep:
	kubectl delete deployment papertechtrend
delpod:
	kubectl delete pods -l app=papertechtrend --grace-period=0 --force