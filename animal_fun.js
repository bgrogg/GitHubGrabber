const fs = require('fs');
const http = require('http');
const qs = require('querystring');

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

// const firstLetter = process.argv[2].toUpperCase();
//
// fs.readFile('./animals.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err);
//     return
//   }
//   const animals = selectAnimals(data, firstLetter)
//
//   fs.writeFile(`${firstLetter}_animals.txt`, animals, err => {
//     if (err) {
//       console.log(err);
//       return
//     } else {
//       console.log("file successfully written!")
//     }
//   })
// })
//
function selectAnimals(animal, firstLetter) {
  return animal
    .split('\n')
    .filter(animal => animal.startsWith(firstLetter))
    .join('\n')
}

// const server = http.createServer((req, res) => {
//   res.write('hello world!');
//   res.end();
// })

// server.listen(8000, () => console.log("I'm listening on port 8000!"))


const animalServer = http.createServer((req, res) => {
  const query = req.url.split('?')[1];

  if (query !== undefined) {
    const firstLetter = qs.parse(query).letter.toUpperCase();

    if (cache[firstLetter] !== undefined) {
      res.end(cache[firstLetter])
    }

    if (firstLetter !== undefined) {
      fs.readFile('./animals.txt', 'utf-8', (err, data) => {
        if (err) {
          console.log(err)
          res.end('IT WENT POORLY')
          return
        }
        const animals = selectAnimals(data, firstLetter)
        cache[firstLetter] = animals
        res.end(animals)
      })
    }
  } else {
    if (cache['animals'] !== undefined) {
      res.end(cache['animals'])
    }
    fs.readFile('./animals.txt', 'utf-8', (err, data) => {
      if (err) {
        console.log(err)
        res.end('IT WENT POORLY')
        return
      }
      cache['animals'] = data
      res.end(data)
    })
  }
})

animalServer.listen(8000, () => console.log("I'm listening on port 8000!"))
