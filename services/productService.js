const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsServices {
  constructor(){
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      })
    }
  }
  async create(obj) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...obj
    }
    this.products.push(newProduct);
    return newProduct;
  }
  async find() {
    return new Promise((res,rej)=>{
      setTimeout(()=>{
        res(this.products)
      },3000)
    })
  }
  async findOne(id) {
    const product =  this.products.find(item=>item.id ===id)
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }
  async update(id, change) {
    const index = this.products.findIndex(item=>item.id ===id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {...product, ...change};
    return this.products[index];
  }
  async delete(id) {
    const index = this.products.findIndex(item=>item.id ===id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return {
      message: this.products[index],
      id: id
  };
  }
}

module.exports = ProductsServices;
