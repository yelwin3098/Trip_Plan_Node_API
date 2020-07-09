const City = require('../models/city');
const fs = require('fs');

module.exports = {
    index: async(req, res) => {
        const cities = await City.find();
        res.status(200).json({
            'cities': cities
        });
    },
    create: async(req, res, next) => {
        const files = req.file
        if (!files) {
            const error = new Error('Please choose files')
            error.httpStatusCode = 400
            return next(error)
        }
        const city = new City({
            city_name: req.body.city_name,
            description: req.body.description,
            city_Img: req.file.path,
            status: req.body.status
        });
        const saveCity = await city.save();
        if (!saveCity) return res.status(400).json('City create Fail');
        res.status(200).json(saveCity);
    },
    getSingle: async(req, res) => {
        const city_id = req.params.id;
        City.findById(city_id,{__v:0})
              .then(city=>{
                 res.status(200).json(city)
              });
    },
    updateCity: (req, res) => {
        const id = req.params.city_id;
        const update = City.findByIdAndUpdate(id, {
            city_name: req.body.city_name,
            description: req.body.description,
            city_Img: req.file.path,
            status: req.body.status
        });
        update.exec(function(err, result) {
            if (err) throw err;
            res.status(200).json(result);
        })
    },
    deleteCity: async(req, res) => {
        const id = req.params.city_id;
        const city = await City.findById(id);
        if (!city) {
            res.status(404).json({ error: 'City not exist' });
        } else {
            await city.remove((err, result) => {
                if (err) {
                    res.status(404).json({ error: 'City delete fail' });
                } else {
                    fs.unlink(city.city_Img, (err, done) => {
                        if (err) {
                            res.status(404).json({ error: 'Image unlink error' });
                        }
                    });
                    res.status(200).json({ 'success': 'City Deleted' })
                }
            })
        }
    }
}