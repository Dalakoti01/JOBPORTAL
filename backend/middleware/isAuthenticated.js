import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;  // Ensure token is retrieved from cookies

        // If token is not found, send an error response
        if (!token) {
            return res.status(401).json({
                message: 'User not authenticated',
                success: false,
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // If token is valid, attach user info to request object
        req.id = decoded.userId;

        // Proceed to next middleware or route handler
        next();
    } catch (error) {
        // Handle any error during verification
        console.error('Authentication error:', error.message);

        return res.status(401).json({
            message: 'Invalid or expired token',
            success: false,
        });
    }
};

export { isAuthenticated };
