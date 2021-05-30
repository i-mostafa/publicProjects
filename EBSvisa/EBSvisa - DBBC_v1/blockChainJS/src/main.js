const { BlockChain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;
ec = new EC("secp256k1");

const myKey1 = ec.keyFromPrivate("adminislam");
const myWallettAddress1 = myKey1.getPublic("hex");
const myKey2 = ec.keyFromPrivate("sperUser");
const myWallettAddress2 = myKey2.getPublic("hex");
const myKey3 = ec.keyFromPrivate("kareem");
const myWallettAddress3 = myKey3.getPublic("hex");

const myKey4 = ec.keyFromPrivate("kare4m");
const myWallettAddress4 = myKey4.getPublic("hex");

let ebsVisa = new BlockChain();

const tx1 = new Transaction(myWallettAddress1, myWallettAddress2, 70);
const tx2 = new Transaction(myWallettAddress2, myWallettAddress3, 50);
const tx3 = new Transaction(myWallettAddress3, myWallettAddress4, 30);
tx1.signTransaction(myKey1);
ebsVisa.addTransaction(tx1);
tx2.signTransaction(myKey2);
ebsVisa.addTransaction(tx2);
tx3.signTransaction(myKey3);
ebsVisa.addTransaction(tx3);

console.log("\n starting the miner..... ");

ebsVisa.minePendingTransactions(myWallettAddress1);
console.log(ebsVisa.getBalanceAddress(myWallettAddress1));
console.log(ebsVisa.getBalanceAddress(myWallettAddress2));
console.log(ebsVisa.getBalanceAddress(myWallettAddress3));

console.log(ebsVisa.getBalanceAddress(myWallettAddress4));
