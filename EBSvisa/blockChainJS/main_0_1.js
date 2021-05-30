const SHA256 = require("crypto-js/sha256");
class Block {
    constructor(index, timestamp, data, previousHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash() {
        return SHA256(
            this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce
        ).toString();
    }
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
            //console.log(this.hash);
        }
        console.log("block is mined " + this.hash);
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesesBlock()];
        this.difficulty = 5;
    }
    createGenesesBlock() {
        return new Block(0, "20/02/2020", "genesis block", "0");
    }
    getlatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getlatestBlock().hash;
        //newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let savajeecoin = new BlockChain();
console.log("mining block 1.....");
savajeecoin.addBlock(new Block(1, "28/02/2020", { amount: 4 }));
console.log("mining block 2.....");
savajeecoin.addBlock(new Block(2, "29/02/2020", { amount: 10 }));

console.log(JSON.stringify(savajeecoin, null, 4));
//console.log("if the chain valid?" + savajeecoin.isChainValid());
