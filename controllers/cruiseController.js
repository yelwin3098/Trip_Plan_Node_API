const Cruise = require('../models/cruises');
const Comment = require('../models/comment');
const fs = require('fs');

module.exports = {
    index: async(req, res) => {
        const cruises = await Cruise.find();
        res.status(200).json({
            'cruises': cruises
        });
    },
    create: async(req, res, next) => {
        const files = req.file
        if (!files) {
            const error = new Error('Please choose files')
            error.httpStatusCode = 400
            return next(error)
        }
        const cruise = new Cruise({
            cruise_name: req.body.cruise_name,
            cruise_description: req.body.cruise_description,
            cruise_Img: req.file.path,
            address: req.body.address,
            phone_no: req.body.phone_no,
            status: req.body.status
        });
        const saveCru = await cruise.save();
        if (!saveCru) return res.status(400).json('Cruises create Fail');
        res.status(200).json(saveCru);
    },
    getSingle: async(req, res) => {
        const cru_id = req.params.id;
        Cruise.findById(cru_id,{__v:0})
              .populate('comments',{_id:0,commentIsApproved:0,__v:0})
              .then(cruise=>{
                 res.status(200).json(cruise)
              });
        // Cruise.findById(cru_id, (err, cruise) => {
        //     if (err) {
        //         res.status(404).json({ err: err })
        //     } else {
        //         res.status(200).json(cruise);
        //     }
        // })
    },
    updateCru: (req, res) => {
        const id = req.params.cru_id;
        const update = Cruise.findByIdAndUpdate(id, {
            cruise_name: req.body.cruise_name,
            cruise_description: req.body.cruise_description,
            cruise_Img: req.file.path,
            address: req.body.address,
            phone_no: req.body.phone_no,
            status: req.body.status
        });
        update.exec(function(err, result) {
            if (err) throw err;
            res.status(200).json(result);
        })
    },
    deleteCru: async(req, res) => {
        const id = req.params.cru_id;
        const cru = await Cruise.findById(id);
        if (!cru) {
            res.status(404).json({ error: 'Cruise not exist' });
        } else {
            await cru.remove((err, result) => {
                if (err) {
                    res.status(404).json({ error: 'Cruise delete fail' });
                } else {
                    fs.unlink(cru.cruise_Img, (err, done) => {
                        if (err) {
                            res.status(404).json({ error: 'Image unlink error' });
                        }
                    });
                    res.status(200).json({ 'success': 'Cruise Deleted' })
                }
            })
        }
    },
    submitReview: (req, res) => {
        const id = req.body.cru_id
        console.log(id)
        Cruise.findById(id, (err, cruise) => {
            const newComment = new Comment({
                user: req.body.user,
                body: req.body.comment_body
            });
            cruise.comments.push(newComment);
            cruise.save().then(saveCruise => {
                newComment.save().then(saveComment => {
                    res.status(200).json({ 'success': 'Review Created', 'cruise': cruise })
                })
            })
        })

    }
}