const product = require('../models/product')
 
const getAllProducts = async(req, res) => {

    const { featured, company, name, sort, fields } = req.query;
    const queryObject = {}

    if(featured){
        const featuredStatus = featured === 'true' ? true : false
        queryObject.featured =  featuredStatus;
    }

    if(company){
        queryObject.company = company;
    }

    if(name) {
        queryObject.name = { $regex: name, $options: 'i'};
    }

    let result = product.find(queryObject)

/// Sort
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }

/// Fields (Select)
    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    const products = await result;
    res.status(200).json({ products, length: products.length})

}

const getAllProductsStatic = async(req, res) => {

    const products = await product.find({
        // name : 'vase table',
    })
    res.status(200).json({ products })
}

module.exports = { getAllProducts, getAllProductsStatic }