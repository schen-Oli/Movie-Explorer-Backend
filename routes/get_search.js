const express = require('express');
const router = express.Router();
const axios = require('axios');

const backdrop = "https://image.tmdb.org/t/p/original";

router.get('/:q', function (req, res) {

    let quiry = "&query=" + req.params.q;
    let url = "https://api.themoviedb.org/3/search/multi?api_key=c1f7f5d00c378570cda732e7df5c39a6&language=en-US" + quiry;

    axios.get(url).then(searchRes => {
        let results = searchRes.data.results;
        let ret = [];

        let cnt = 0;
        for (var i = 0; i < results.length; i++) {
            var newObj = {}
            var currRes = results[i];
            if (currRes.media_type != "person" && currRes.backdrop_path != null) {
                cnt ++;
                newObj.media_type = currRes.media_type;
                newObj.id = currRes.id;
                newObj.type = currRes.media_type;
                if (currRes.media_type == "movie") {
                    newObj.title = currRes.original_title;
                } else {
                    newObj.title = currRes.original_name;
                }
                newObj.backdrop = backdrop + currRes.backdrop_path;
                ret.push(newObj);
            }
            if (cnt >= 10){
                break;
            }
        }

        res.json(ret);
    }).catch(err => {
        console.log("somthing went wrong");
        res.send(err)
    })
    
});

module.exports = router;