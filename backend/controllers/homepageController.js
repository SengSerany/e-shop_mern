const getHomepage = (req, res) => {
  res.status(200).json({ endpoint: 'Homepage' });
};

module.exports = {
  getHomepage,
};
