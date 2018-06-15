var path = require("path");
var friendsList = require('../data/friends.js');

module.exports = function (app) {
    //route that displays JSON of all possible friends
    app.get('/api/friends', function (req, res) {
        res.json(friendsList);
    });

    app.post('/api/friends', function (req, res) {
        //setup variables for finding match
        var newFriend = req.body;
        var newScore = newFriend.scores;
        var bestMatch = 1000;
        var total = 0;
        var index = -1;

        for (var i = 0; i < friendsList.length; i++) {
            total = 0;

            for (var j = 0; j < newScore.length; j++) {
                //calculate total value for each friend
                var diff = Math.abs(newScore[j] - friendsList[i].scores[j]);
                total += diff;
            }
            if (total < bestMatch) {
                bestMatch = total;
                index = i;
            }
        }
        console.log('Best Match:', friendsList[index]);
        friendsList.push(newFriend);
        res.json(friendsList[index]);
    });
};