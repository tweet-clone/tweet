const User = require('../models/user')
const bcrypt = require('bcrypt');

module.exports = {
    signup: async (req, res) => {
        const { email, password, nickname } = req.body;
        // console.log(email, password, nickname);
        const userInfo = await User.findOne({
            where: { email }
        });

        if (userInfo) {
            res.status(409).send({ message: 'already exists' });
        }

        const hashed = await bcrypt.hash(password, 10);
        await User.create( {
            email, password: hashed, nickname
        })
        res.status(201).send({ message: '회원가입 완료'})
    },
    login: async (req, res) => {
        // 1. email, password 받고 
        // 2. db에 해당 email의 가입자 찾고 
        // 3. 입력받은 password 해싱한 값과 db에 저장된 password 해시값을 비교 
        // 3-1. 틀리면 바로 리턴, 메시지 정보 맞지 않음
        // 3-2. 맞다면 token 생성 후 클라로 보내줌 
        // bycrypt, jwt 토큰 복습 

    }
}