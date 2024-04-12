const User = require('../models/user');

async function isAuthenticated (req, res, next) {
    const isAuth = req.session.isAuthenticated || false;
    
    if (!isAuth) {
        const returnUrl = encodeURIComponent(req.originalUrl);
        return res.redirect(`/auth/login?returnUrl=${returnUrl}`);
    }

    const userId = req.session.userId;
    const user = await User.findById(userId);
    if (!user) {
        req.session.showMessage = true;
        req.session.message = 'Please complete the setup to continue';
    }
    req.session.user = user;
    next();
}

module.exports = isAuthenticated;