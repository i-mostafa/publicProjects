const ENCRYPTION_FLAG = 96,
  MSG_SIZE = 250;
const INETIAL_VECTOR = "_";
const prime = (pr) => {
  let i,
    j = Math.sqrt(pr);
  for (i = 2; i <= j; i++) {
    if (pr % i == 0) return 0;
  }
  return 1;
};

const cd = (a, t) => {
  let k = 1;
  while (1) {
    k = k + t;
    if (k % a == 0) return k / a;
  }
};

exports.encryptionKey = (x, y) => {
  let n = x * y;
  let t = (x - 1) * (y - 1);
  let k = 0,
    flag,
    e = [],
    d = [];
  for (i = 2; i < t; i++) {
    if (t % i == 0) continue;
    flag = prime(i);
    if (flag == 1 && i != x && i != y) {
      e[k] = i;
      flag = cd(e[k], t);
      if (flag > 0) {
        d[k] = flag;
        k++;
      }
      if (k == MSG_SIZE - 1) break;
    }
  }
  console.log(e, d);
};

exports.encrypt = (msg, e, n) => {
  let pt,
    ct,
    key = e,
    k,
    len,
    i = 0,
    en = [];
  len = msg.length;
  while (i != len) {
    pt = msg[i];
    pt = pt - ENCRYPTION_FLAG;
    k = 1;
    for (j = 0; j < key; j++) {
      k = k * pt;
      k = k % n;
    }
    // temp[i] = k;
    ct = k + ENCRYPTION_FLAG;
    en[i] = ct;
    i++;
  }
  console.log("\n\nTHE ENCRYPTED MESSAGE IS\n");
  console.log(en);
};

exports.decrypt = (block) => {
  let pt,
    ct,
    key = d[0],
    k,
    i = 0;
  let len = block.length();
  while (i != len) {
    ct = temp[i];
    k = 1;
    for (j = 0; j < key; j++) {
      k = k * ct;
      k = k % n;
    }
    pt = k + ENCRYPTION_FLAG;
    m[i] = pt;
    i++;
  }
  m[i] = -1;
  console.log("\n\nTHE DECRYPTED MESSAGE IS\n");
  for (i = 0; i <= len; i++) console.log(m[i]);
};

exports.cbcEnc = async (msg) => {
  let enc = String.fromCharCode(
    msg.charCodeAt(0) ^ INETIAL_VECTOR.charCodeAt(0)
  );
  for (let i = 1; i < msg.length; i++) {
    enc += String.fromCharCode(msg.charCodeAt(i) ^ enc.charCodeAt(i - 1));
  }
  return enc;
};

exports.cbcDec = async (msg) => {
  let dec = String.fromCharCode(
    msg.charCodeAt(0) ^ INETIAL_VECTOR.charCodeAt(0)
  );
  for (let i = 1; i < msg.length; i++) {
    dec += String.fromCharCode(msg.charCodeAt(i) ^ msg.charCodeAt(i - 1));
  }
  console.log(dec);
};
