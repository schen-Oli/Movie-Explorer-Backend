const express = require('express');
const router = express.Router();
const axios = require('axios');

const API = "c1f7f5d00c378570cda732e7df5c39a6";

function getGenres(genres){
    if(genres.length == 0){
        return null;
    }
    var gen = "";
    for(var i = 0; i < genres.length; i++){
        var tmpGenre = genres[i].name;
        gen = gen + tmpGenre + ", ";
    }
    var ret = gen.substring(0, gen.length-2);
    return ret;
}

function getLang(langs){
    if(langs.length == 0){
        return null
    }
    var lang = "";
    for(var i = 0; i < langs.length; i++){
        var tmpLan = langs[i].english_name;
        lang = lang + tmpLan + ", ";
    }
    var ret = lang.substring(0, lang.length-2);
    return ret;
}

function getRuntime(totTime){
    if(totTime == 0){
        return null;
    }
    var hour = Math.floor(totTime/60);
    var min = totTime%60;
    if(hour == 0){
        var time = min + "mins"; 
    }else{
        var time = hour + "hrs " + min + "mins"; 
    }
    return time;
}

function getYear(date){
    if(date == "" || !date){
        return null;
    }
    return date.substring(0, 4);
}

router.get('/:type/:id', function(req, res){
    mediaType = "movie/";
    let type = req.params.type;
    let id  = req.params.id;
    let url = "https://api.themoviedb.org/3/" 
    + type + "/" 
    + id 
    + "?api_key=" + API 
    + "&language=en-US&page=1";

    //console.log(url)
    axios.get(url).then(responde => {
        var result = responde.data;
        var ret = {};

        if(type == "movie"){
            ret.title = result.title;
            ret.date = getYear(result.release_date);
            ret.runtime = getRuntime(result.runtime);
        }else{
            ret.title = result.name;
            ret.date = getYear(result.first_air_date);
            ret.runtime = getRuntime(result.episode_run_time);
        }

        ret.genres = getGenres(result.genres);
        ret.lang = getLang(result.spoken_languages);
        ret.overview = result.overview;
        ret.vote = result.vote_average;
        ret.tagline = result.tagline;
        ret.id = result.id;
        ret.poster = result.poster_path == null ? null : "https://image.tmdb.org/t/p/w500" + result.poster_path;
        res.json(ret);
    }).catch(err  => {
        console.log("get details goes wrong: " + err);
        res.send(err);
    })
});

module.exports = router;