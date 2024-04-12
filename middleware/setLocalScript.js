function setLocal (req, res, next) {
    const user = req.session.user;
    if (user && user.apiSecret) {
        const domain = process.env.DOMAIN;
        res.locals.scriptUrl = `${domain}/cdn/fetch-script?apiKey=${user.apiSecret}`;
    }
    next();
}

module.exports = setLocal;
