const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.headers.authorization
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    }
    next()
}

const userExtractor = async (req, res, next) => {
    const token = await req.token
    if (!token) return res.status(401).json({ error: 'token missing or invalid' })

    const decodedToken = jwt.verify(token, process.env.SECRET)
    !decodedToken.id
        ? res.status(401).json({ error: 'token missing or invalid' })
        : req.user = decodedToken
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)

    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message })
    } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'invalid token' })
    } else if (err.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'token expired' })
    }
    
    next(err)
}

module.exports = { requestLogger, tokenExtractor, userExtractor, unknownEndpoint, errorHandler }