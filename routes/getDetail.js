const express = require('express');
const router = express.Router();
const axios = require('axios');

const tmdb = "https://api.themoviedb.org/3/";
var mediaType = "";
var id = "";
const API = "?api_key=c1f7f5d00c378570cda732e7df5c39a6";
var lg = "&language=en-US";
var page = "&page=1";

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

router.get('/movie/:id', function(req, res){
    mediaType = "movie/";
    id  = req.params.id;
    let url = tmdb + mediaType + id + API + lg + page;
   // console.log("Moive Detail URL: " + url);

    axios.get(url).then(responde => {
        var result = responde.data;
        var usefulRes = {};
        usefulRes.title = result.title;
        usefulRes.genres = getGenres(result.genres);
        usefulRes.lang = getLang(result.spoken_languages);
        usefulRes.date = getYear(result.release_date);
        usefulRes.runtime = getRuntime(result.runtime);
        usefulRes.overview = result.overview;
        usefulRes.vote = result.vote_average;
        usefulRes.tagline = result.tagline;
        usefulRes.id = result.id;
        if(result.poster_path){
            usefulRes.poster = "https://image.tmdb.org/t/p/w500" + result.poster_path;
        }else{
            usefulRes.poster = null;
        }
        res.json(usefulRes);
    }).catch(err  => {
        console.log("Movie Get Detail Goes Wrong: " + err);
        res.send(err);
    })
});

router.get('/tv/:id', function(req, res){
    mediaType = "tv/";
    id  = req.params.id;
    let url = tmdb + mediaType + id + API + lg + page;
   // console.log("TV Details: " +url);

    axios.get(url).then(responde => {
        var result = responde.data;
        var usefulRes = {};
        
        usefulRes.title = result.name;
        usefulRes.genres = getGenres(result.genres);
        usefulRes.lang = getLang(result.spoken_languages);
        usefulRes.date = getYear(result.first_air_date);
        usefulRes.runtime = getRuntime(result.episode_run_time);
        usefulRes.overview = result.overview;
        usefulRes.vote = result.vote_average;
        usefulRes.tagline = result.tagline;
        usefulRes.id = result.id;
        if(result.poster_path){
            usefulRes.poster = "https://image.tmdb.org/t/p/w500" + result.poster_path;
        }else{
            usefulRes.poster = null;
        }
        res.json(usefulRes);
    }).catch(err => {
        console.log("TV Get Detail Goes Wrong: " + err);
        res.send(err);
    })
});

module.exports = router;