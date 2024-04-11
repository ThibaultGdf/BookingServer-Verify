const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
    const SECRET_KEY = process.env.SECRET_KEY;
    const token = req.header("Authorization");

    if (!token) {
        return res
            .status(401)
            .json({ auth: false, message: "No token provided." });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ auth: false, message: "Invalid token." });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        console.log(req.user);
        res.status(403).json({
            message: "Unauthorized : Accès non autorisé !",
        });
    }
};

module.exports = { verifyJwt, isAdmin };

module.exports = { verifyJwt, isAdmin };
