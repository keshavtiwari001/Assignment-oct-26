const Product = require('../models/productSchema')


exports.createProduct = async (req, res) => {
    const data = req.body;

    const product = new Product(data)
    await product.save()
    res.status(201).json({ newProduct: product, msg: "Product created successfully!" })

}

exports.viewAll = async (req, res) => {
    const product = await Product.find();
    res.status(200).json(product);
}

exports.onlyOne = async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id)
    if (!product) {
        return res.status(400).json({ error: "product not exists!!" })
    }
    res.status(200).json({ product: product })
}

exports.UpdateProduct = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const product = await Product.findByIdAndUpdate(id, data);
    res.status(200).json(product)
}

exports.deleteProduct = async (req, res) => {
    const id = req.params.id
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json({ msg: "Product removed successfully!", name: product.name })
}