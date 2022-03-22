const jwt = require('jsonwebtoken');
const User = require('../models/user')
const dotenv = require('dotenv');
dotenv.config

module.exports = async (req, res, next) => {
        const header = req.get('Authorization');
        // console.log(header)
        if (!(header && header.startsWith('Bearer '))) {
            return res.status(401).json({ message: 'Authentication Error' });
          }
          const token = header.split(' ')[1];
          
          jwt.verify(
              token,
              process.env.JWT_SECRET,
              async (error, decoded) => {
                  if (error) {
                      return res.status(401).json({ message: 'Authentication Error' });
                  }
                  const user = await User.findOne({ where: { id: decoded.id } })
                  if (!user) {
                    return res.status(401).json({ message: 'Authentication Error' });
                  }
                  req.userId = user.id;
                  req.token = token
                  next();
              }
          )
    }
