const express = require('express');
const router = express.Router();
const axios = require('axios');

const tmdb = "https://api.themoviedb.org/3/";
var mediaType = "";
var id = "";
const API = "?api_key=c1f7f5d00c378570cda732e7df5c39a6";
var lg = "&language=en-US";
var page = "&page=1";

function getGender(gender) {
    if (gender == 0) {
        return "Other";
    } else if (gender == 1) {
        return "Female";
    } else {
        return "Male";
    }
}

function getOtherName(names) {
    var otherNames = "";
    for (var i = 0; i < names.length; i++) {
        otherNames = otherNames + ", " + names[i];
    }
    var ret = otherNames.substring(0, otherNames.length - 2);
    return ret;
}

router.get('/:id', function (req, res) {
    mediaType = "person/";
    id = req.params.id;
    let url = tmdb + mediaType + id + API + lg + page;
    //console.log(url);

    var usefulRes = {};
    axios.get(url).then(responde => {
        var result = responde.data;
        usefulRes.name = result.name;
        usefulRes.birthday = result.birthday;
        usefulRes.gender = getGender(result.gender);
        if(result.profile_path){
            usefulRes.profile = "https://image.tmdb.org/t/p/w500" + result.profile_path;
        }else{
            usefulRes.profile = null;
        }
        usefulRes.hometown = result.place_of_birth;
        usefulRes.talents = result.known_for_department;
        if(result.also_known_as.length != 0){
            usefulRes.otherName = getOtherName(result.also_known_as);
        }else{
            usefulRes.otherName = null;
        }    
        if (result.homepage) {
            usefulRes.homepage = result.homepage;
        } else {
            usefulRes.homepage = null;
        }
        usefulRes.biography = result.biography;

        var externalIDs = tmdb + mediaType + id + "/external_ids" + API + lg + page;
        axios.get(externalIDs).then(responde => {
            var res2 = responde.data;
            usefulRes.externalIDs = res2;
            res.send(usefulRes);
        }).catch(err => {
            console.log("Get Social Media Goes Wrong: " + err);
            res.send(err);
        })

    }).catch(err => {
        console.log("Get Cast Detail Goes Wrong: " + err);
        res.send(err);
    })

});

module.exports = router;