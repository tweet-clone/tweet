const User = require('../models/user');
const Tweet = require('../models/tweet');

module.exports = {
    twLike: async (req, res) => {
        const { id } = req.params

        const addtweet = await Tweet.findOne({ where: { id: id }})
        await addtweet.addLiker(req.userId);

        const tweetPlus = await Tweet.increment({totalLike: 1}, { where: { id: id}})

        res.status(201).json(`tweetPlus = ${tweetPlus}, addtweet = ${addtweet}`)
    },
    twDisLike: async (req, res) => {
        const { id } = req.params

        const tweet = await Tweet.findOne({ where: { id: id }})
        await tweet.removeLiker(req.userId);

        const tweetMinus = await Tweet.increment({totalLike: -1}, { where: { id: id }})

        res.status(201).json(tweetMinus)
    }
}

        // `SELECT TweetLike.UserId, TweetLike.TweetId FROM tweets JOIN TweetLike ON tweet.id = TweetLike.TweetId JOIN users ON TweetLike.UserId = users.id`
        // const tweetLike = await Tweet.findOne({
        //     include: [{
        //         model: User,
        //         // attributes: ['UserId', 'TweetId'],
        //         through: 'TweetLike'
        //     }]
        // })
        // console.log(tweetLike)