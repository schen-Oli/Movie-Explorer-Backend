const express = require('express');
const router = express.Router();
const axios = require('axios');

const API = "c1f7f5d00c378570cda732e7df5c39a6";

router.get('/:type/:id', function (req, res) {
    let type = req.params.type;
    let id = req.params.id + "/";
    let url = "https://api.themoviedb.org/3/" 
    + type + "/" 
    + id 
    + "credits"
    + "?api_key=" + API 
    + "&language=en-US&page=1";

    axios.get(url).then(responde => {
        var result = responde.data.cast;
        var ret = [];
        for (var i = 0; i < result.length; i++) {
            var tmpRes = result[i];
            if (tmpRes.profile_path) {
                var newObj = {};
                newObj.name = tmpRes.name;
                newObj.id = tmpRes.id;
                newObj.character = tmpRes.character;
                newObj.profile = "https://image.tmdb.org/t/p/w500" + tmpRes.profile_path;
                ret.push(newObj);
            }
        }
        res.send(ret);
    }).catch(err => {
        console.log("Get Movie Cast Goes Wrong: " + err);
        res.send(err);
    })
});

module.exports = router;