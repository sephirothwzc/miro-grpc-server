FROM sandrokeil/typescript:latest

WORKDIR /usr/src/app
COPY package.json .
RUN yarn config set registry https://registry.npm.taobao.org && yarn install
COPY . .

CMD [ "yarn","start" ]