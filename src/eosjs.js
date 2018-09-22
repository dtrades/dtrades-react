import Eos from "eosjs";
import { buyer, seller } from "./accounts";

export const contractName = "dtradesdapp1";

const config = {
  chainId: "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191", // 32 byte (64 char) hex string
  keyProvider: [seller.priv, buyer.priv], // WIF string or array of keys..
  httpEndpoint: "http://api-kylin.starteos.io",
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
};

export const eos = Eos(config);
