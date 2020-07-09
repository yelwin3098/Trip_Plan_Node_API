const Category = require('../models/category');

module.exports = {
    index: async(req, res) => {
        const categories = await Category.find();
        res.status(200).json({
            'categories': categories
        });
    },
    create: async(req, res, next) => {
        const category = new Category({
            name: req.body.category_name
        });
        const saveCategory = await category.save();
        if (!saveCategory) return res.status(400).json('Category create Fail');
        res.status(200).json(saveCategory);
    }
}