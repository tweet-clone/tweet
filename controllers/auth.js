const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config
const { signUpSchema } = require('./validation/validation.js');
 
module.exports = {
    signup: async (req, res) => {
        // const { email, password, nickname } = req.body;
        const { email, password, nickname } = await signUpSchema.validateAsync(req.body);
        const userInfo = await User.findOne({
            where: { email }
        });
        if (userInfo) {
            res.status(409).send({ message: 'already exists' });
        }
        else {
            const hashed = await bcrypt.hash(password, 10);
            await User.create({
                email, password: hashed, nickname
            })
            res.status(201).send({ message: '회원가입 완료'})
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(401).json({ message: 'Invalid user or password'});
        }
        const isValidPasssword = await bcrypt.compare(password, user.password);
        if (!isValidPasssword) {
            return res.status(401).json({message: 'Invalid user or password'});
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.status(200).json({ token, id: user.id });
    },
    me: async (req, res) => {
        const user = await User.findByPk(req.userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ token: req.token, id: user.id });
    }
}