const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:type/:id', function (req, res) {
    let type = req.params.type;
    let id = req.params.id;
    let url = "https://api.themoviedb.org/3/"
        + type + "/"
        + id + "/"
        + "videos?api_key=c1f7f5d00c378570cda732e7df5c39a6&language=en-US&page=1";

    axios.get(url).then(responde => {
        var result = responde.data.results;
        var ret = {};
        var teaser = [];
        var other = [];

        if (result.length == 0) {
            ret.status = -1;
            res.json(ret);
            return;
        } else {
            ret.status = 1;
            for (var i = 0; i < result.length; i++) {
                tmpDic = result[i];
                if (tmpDic.type == "Trailer") {
                    ret.site = tmpDic.site;
                    ret.type = tmpDic.type;
                    ret.name = tmpDic.name;
                    ret.key = tmpDic.key;
                    res.json(ret);
                    return;
                } else if (tmpDic.type == "Teaser") {
                    teaser.push(tmpDic);
                } else {
                    other.push(tmpDic);
                }
            }
        }

        if (teaser.length != 0) {
            var tmpTease = teaser[0];
            ret.site = tmpTease.site;
            ret.type = tmpTease.type;
            ret.name = tmpTease.name;
            ret.key = tmpTease.key;
            res.json(ret);
        } else {
            var tmpOther = other[0];
            ret.site = tmpOther.site;
            ret.type = tmpOther.type;
            ret.name = tmpOther.name;
            ret.key = tmpOther.key;
            res.json(ret);
        }

    }).catch(err => {
        console.log("get video goes wrong: " + err);
        res.send(err);
    })
});

module.exports = router;