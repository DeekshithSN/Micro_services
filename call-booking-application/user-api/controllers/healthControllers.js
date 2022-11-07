const asyncHandler = require('express-async-handler');

const health = asyncHandler(async (req, res) => {
    res.status(200).json({ status: 'ok' })
});

module.exports = { health };