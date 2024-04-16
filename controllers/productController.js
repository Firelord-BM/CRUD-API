const { PrismaClient } = require("@prisma/client");
const asyncHandler = require('express-async-handler')
const prisma = new PrismaClient();

//get all products
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(500)
    throw new Error(error.message);
  }
});

//get a single product by id
const getProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: id },
    });
    if (!product) {
        res.status(404)
        throw new Error(`Cannot find product with ID ${id} `);
    }
    console.log(product);
    res.status(200).json(product);
   
  } catch (error) {
    res.status(500)
    throw new Error(error.message);
   
  }
});

//create a single product
const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        quantity,
        price,
      },
    });
    res.json(product);
  } catch (error) {
    res.status(500)
    throw new Error(error.message);
  }
});

// update a product
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.update({
      where: { id: id },
      data: req.body,
    });
    if (!product) {
        res.status(404)
        throw new Error(`Cannot find product with ID ${id} `);
    }
    const updatedProduct = await prisma.product.findUnique({
      where: { id: id },
    });
    res.status(200).json(updatedProduct);
  } catch (e) {
    res.status(500)
    throw new Error(error.message);
  }
});


//Delete a product

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await prisma.product.delete({ where: { id } });
    if (!deleted) {
      throw new Error("Product not found");
    }
    res.status(200).json(deleted);
  } catch (e) {
    res.status(500)
    throw new Error(error.message);
  }
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
