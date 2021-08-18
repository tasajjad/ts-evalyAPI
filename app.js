// Dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');;
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// Import Locally 
const notFound = require('./errors/notFound');
const defaultError = require('./errors/defaultError')
const userAuthRouter = require('./routes/userAuthRouter')
const adminRouter = require('./routes/adminRouter')
const userRouter = require('./routes/userRouter')
app.use(express.json())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

/**
 * @userAuthRouter for create user and signin User
 * @auth just auhtentication releted work handle this route 
 */
app.use('/api/auth', userAuthRouter)

/**
 * @adminRouter
 */

app.use('/api/admin', adminRouter)

/**
 * 
 */

app.use('/api/user', userRouter)

/**
 * @default
 * @notFound
 */
app.use(notFound)
app.use(defaultError)

module.exports = app;