const express = require('express');
const { body, validationResult } = require('express-validator');
const service = require('../services/world.service');

const router = express.Router();

errorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next();
};

router.post('/countries',
  body('code').notEmpty(),
  body('name').notEmpty(),
  body('pib').notEmpty(),
  body('pop').notEmpty(),
  errorMiddleware,
  async (req, res, next) => {
    service.addCountry(req.body)
      .then(result => {
        res.status(201).send(result);
      })
      .catch(e => {
        res.status(500).send(e);
      });
  });

router.put('/current-date',
  body('date').isISO8601(),
  errorMiddleware,
  async (req, res, next) => {
    service.setCurrentDate(req.body.date)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(e => {
        res.status(500).send(e);
      });
  });

module.exports = router;
