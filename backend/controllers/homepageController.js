const asyncHandler = require('express-async-handler');

const getHomepage = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'Homepage' });
});

module.exports = {
  getHomepage,
};
