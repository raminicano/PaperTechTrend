# 1. Base images
FROM node:18.16.0

# 2. Package install
RUN apt -y update && apt -y upgrade && apt -y install git net-tools vim

# 3. Specify a working directory
WORKDIR '/root'

# 4. Clone repository
RUN git clone https://github.com/raminicano/PaperTechTrend.git /root/app1 && \
    git clone https://github.com/wjdguswn1203/PaperTechTrend.git /root/app2 && \
    cd /root/app1 && npm install && \
    cd /root/app2 && npm install && \
    npm install -g nodemon

# 5. nodemon process start
COPY start.sh /root/app1/start.sh
RUN chmod +x /root/app1/start.sh

# 6. Port
EXPOSE 8500
EXPOSE 8000

# 7. Execution Program
CMD ["/root/app1/start.sh"]