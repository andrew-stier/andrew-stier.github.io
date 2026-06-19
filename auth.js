/* ============================================================================
   AUTH — light password gate for the editor (edit.html).
   ----------------------------------------------------------------------------
   This is OBFUSCATION, not real security: it keeps the editor from being
   stumbled into, but anyone determined could read this file. The real
   authority to change the site is the GitHub token you paste into the editor.

   TO CHANGE THE PASSWORD:
     Open edit.html, unlock with the current password, and use the
     “Change password” tool — it prints a new hash. Paste it below as
     PASSWORD_SHA256. (Default password is  booth2026 .)
   ========================================================================== */

window.LAB_AUTH = {
  // SHA-256 of the password. Default below is the hash of "booth2026".
  PASSWORD_SHA256: "4db4fd6b0d5c310b68f4af6ad15a739c2845354c1bc8a0c5ca3813967b0e21bf"
};

/* ---- compact SHA-256 (ASCII), used for hashing + checking ----------------- */
window.sha256 = function (ascii) {
  function rightRotate(value, amount){ return (value>>>amount) | (value<<(32-amount)); }
  var mathPow = Math.pow, maxWord = mathPow(2, 32), result = "";
  var words = [], asciiBitLength = ascii.length * 8;
  var hash = window.sha256.h = window.sha256.h || [];
  var k = window.sha256.k = window.sha256.k || [];
  var primeCounter = k.length, isComposite = {};
  for (var candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (var i = 0; i < 313; i += candidate) { isComposite[i] = candidate; }
      hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }
  ascii += "\x80";
  while (ascii.length % 64 - 56) ascii += "\x00";
  for (var i = 0; i < ascii.length; i++) {
    var j = ascii.charCodeAt(i);
    if (j >> 8) return;
    words[i >> 2] |= j << ((3 - i) % 4) * 8;
  }
  words[words.length] = ((asciiBitLength / maxWord) | 0);
  words[words.length] = (asciiBitLength);
  for (var j = 0; j < words.length;) {
    var w = words.slice(j, j += 16);
    var oldHash = hash;
    hash = hash.slice(0, 8);
    for (var i = 0; i < 64; i++) {
      var w15 = w[i - 15], w2 = w[i - 2];
      var a = hash[0], e = hash[4];
      var temp1 = hash[7]
        + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
        + ((e & hash[5]) ^ ((~e) & hash[6])) + k[i]
        + (w[i] = (i < 16) ? w[i] : (
            w[i - 16]
            + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
            + w[i - 7]
            + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
          ) | 0);
      var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
        + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }
    for (var i = 0; i < 8; i++) { hash[i] = (hash[i] + oldHash[i]) | 0; }
  }
  for (var i = 0; i < 8; i++) {
    for (var j = 3; j + 1; j--) {
      var b = (hash[i] >> (j * 8)) & 255;
      result += ((b < 16) ? 0 : "") + b.toString(16);
    }
  }
  return result;
};

/* ---- gate helpers --------------------------------------------------------- */
window.LabGate = {
  check: function (pw) { return window.sha256(pw) === window.LAB_AUTH.PASSWORD_SHA256; },
  grant: function () { try { sessionStorage.setItem("lab_authed", "1"); } catch (e) {} },
  isAuthed: function () { try { return sessionStorage.getItem("lab_authed") === "1"; } catch (e) { return false; } },
  clear: function () { try { sessionStorage.removeItem("lab_authed"); } catch (e) {} }
};
