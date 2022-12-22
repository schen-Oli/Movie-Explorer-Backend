const express = require('express');
const router = express.Router();
const axios = require('axios');

const API = "c1f7f5d00c378570cda732e7df5c39a6";

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
    id = req.params.id;

    let url1 = "https://api.themoviedb.org/3/person/"
        + id 
        + "?api_key=" + API
        + "&language=en-US&page=1";

    let url2 = "https://api.themoviedb.org/3/person/"
        + id + "/external_ids"
        + "?api_key=" + API
        + "&language=en-US&page=1";

    axios.all([
        axios.get(url1),
        axios.get(url2)
    ]).then(
        axios.spread((personDetail, externalIds) => {
            personDetail = personDetail.data;
            externalIds = externalIds.data;

            let ret = {};
            ret.name = personDetail.name;
            ret.birthday = personDetail.birthday;
            ret.gender = getGender(personDetail.gender);
            if (personDetail.profile_path) {
                ret.profile = "https://image.tmdb.org/t/p/w500" + personDetail.profile_path;
            } else {
                ret.profile = null;
            }
            ret.hometown = personDetail.place_of_birth;
            ret.talents = personDetail.known_for_department;
            if (personDetail.also_known_as && personDetail.also_known_as.length != 0) {
                ret.otherName = getOtherName(personDetail.also_known_as);
            } else {
                ret.otherName = null;
            }
            if (personDetail.homepage) {
                ret.homepage = personDetail.homepage;
            } else {
                ret.homepage = null;
            }
            ret.biography = personDetail.biography;

            ret.externalIDs = externalIds;
            res.send(ret);
        })
    ).catch(err => {
        console.log("Get Cast Detail Goes Wrong: " + err);
        res.send(err);
    })

});

module.exports = router;