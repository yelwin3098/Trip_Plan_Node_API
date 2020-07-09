const Festival = require('../models/festivals');
const fs=require('fs');
const ObjectId=require('mongoose').Types.ObjectId;

module.exports = {
    index: async(req, res) => {
        const festivals = await Festival.find();
        res.status(200).json({
            'festivals': festivals
        });
    },
    create: async(req, res, next) => {
        const files = req.file
        if (!files) {
            const error = new Error('Please choose files')
            error.httpStatusCode = 400
            return next(error)
        }
        const festival = new Festival({
            festival_name: req.body.festival_name,
            festival_description: req.body.festival_description,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            festival_Img: req.file.path,
            status: req.body.status
        });
        const saveFestival = await festival.save();
        if (!saveFestival) return res.status(400).json('Festival create Fail');
        res.status(200).json(saveFestival);
    },
    getSingle: async(req, res) => {
        const festival_id = req.params.id;
        Festival.findById(festival_id, (err, festival) => {
            if (err) {
                res.status(404).json({ err: err })
            } else {
                res.status(200).json(festival);
            }
        })
    },
    updateFest:(req, res) => {
        const id=req.params.fest_id;
        const update=Festival.findByIdAndUpdate(id,{
            festival_name: req.body.festival_name,
            festival_description: req.body.festival_description,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            festival_Img: req.file.path,
            status: req.body.status
        });
        update.exec(function(err,result){
            if(err) throw err;
            res.status(200).json(result);
        })
    },
    deleteFest:async(req,res)=>{
        const id=req.params.fest_id;
        const fest=await Festival.findById(id);
        if(!fest){
             res.status(404).json({error:'Festival not exist'});
        }else{
            await fest.remove((err,result)=>{
                if(err){
                    res.status(404).json({error:'Festival delete fail'});
                }else{
                    fs.unlink(fest.festival_Img,(err,done)=>{
                        if(err){
                            res.status(404).json({error:'Image unlink error'});
                        }
                    });
                    res.status(200).json({'success':'Festival Deleted'})
                }
            })
        }
    }
}