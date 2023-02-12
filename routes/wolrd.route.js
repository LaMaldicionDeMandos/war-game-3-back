const express = require('express');
const { body, validationResult } = require('express-validator');
const service = require('../services/world.service');

const keepPropertiesAfter = require('./keepPropertiesAfter');

const router = express.Router();

errorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next();
};

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

router.get('/current-date',
  async (req, res) => {
    service.getCurrentDate()
      .then(result => {
        res.status(200).send(result);
      })
      .catch(e => {
        res.status(500).send(e);
      });
  });

router.get('/cities',
  async (req, res) => {
    service.getAllCities()
      .then(result => {
        res.status(200).send(result);
      })
      .catch(e => {
        res.status(500).send(e);
      });
  });

router.get('/events/next',
  [keepPropertiesAfter('_id,countryId,type,date')],
  async (req, res) => {
    service.getNextEvent()
      .then(result => {
        res.status(200).send(result);
      })
      .catch(e => {
        res.status(500).send(e);
      });
  });

module.exports = router;
