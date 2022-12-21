const express = require('express');
const router = express.Router();
const axios = require('axios');

const tmdb = "https://api.themoviedb.org/3/";
var mediaType = "";
var id = "";
var keyword = "videos";
const API = "?api_key=c1f7f5d00c378570cda732e7df5c39a6";
var lg = "&language=en-US";
var page = "&page=1";

router.get('/movie/:id', function(req, res){
    mediaType = "movie/";
    id  = req.params.id + "/"
    let url = tmdb + mediaType + id + keyword + API + lg + page;

    axios.get(url).then(responde => {
        var result = responde.data.results;
        var usefulRes = {};
        var teaser = [];
        var other = [];

        if(result.length == 0){
            usefulRes.site = "Not Exists";
            usefulRes.type = 0; 
            usefulRes.name = "No Video Found, Playing Random One";
            usefulRes.key = "CBDT9LkrrVc";
            res.json(usefulRes);
            return;
        }else{
            for(var i = 0; i < result.length; i++){
                tmpDic = result[i];
                if(tmpDic.type == "Trailer"){
                    usefulRes.site = tmpDic.site;
                    usefulRes.type = tmpDic.type;
                    usefulRes.name = tmpDic.name;
                    usefulRes.key =  tmpDic.key;
                    res.json(usefulRes);
                    return;
                }else if(tmpDic.type == "Teaser"){
                    teaser.push(tmpDic);
                }else{
                    other.push(tmpDic);
                }
            }
        }
       
        if(teaser.length != 0){
            var tmpTease = teaser[0];
            usefulRes.site = tmpTease.site;
            usefulRes.type = tmpTease.type;
            usefulRes.name = tmpTease.name;
            usefulRes.key = tmpTease.key;
            res.json(usefulRes);
        }else{
            var tmpOther = other[0];
            usefulRes.site =  tmpOther.site;
            usefulRes.type =  tmpOther.type;
            usefulRes.name =  tmpOther.name;
            usefulRes.key =  tmpOther.key;
            res.json(usefulRes);
        }

    }).catch(err  => {
        console.log("Movie GetVideo Goes Wrong: " + err);
        res.send(err);
    })
});

router.get('/tv/:id', function(req, res){
    mediaType = "tv/";
    id  = req.params.id + "/"
    let url = tmdb + mediaType + id + keyword + API + lg + page;
    //console.log(url);

    axios.get(url).then(responde => {
        var result = responde.data.results;
        var usefulRes = {};
        var teaser = [];
        var other = [];

        if(result.length == 0){
            console.log("No Youtube Video");
            usefulRes.site = "Not Exists";
            usefulRes.type = 0; 
            usefulRes.name = "CSCI571: Web Technologies - HW8 Fall 2020 - Desktop Version";
            usefulRes.key = "tzkWB85ULJY";
            res.json(usefulRes);
            return;
        }else{
            for(var i = 0; i < result.length; i++){
                tmpDic = result[i];
                if(tmpDic.type == "Trailer"){
                    usefulRes.site = tmpDic.site;
                    usefulRes.type = tmpDic.type;
                    usefulRes.name = tmpDic.name;
                    usefulRes.key =  tmpDic.key;
                    res.json(usefulRes);
                    return;
                }else if(tmpDic.type == "Teaser"){
                    teaser.push(tmpDic);
                }else{
                    other.push(tmpDic);
                }
            }
        }
       
        if(teaser.length != 0){
            var tmpTease = teaser[0];
            usefulRes.site = tmpTease.site;
            usefulRes.type = tmpTease.type;
            usefulRes.name = tmpTease.name;
            usefulRes.key = tmpTease.key;
            res.json(usefulRes);
        }else{
            var tmpOther = other[0];
            usefulRes.site =  tmpOther.site;
            usefulRes.type =  tmpOther.type;
            usefulRes.name =  tmpOther.name;
            usefulRes.key =  tmpOther.key;
            res.json(usefulRes);
        }

    }).catch(err  => {
        console.log("TV GetVideo Goes Wrong: " + err);
        res.send(err);
    })
});

module.exports = router;