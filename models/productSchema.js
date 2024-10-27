const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('products', productSchema);