const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,   // ✅ ensures shortId is always provided
        unique: true
    },
    originalUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()  // ✅ Use a function to ensure new timestamp on each doc
    },
    clickCount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Url', urlSchema);
