const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.id && !decoded.userId) {
            console.error('Token missing user ID:', decoded);
            return res.status(401).json({ error: 'Invalid token structure' });
        }
        req.user = {
            id: decoded.id || decoded.userId,
            ...decoded
        };

        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(403).json({ error: 'Invalid or expired token.' });
    }
};

module.exports = authenticateToken;