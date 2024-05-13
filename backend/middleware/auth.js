const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        return console.log(req.headers.user);
        const token = req.headers.user.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch(error) {
        res.status(401).json({ error });
    }
};
