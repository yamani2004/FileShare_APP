const Url = require('../models/Url');

async function saveUrl(shortId, originalUrl) {
    const newUrl = new Url({ shortId, originalUrl });
    return await newUrl.save();
}

async function getUrlByShortId(shortId) {
    return await Url.findOne({ shortId }); // ✅ ensure it's querying by correct field
}

async function incrementCount(urlDoc) {
    urlDoc.clickCount++;
    return await urlDoc.save();
}

module.exports = {
    saveUrl,
    getUrlByShortId,
    incrementCount
};
