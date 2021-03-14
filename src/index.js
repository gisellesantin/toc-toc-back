const express = require('express');
const cors = require('cors');
const config = require('../knexfile.js');
const knex = require('knex')(config.development);
const { ERROR_CODE, DEFAULT_PORT } = require('./utils/constants');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/get/resource/memory', async (req, res) => {
  try {
    const { start, end } = req.query;
    const splitedStart = start.split('T');
    const splitedEnd = end.split('T');

    const hostData = await knex('host_data').whereBetween('created_at', [
      splitedStart[0] + ' ' + splitedStart[1].split('.')[0],
      splitedEnd[0] + ' ' + splitedEnd[1].split('.')[0],
    ]);

    res.status(200).send(hostData);
  } catch (e) {
    console.log(e.message);
    res.status(ERROR_CODE).send(e.message);
  }
});

const expressPort = process.env.PORT || DEFAULT_PORT;

app.listen(expressPort, () => console.log(`Listening on port ${expressPort}`));
