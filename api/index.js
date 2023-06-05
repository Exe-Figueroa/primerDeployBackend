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

