const { nanoid } = require('nanoid');
const Url = require('../models/Url');

function isValid(url) {
    try {
        new URL(url); // validates format
        return true;
    } catch (err) {
        return false;
    }
}

async function saveUrl(shortId, originalUrl) {
    const urlDoc = new Url({
        shortId: shortId, // ✅ use correct field name
        originalUrl,
        clickCount: 0      // ✅ match schema
    });
    return await urlDoc.save();
}

async function getUrlByShortId(shortId) {
    return await Url.findOne({ shortId: shortId }); // ✅ use correct field
}

async function incrementCount(urlDoc) {
    urlDoc.clickCount += 1; // ✅ match schema
    await urlDoc.save();
}

async function shortenUrl(originalUrl) {
    try {
        if (!originalUrl) {
            throw new Error('Original URL is required');
        }

        if (!originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')) {
            originalUrl = 'http://' + originalUrl;
        }

        if (!isValid(originalUrl)) {
            throw new Error('Invalid URL');
        }

        const shortId = nanoid(6); // generate short ID
         const urlDoc = await saveUrl(shortId, originalUrl);
        return shortId;
    } catch (error) {
        throw new Error('Error creating short URL: ' + error.message);
    }
}

async function redirectUrl(shortId) {
    try {
        const urlDoc = await getUrlByShortId(shortId);
        if (!urlDoc) {
            throw new Error('URL not found');
        }
        await incrementCount(urlDoc);
        return urlDoc.originalUrl;
    } catch (error) {
        throw new Error('Error occurred while redirecting: ' + error.message);
    }
}

async function shortenUrlHandler(req, res, next) {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: 'Please provide a valid URL' });
        }

        const urlDoc = await shortenUrl(url);
        res.json({
            shortUrl: `${req.protocol}://${req.get('host')}/api/${urlDoc.shortId}` // ✅ use shortId
        });
    } catch (err) {
        if (err.message.includes('Invalid URL')) {
            return res.status(400).json({ error: 'Invalid URL' });
        }
        next(err);
    }
}

module.exports = {
    shortenUrlHandler,
    redirectUrl,
    shortenUrl
};
