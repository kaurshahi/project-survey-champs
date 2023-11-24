const express = require("express");
const router = express.Router();

const assetRegex = /\/.+\.((svg|png|jpg|jpeg|mp4|ogv)(\?[^?]+)?)$/;

router.get(assetRegex, (req, res) => {
  const filePath = req.path;
  const baseURL = `http://localhost:3000/src`;
  res.redirect(303, `${baseURL}${filePath}`);
});

module.exports = router;
