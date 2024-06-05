#!/bin/bash

# first app background process
cd /root/app1
PORT=8500 nodemon app.js &

# second app background process
cd /root/app2/server
PORT=8000 nodemon app.js &

# background process
wait