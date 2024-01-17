FROM node:21-slim
ENV NODE_VERSION 21
WORKDIR /frontend  
# COPY ./frontend /frontend
EXPOSE 3000
ENV CI=true
COPY ./package.json /frontend/package.json
# RUN apt-get update && apt-get install python -y
RUN yarn install
# CMD [ "yarn", "build" ]


