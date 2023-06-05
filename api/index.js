const express = require('express');
const cors = require('cors');

const routerApi = require('./routes');
const faker = require('faker');

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/errorhandler.js')

const app = express();
const port = process.env.PORT || 3000;

const whiteList = ['http://localhost:5500', 'http://myapp.com', 'http://127.0.0.1:5500']; //En esta lista están los orígenes de los que pueden realizar peticiones a mi API
const options = {
  origin: (origin, callback)=>{
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    }else{
      callback(new Error('no permitido'));
    }
  }
}

app.use(cors(options)) // Esta configuración es para que acepte cualquier origen y no salten problemas de cors
app.use(express.json())

//definir una ruta
app.get('/api/', (req, res)=>{
  res.send('Hola mundo cruel ')
});
app.get('/api/route2', (req, res)=>{
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
