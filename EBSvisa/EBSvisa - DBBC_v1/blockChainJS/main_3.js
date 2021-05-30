const SHA256 = require("crypto-js/sha256");
class transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
class Block {
    constructor(timestamp, transactions, previousHash = "") {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
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
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.mineReward = 100;
    }
    createGenesesBlock() {
        return new Block("20/02/2020", "genesis block", "0");
    }
    getlatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    /* addBlock(newBlock) {
        newBlock.previousHash = this.getlatestBlock().hash;
        //newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    } */
    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
        console.log("block successfully mined! ");
        this.chain.push(block);

        this.pendingTransactions = [new transaction(null, miningRewardAddress, this.mineReward)];
    }
    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }
    getBalanceAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }
                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
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

savajeecoin.createTransaction(new transaction("add1", "add2", 100));
savajeecoin.createTransaction(new transaction("add2", "add1", 50));

console.log("\n starting the miner..... ");
savajeecoin.minePendingTransactions("islam");
console.log(savajeecoin.getBalanceAddress("islam"));
console.log("\n starting the miner..... ");
savajeecoin.minePendingTransactions("islam");
console.log(savajeecoin.getBalanceAddress("islam"));
