const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET ;

const fetchuser = (req, res, next) => {
    // Get token from header
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }

    try {
        // Verify token
        const data = jwt.verify(token, JWT_SECRET);
        console.log("Decoded token:", data);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token. Please authenticate again." });
    }
};

module.exports = fetchuser;
