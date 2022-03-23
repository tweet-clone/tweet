const User = require('../models/user');
const Tweet = require('../models/tweet');

module.exports = {
    get: async (req, res) => {
        const getTweet = await Tweet.findAll({})
        res.status(200).json(getTweet)
    },
    post: async (req, res) => {
        const { content, picture } = req.body;
        if ( !content || !picture) res.status(403).json({})

        const makeTweet = await Tweet.create({
            content,
            picture,
            totalLike: 0,
            totalReply: 0,
            UserId : req.userId,
        })
        res.status(201).json(makeTweet)
    },
    update: async (req, res) => {
        // 업데이트 할 트윗 
        const { id } = req.params;
        const { content } = req.body

        const tweet = await Tweet.findOne({
            where: {
                id: id,
                UserId: req.userId
            }
        })
        if (!tweet) return res.status(404).json({ message: `다른 유저의 트윗은 변경할 수 없습니다.`})
   
        const updated = await Tweet.update({ content: content }, {
                where: {
                    id: id,
                }
        }).catch((err) => {
            console.log(err)
         })

        res.status(200).json(updated) 
    },
    del: async (req, res) => {
        const { id } = req.params;
        const tweet = await Tweet.findOne({
            where: {
                id: id,
                UserId: req.userId
            }
        })
        if (!tweet) return res.status(404).json({ message: `다른 유저의 트윗은 삭제 할 수 없습니다.`})
        
        const deleted = await Tweet.destroy({
            where: {
                id: id
            }
        })

        res.status(204).json(deleted)
    }
}