const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const { sequelize } = require('./models');

sequelize.sync({ force: false })
  .then(() => {
      console.log('데이터베이스 연결 성공')
  })
  .catch((err) => {
      console.error(err)
  })

const app = express();



app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

const indexRouter = require('./routes/index')
app.use('/', indexRouter);


// const 
app.listen(3000, () => {
    console.log(`3000번 포트에서 대기중`)
})