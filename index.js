const express = require('express');
const routerApi = require('./routes');
const faker = require('faker');

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/errorhandler.js')

const app = express();
const port = 3000;

app.use(express.json())

//definir una ruta
app.get('/', (req, res)=>{
  res.send('Hola mundo cruel ')
});
app.get('/route2', (req, res)=>{
  res.send('Hola mundo cruel 2.0')
});

routerApi(app);
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, ()=>{
  console.log(`Se corre en este puerto => ${port}`);
});

// app.get('/products', (req, res)=>{
//   const products = [];
//   const {size} = req.query;
//   const limit = size
//   for (let i = 0; i < limit; i++) {
//     products.push({
//       name: faker.commerce.productName(),
//       price: parseInt(faker.commerce.price(), 10),
//       image: faker.image.imageUrl(),
//     })
//   }
// res.json(products)

// });

// app.get('/products/filter', (req, res)=>{
//   res.send('yoSoyUnFilter')
// })
// app.get('/products/:id', (req, res)=>{
//   const {id} = req.params
//   res.json({
//     id,
//     name: 'cufa',
//     age: 19,
//   });
// });


// app.get('/users', (req, res)=>{
//   const {limit, offset} = req.query;
//   if (limit && offset) {
//     res.json({
//       limit,
//       offset,
//     })
//   } else {
//     res.send('no hay query parameters')
//   }
// });

// app.get('/categories/:categoryId/products/:productId', (req, res)=>{
//   const {categoryId, productId} = req.params;
//   res.json(
//       {
//         categoryId,
//         productId,
//       },
//   )
// })
