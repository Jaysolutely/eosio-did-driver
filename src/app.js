const { Resolver } = require("did-resolver");
const eosio = require("eosio-did-resolver");
const express = require("express");

const app = express();
const resolver = new Resolver(eosio.getResolver());

app.get("/1.0/identifiers/*", (req, res) => {
  const did = /\/1.0\/identifiers\/(.*)/.exec(req.url)[1];
  console.log("Resolving DID: " + did);
  resolver
    .resolve(did)
    .then((result) => {
      const { error } = result.didResolutionMetadata;
      if (error) res.status(400).send(error);
      else res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err.message);
    });
});

module.exports = app;
