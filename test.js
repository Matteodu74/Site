const str = "D'oÃ¹ vient Padel CÃ´tiÃ¨re ?";
console.log(Buffer.from(str, 'latin1').toString('utf8'));
