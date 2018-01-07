FROM node:boron

ADD package.json /tmp/package.json
RUN cd /tmp && npm install

RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
WORKDIR /opt/app
ADD . /opt/app/

ENV locationServiceUrl=http://169.51.16.3:31437
ENV streamServiceUrl=http://169.51.16.3:31017
ENV streamServiceWs=ws://169.51.16.3:31017

EXPOSE 8080

CMD ["npm", "run", "dev"]  