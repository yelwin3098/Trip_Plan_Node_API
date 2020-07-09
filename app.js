const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const festivalRoute = require('./routes/festivalRoute');
const userRoute = require('./routes/userRoute');
const cruiseRoute = require('./routes/cruiseRoute');
const cityRoute = require('./routes/cityRoute');
const catRoute = require('./routes/categoryRoute');
const placeRoute = require('./routes/placeRoute');
const hotelRoute = require('./routes/hotelRoute');
const restaurantRoute=require('./routes/restaurantRoute')

const app = express();
const port = process.env.PORT || 4000;
mongoose.connect('mongodb://localhost/best_trip', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(db => console.log('MongoDb is connected'))
    .catch(err => console.log(err));
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req,res,next)=>{
   res.header('Access-Control-Allow-Origin','*');
   res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type,Accept,authorization');
   
   if (req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods','PUT, POST,PATCH, DELETE,GET');
    return res.status(200).json({});
}
next();
});

//Routers
app.use('/festivals', festivalRoute);
app.use('/users',userRoute);
app.use('/cru',cruiseRoute);
app.use('/city',cityRoute);
app.use('/category',catRoute);
app.use('/place',placeRoute);
app.use('/hotel',hotelRoute);
app.use('/restaurant',restaurantRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});