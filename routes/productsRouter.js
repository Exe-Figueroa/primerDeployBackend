const express = require('express');
const ProductsServices = require('../services/productService.js');

const service =  new ProductsServices();

const router =  express.Router();

router.get('/', async (req, res)=>{
  const products = await service.find()
  res.json(products)
});

router.get('/filter', (req, res)=>{
  res.send('yoSoyUnFilter')
});

router.get('/:id', async (req, res, next)=>{
  try {
    const {id} = req.params
    // const name = this.products.getTotal()
    const product = await service.findOne(id);
    res.json(product)
  } catch (error) {
    next(error)
  }
});
//Acá hago los post

router.post('/', async (req, res)=>{
  const body = req.body;
  const product = await service.create(body);
  res.status(201).json(product);
})

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
});

router.delete('/:id', async (req, res)=>{
  const {id} = req.params;
  const deleted = await service.delete(id);
  res.json(deleted);
})

//Hacemos un modulo exportable del router
module.exports = router;
