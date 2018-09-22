import Eos from "eosjs";

export const seller = {
    accountName: "dtradeseller",
    pub: 'EOS5x2uxVezW7e4S5TQu9N7iFhZdFdzmkZzrSFcUt2xMqPcEVmQ2H',
    priv: '5KCseM9bWMwmP8tL8C1MwcuVDGYHjwoNffBsD9gbAYhrBSrEqaU'
}

export const buyer = {
    accountName: "dtradebuyer1",
    pub: 'EOS77acvYqW1VZo6Zm4PynAdeiJMLmtgW8cxxUVPAsqg4i34GjYRC'
    priv: '5JXzKFmdWPMqorB47T1YDfKkVrvcSJ8j31HSLYv3iwd3uFFQ393'
}

const config = {
  chainId: "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191", // 32 byte (64 char) hex string
  keyProvider: [seller.priv, buyer.priv], // WIF string or array of keys..
  httpEndpoint: "http://api-kylin.starteos.io",
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
};

export default Eos(config);
