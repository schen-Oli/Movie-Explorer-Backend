const express = require('express');
const router = express.Router();
const axios = require('axios');

const API = "c1f7f5d00c378570cda732e7df5c39a6";
const poster = "https://image.tmdb.org/t/p/w500";

function addDataToArr(arr, type, data) {
    if (data == null) return;
    for (var i = 0; i < data.length; i++) {
        var newObj = {};
        var tmpRes = data[i];
        if (tmpRes.poster_path) {
            newObj.type = type;
            newObj.id = tmpRes.id;
            newObj.title = type == "movie" ? tmpRes.title : tmpRes.name;
            newObj.poster = poster + tmpRes.poster_path;
            arr.push(newObj);
        }
    }
}

router.get('/:type/:id', function (req, res) {
    let type = req.params.type;
    let id = req.params.id + "/";
    let url = "https://api.themoviedb.org/3/"
        + type + "/"
        + id + "/"
        + "similar?api_key=" + API
        + "&language=en-US&page=";
    let pageNum = 1;

    axios.all([
        axios.get(url + pageNum),
        axios.get(url + (pageNum + 1))
    ]).then(
        axios.spread((data1, data2) => {
            data1 = data1.data.results;
            data2 = data2.data.results;

            let ret = [];
            addDataToArr(ret, type, data1);
            addDataToArr(ret, type, data2);

            res.json(ret);
        })
    ).catch(err => {
        console.log("Cannot get similar: " + err);
        res.send(err)
    })
});

module.exports = router;