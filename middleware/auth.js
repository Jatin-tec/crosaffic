function isAuthenticated(req, res, next) {
    const isAuth = req.session.isAuthenticated || false; // Replace with your auth check

    if (!isAuth) {
        return res.status(403).send('You need to be authenticated to access this page');
    }
    next(); // User is authenticated, proceed to the next middleware/route handler
}

module.exports = isAuthenticated;