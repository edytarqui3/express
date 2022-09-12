const fs = require("fs");
const { Product } = require("../models");

exports.getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  res.status(200).json({
    status: "successs",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

exports.addProduct = async (req, res) => {
  let newProduct = Product.build(req.body);
  newProduct = await newProduct.save();
  res.status(200).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
};

exports.getProductById = async (req, res) => {
  const foundProduct = await Product.findByPk(req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};
exports.updateProductById = async (req, res) => {
  const id = req.params.id;
  Product.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};
exports.deleteProductById = async (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

