const SHA256 = require("crypto-js/sha256");
const EC = require("elliptic").ec;
ec = new EC("secp256k1");
class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
    calculateHash() {
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(singingKey) {
        if (singingKey.getPublic("hex") !== this.fromAddress) {
            throw new Error("you can't sign transactions for other wallets!");
        }
        const hashTx = this.calculateHash();
        const sig = singingKey.sign(hashTx, "base64");
        this.signature = sig.toDER("hex");
    }
    isValid() {
        if (this.fromAddress === null) return true;
        if (!this.signature || this.signature.length === 0) {
            throw new Error("no signature in this transaction");
        }
        const publicKey = ec.keyFromPublic(this.fromAddress, "hex");
        return publicKey.verify(this.calculateHash(), this.signature);
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
    hasValidTransactions() {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }
        }
        return true;
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
    minePendingTransactions(miningRewardAddress) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.mineReward);
        this.pendingTransactions.push(rewardTx);

        let block = new Block(Date.now(), this.pendingTransactions, this.getlatestBlock().hash);
        block.mineBlock(this.difficulty);
        console.log("block successfully mined! ");
        this.chain.push(block);

        this.pendingTransactions = [];
    }
    addTransaction(transaction) {
        if (!transaction.toAddress || !transaction.fromAddress) {
            throw new Error("Transactions must include from and To adresses");
        }
        if (!transaction.isValid()) {
            throw new Error("can't add invalid transactions");
        }
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

            if (!currentBlock.hasValidTransactions()) {
                return false;
            }
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

module.exports.BlockChain = BlockChain;
module.exports.Transaction = Transaction;
