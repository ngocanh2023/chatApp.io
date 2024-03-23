const dataPros = require("../data/products.json");
const Products = require("../models/products");

exports.getDataPro = (req, res, next) => {
  Products.find()
    .then((result) => {
      res.json(result);
    })
    .catch((e) => console.log(e));
};
exports.postDataPro = (req, res, next) => {
  const dataId = req.query.id;
  console.log("dataId", dataId);
  Products.findById(dataId)
    .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((e) => {
      console.log(e);
    });
};

let proId;
exports.sendId = (req, res, next) => {
  proId = req.query.id;
  res.json({id: proId})
}

exports.deleteById = (req, res, next) => {
  Products.findByIdAndDelete(proId)
    .then(() => {
      res.send("Done!");
    })
    .catch((e) => console.log(e));
};
exports.updateProduct = (req, res, next) => {
  const category = req.body.category;
  const img1 = req.body.img1;
  const long_desc = req.body.long_desc;
  const short_desc = req.body.short_desc;
  const name = req.body.name;
  const price = req.body.price;

  console.log("req.body", req.body)

  const updateProduct = new Products({
    category: category,
    img1: img1,
    long_desc: long_desc,
    short_desc: short_desc,
    name: name, 
    price: price,
})
  updateProduct.save()
  .then(result => {console.log(result)})
  .catch(e => {console.log(e)})
}