# 1. Base images
FROM node:18.16.0

# 2. Package install
RUN apt -y update && apt -y upgrade && apt -y install git net-tools vim

# 3. Specify a working directory
WORKDIR '/root'

# 4. Config file copy
COPY nodejs.tar.gz .

# 5. Install express
RUN tar xvzf nodejs.tar.gz
WORKDIR '/root/node-js'
RUN npm install
RUN npm install -g nodemon

# 6. Port
EXPOSE 8500

# 7. Execution Program
CMD ["nodemon", "app.js"]