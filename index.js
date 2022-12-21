const express = require('express');
const cors = require('cors');

var slides = require('./routes/currentPlay');
var search = require('./routes/searchM');
var getData = require('./routes/getData');
var getVideo = require('./routes/getVideo');
var getDetail = require('./routes/getDetail');
var getCast = require('./routes/getCast');
var getCastDetail = require('./routes/getCastDetail');
var getReview = require('./routes/getReview');
var getRecommend = require('./routes/Recommended');
var getSimilar = require('./routes/Similar');

const app = express();

const path = require('path');

app.use(cors());


app.use('/currentPlay', slides);
app.use('/searchMulti', search);

app.use('/getData', getData);

app.use('/getVideo',getVideo);

app.use('/getDetail',getDetail);

app.use('/getCast',getCast);

app.use('/getCastDetail',getCastDetail);

app.use('/getReview',getReview);

app.use('/getRec',getRecommend);
app.use('/getSim',getSimilar);

app.use('*', function(req, res){
    res.send("Welcome to Movie Explorer server");
} )

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}...`);
    console.log(`Access using url http://localhost:${PORT}...`);
})

module.exports = app;