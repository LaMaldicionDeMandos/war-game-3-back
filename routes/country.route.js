const express = require('express');
const { body, validationResult } = require('express-validator');
const service = require('../services/countries.service');

const router = express.Router();

errorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next();
};

router.post('/',
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

router.get('/',
  async (req, res) => {
    service.getAllCountries()
      .then(result => {
        res.status(200).send(result);
      })
      .catch(e => {
        res.status(500).send(e);
      });
  });

router.get('/:id',
  (req, res) => {
    service.getCountry(req.params.id)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(e => {
        res.status(500).send(e);
      });
  });

module.exports = router;
