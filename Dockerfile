FROM mhart/alpine-node:0.10.46

RUN mkdir -p /opt/shib

COPY . /opt/shib

WORKDIR /opt/shib

RUN npm install
RUN mkdir /mnt/shib
EXPOSE 80

CMD [ "npm", "start" ]
