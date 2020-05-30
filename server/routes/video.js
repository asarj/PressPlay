const express = require('express');
const router = express.Router();
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');
const { User } = require("../models/User");
const { Video } = require("../models/Video");
const { Subscriber } = require("../models/Subscriber"); 
const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('Only MP4 is supported'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

//=================================
//             Video
//=================================

router.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })
});

router.post("/thumbnail", (req, res) => {

    let thumbsFilePath = "";
    let fileDuration = "";

    ffmpeg.ffprobe(req.body.filePath, function(err, metadata) {
        console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    })

    ffmpeg(req.body.filePath)
        .on("filenames", function(filenames) {
            console.log("Will generate " + filenames.join(", "))
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log("Screenshots taken")
            return res.json({success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
        })
        .screenshots({
            count: 1,
            folder: 'uploads/thumbnails',
            size:"320x240",
            filename: "thumbnail-%b.png"
        });
});

router.post("/uploadVideo", (req, res) => {
    console.log(req.body);
    const video = new Video(req.body);

    video.save((err, video) => {
        if (err) {
            return res.status(400).json({success: false, err})
        }
        return res.status(200).json({success: true});
    })

});

router.get("/getVideos", (req, res) => {
    Video.find().populate('writer').exec((err, videos) => {
        if (err) {
            return res.status(400).send(err);
        }
        return res.status(200).json({success: true, videos});
    })

});

router.post("/getVideo", (req, res) => {

    Video.findOne({ "_id" : req.body.videoId }).populate('writer').exec((err, video) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, video })
    })

});

router.post("/getSubscriptionVideos", (req, res) => {

    Subscriber.find({ 'userFrom': req.body.userFrom })
    .exec((err, subscribers)=> {
        if(err) return res.status(400).send(err);

        let subscribedUser = [];

        subscribers.map((subscriber, i)=> {
            subscribedUser.push(subscriber.userTo)
        })

        Video.find({ writer: { $in: subscribedUser }})
            .populate('writer')
            .exec((err, videos) => {
                if(err) return res.status(400).send(err);
                res.status(200).json({ success: true, videos })
            })
    })
});

module.exports = router;
