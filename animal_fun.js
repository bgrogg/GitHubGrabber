const fs = require('fs');

// fs.readFile('./animals.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//   console.log(data);
//   }
// })



// CAREFUl: If a file already exists as the first argument, it will be
// overwritten!
// fs.writeFile('./example.txt', 'I will be written to example.txt', err => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("file successfully written!");
//   }
// })

const firstLetter = process.argv[2].toUpperCase();

fs.readFile('./animals.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
    return
  }
  const animals = selectAnimals(data, firstLetter)

  fs.writeFile(`${firstLetter}_animals.txt`, animals, err => {
    if (err) {
      console.log(err);
      return
    } else {
      console.log("file successfully written!")
    }
  })
})

function selectAnimals(animal, firstLetter) {
  return animal
    .split('\n')
    .filter(animal => animal.startsWith(firstLetter))
    .join('\n')
}
