import { encrypt } from "eos-communication-lib";

export const tracking = {
    provider: "UPS",
    reference: "A1399877333"
};

export const seller = {
    username: "dtradeseller",
    pub: "EOS5x2uxVezW7e4S5TQu9N7iFhZdFdzmkZzrSFcUt2xMqPcEVmQ2H",
    priv: "5KCseM9bWMwmP8tL8C1MwcuVDGYHjwoNffBsD9gbAYhrBSrEqaU",
    tracking,
};

export const shipping = {
    name: "Buyer McBuyer",
    company: "",
    address1: "123 Fake Street",
    address2: "Unit 456",
    city: "Calgary",
    state: "Alberta",
    country: "Canada",
    postcode: "12345",
    instructions: "Leave under my mat"
}

export const buyer = {
    username: "dtradebuyer1",
    pub: "EOS77acvYqW1VZo6Zm4PynAdeiJMLmtgW8cxxUVPAsqg4i34GjYRC",
    priv: "5JXzKFmdWPMqorB47T1YDfKkVrvcSJ8j31HSLYv3iwd3uFFQ393",
    shipping,
};

export const trackingEncrypted = encrypt(seller.priv, buyer.pub, JSON.stringify(tracking), -1);
export const shippingEncrypted = encrypt(buyer.priv, seller.pub, JSON.stringify(shipping), -1);
