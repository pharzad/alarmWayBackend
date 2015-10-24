'use strict';

var app = require('../app');
var News = require('../../app/models/news');

function getAllSources(req, res) {
    News.find({}, function (err, news) {
        if (err) {
            res.send(err);
        }
        res.json(news);
    });
}

function createSource(req, res) {
    var news = new News();
    
    news.title = req.body.title;
    news.feed = req.body.feed;
    news.image = req.body.image;
    
    news.save(function (err) {
        if (err) res.send(err);
        res.json({
            source: req.body.title,
            message: 'Created'
        });
    });
}

function deleteSource(req, res) {
    News.remove({
        _id: req.params.sourceId
    }, function (err) {
        if (err)
            res.send(err);

        res.json({
            message: 'Successfully deleted'
        });
    });
}

app.get('/news', getAllSources);
app.post('/news', createSource);
app.delete('/news/:sourceId', deleteSource);