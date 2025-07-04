import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorised. Login Again' });
    }

    try {
        // Bearer <token> => extract just the token
        if (token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode?.id) {
            req.userId = tokenDecode.id;
            next();
        } else {
            return res.status(401).json({ success: false, message: 'Invalid token payload' });
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
};

export default userAuth;
