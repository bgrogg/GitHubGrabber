const fs = require('fs');

fs.readFile('./animals.txt', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
})
