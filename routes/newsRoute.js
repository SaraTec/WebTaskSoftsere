const express = require('express');
const router = express.Router();
const News = require('../models/News');

router.get('/', async (req, res) => {
  try {
    const news = await News.find();

    return res.status(200).send({ error: false, news });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;
    const news = await News.create(body);

    return res.status(201).send({ error: false, news });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

module.exports = router;
