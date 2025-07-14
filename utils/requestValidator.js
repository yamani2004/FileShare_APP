function validate(req, res, next) {
    const { url } = req.body;

    if (url == null || url.trim() === '') {
        return res.status(400).json({ error: "URL cannot be null or empty" });
    }

    next(); // ✅ move to the next middleware/handler if valid
}

module.exports = validate;
