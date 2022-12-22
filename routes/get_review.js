const express = require('express');
const router = express.Router();
const axios = require('axios');

const API = "c1f7f5d00c378570cda732e7df5c39a6";

function combine_author_date(author, date) {
    var name = author;
    var time = getDateString(date);
    return "Written by " + name + ", " + time;
}

function getDateString(date) {
    var year = date.substring(0, 4) + ", ";
    var month = getMonth(parseInt(date.substring(5, 7)));
    var day = parseInt(date.substring(8, 10)) + ", ";

    var hour = parseInt(date.substring(11, 13));
    var min = date.substring(14, 16) + ":";
    var sec = date.substring(17, 19) + " ";

    if (hour <= 12) {
        return "on " + month + day + year + hour + ":" + min + sec + "AM";
    } else {
        hour = hour - 12;
        return "on " + month + day + year + hour + ":" + min + sec + "PM";
    }
}

function getMonth(number) {
    var months = [
        "January ",
        "February ",
        "March ",
        "April ",
        "May ",
        "June ",
        "July ",
        "August ",
        "September ",
        "October ",
        "November ",
        "December "
    ]
    return months[number - 1];
}

router.get('/:type/:id', function (req, res) {
    let type = req.params.type;
    let id = req.params.id;

    let url = "https://api.themoviedb.org/3/"
        + type + "/"
        + id + "/"
        + "reviews"
        + "?api_key=" + API
        + "&language=en-US&page=1";
   
    axios.get(url).then(responde => {
        var result = responde.data.results;
        var usefulRes = [];
        for (var i = 0; i < result.length; i++) {
            if (i == 10) {
                break;
            }
            var tmpUser = result[i];
            var tmpDic = {};
            tmpDic.author = tmpUser.author;
            tmpDic.content = tmpUser.content;
            tmpDic.date = combine_author_date(tmpUser.author, tmpUser.created_at);
            tmpDic.full = tmpUser.url;

            if (tmpUser.author_details.rating) {
                tmpDic.rate = tmpUser.author_details.rating;
            } else {
                tmpDic.rate = 0;
            }
            if (tmpUser.author_details.avatar_path) {
                if (tmpUser.author_details.avatar_path.indexOf("ttps") > 0) {
                    tmpDic.profile = tmpUser.author_details.avatar_path.substring(1, tmpUser.author_details.avatar_path.length);
                } else {
                    tmpDic.profile = "https://image.tmdb.org/t/p/original" + tmpUser.author_details.avatar_path;
                }
            } else {
                tmpDic.profile = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU";
            }
            usefulRes.push(tmpDic);
        }
        res.send(usefulRes);
    }).catch(err => {
        console.log("Get Review Went Wrong: \n" + err);
        res.send(err);
    })
});

module.exports = router;