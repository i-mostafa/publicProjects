const { BlockChain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;
ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate("f7c6a47d273bf94fd2acd6cd7288b3987292daedffbc5f87452cbeb72f319951");
const myWallettAddress = myKey.getPublic("hex");

let savajeecoin = new BlockChain();

const tx1 = new Transaction(myWallettAddress, "public key goes here", 20);
tx1.signTransaction(myKey);
savajeecoin.addTransaction(tx1);

console.log("\n starting the miner..... ");
savajeecoin.minePendingTransactions(myWallettAddress);
console.log(savajeecoin.getBalanceAddress(myWallettAddress));
