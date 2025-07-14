const express = require('express');
const router = express.Router();
const { shortenUrlHandler, redirectUrl } = require('../service/urlService');

// Route to shorten a URL
router.post('/shorten', shortenUrlHandler);

// Route to handle redirection
router.get('/:shortId', async (req, res, next) => {
    try {
        const originalUrl = await redirectUrl(req.params.shortId);
        res.redirect(originalUrl);
    } catch (err) {
        if (err.message === 'URL not found') {
            return res.status(404).json({
                error: {
                    message: 'URL not found'
                }
            });
        }
        next(err); // ✅ pass the actual error object, not `error`
    }
});

module.exports = router;
