// create new hashTable

class HashTabl1e {
  /**
   * @param  {Number} size
   */
  constructor(size) {
    this.data = new Array(size);
  }

  /** set function
   * @param  {String} key
   * @param  {any} value
   */
  set(key, value) {
    const address = this._hash(key);
    if (!this.data[address]) {
      this.data[address] = [];
    }
    let buckets = this.data[address];
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i][0] === key) {
        buckets[i][1] = value;
        return;
      }
    }
    this.data[address].push([key, value]);
  }

  /** get with key
   * @param  {String} key
   */
  get(key) {
    const address = this._hash(key);
    if (!this.data[address]) {
      return undefined;
    }
    for (let element of this.data[address]) {
      if (element[0] === key) return element[1];
    }
    return undefined;
  }

  /** get all keys
   */
  print() {
    const obj = [];
    this.data.forEach((buckets) => {
      if (buckets.length) buckets.forEach((element) => obj.push(element));
    });
    console.log(obj);
  }

  keys() {
    const keys = [];
    this.data.forEach((buckets) => {
      if (buckets.length) buckets.forEach((element) => keys.push(element[0]));
    });
    return keys;
  }
  /**
   * @param  {String} key
   */
  delete(key) {
    let shiftHere = false;
    const address = this._hash(key);
    for (let i = 0; i < this.data.length; i++) {
      let len = this.data[address].lengthl;
      if (!this.data[address].length) continue;
      for (let j = 0; j < len; j++) {
        if (this.data[address][0] === key) {
          shiftHere = true;
        }
        if (shiftHere) {
          this.data[address] = this.data[address + 1];
        }
      }
      if (shiftHere) {
        this.data[address].pop();
        return shiftHere;
      }
    }
    return shiftHere;
  }
  /** hash function
   * @param  {String} key
   */
  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }
    return hash;
  }
}

const obj = new HashTabl1e(3);

obj.set("islam", "mario");
obj.set("mohmed", "marlin");
obj.set("mohmed", "marlin");
obj.set("mohmed", "marlin");

console.log(obj.get("islam"));
console.log(obj.keys());
obj.print();
