const express = require('express');
const cors = require('cors');

let nowPlaying = require('./routes/get_playing');
var getMedia = require('./routes/get_media');
var search = require('./routes/get_search');
var getVideo = require('./routes/get_video');
var getDetail = require('./routes/get_detail');
var getCasts = require('./routes/get_casts');
var getCastDetail = require('./routes/get_person');
var getReview = require('./routes/get_review');
var getRecommend = require('./routes/get_recommendation');
var getSimilar = require('./routes/get_similar');

const app = express();

app.use(cors());
app.use('/playing', nowPlaying);
app.use('/media', getMedia);
app.use('/search', search);
app.use('/video',getVideo);
app.use('/detail',getDetail);
app.use('/cast',getCasts);
app.use('/person',getCastDetail);
app.use('/review',getReview);
app.use('/recommendation',getRecommend);
app.use('/similar',getSimilar);

app.use('*', function(req, res){
    res.send("Welcome to Movie Explorer server");
} )

const PORT = process.env.PORT || 8085;
app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}...`);
    console.log(`http://localhost:${PORT}...`);
})

module.exports = app;