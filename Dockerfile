FROM ubuntu:latest
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["*.js", "*.json,", "./"]
RUN apt-get update -y
RUN apt-get install git curl -y 

COPY . .
RUN curl -fsSL https://deb.nodesource.com/setup_16.x -o blarg.sh 
RUN bash blarg.sh 
RUN apt-get install -y nodejs build-essential apt-utils
RUN npm i yarn -g 
RUN yarn  && mv node_modules ../
EXPOSE 3000
EXPOSE 3001 
EXPOSE 3002

CMD ["yarn", "start"]
