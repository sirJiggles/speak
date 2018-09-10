const router = require('express').Router();
const translate = require('google-translate-api');

router.post('/translate', function(req, res, next) {
  translate(req.body.text, req.body.format)
    .then(translation => {
      res.send({
        text: translation.text
      });
    })
    .catch(err => {
      res.status(500);
      res.send({
        error: err
      });
    });
});

module.exports = router;
