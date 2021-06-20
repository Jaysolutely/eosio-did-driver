FROM node:16.3.0
LABEL repository="git@github.com:Jaysolutely/eosio-did-driver-proposal.git"

USER root

ADD LICENSE package.json package-lock.json README.md ./
ADD src/ src/
RUN npm ci --production

EXPOSE 8081

ENTRYPOINT ["node", "/src/index.js"]
