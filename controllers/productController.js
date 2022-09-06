const fs = require("fs");

exports.getAllProducts = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

exports.addProduct = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  products.push(req.body);
  fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
};

exports.getProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const foundProduct = products.find((p) => p.id == req.params.id);
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
exports.updateProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {
        // Leer los datos y modificarlos
        for(var i = 0; i < products.length;i++){
            if(foundProduct.id == products[i].id){
                console.log('id lo mismo');
                for(var key in req.body){
                    if(products[i][key]){
                      products[i][key] = req.body[key];
                    }
                }
            }
        }
        // saving data
    let json_product = JSON.stringify(products);
    //console.log(json_product)
    fs.writeFileSync(`${__dirname}/../data/products.json`, json_product);
    res.status(201).json({
      status: "success update "+req.params.id,
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};
exports.deleteProductById = (req, res) => {
  let products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {
    products = products.filter((product) => product.id != req.params.id);
    // saving data
    let json_product = JSON.stringify(products);
    fs.writeFileSync(`${__dirname}/../data/products.json`, json_product);
    res.status(200).json({
      status: "success delete "+req.params.id,
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};
