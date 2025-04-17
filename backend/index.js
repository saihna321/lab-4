const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const placesRoutes = require('./routes/places');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/api/users', usersRoutes);
app.use('/api/places', placesRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Сервер ${PORT} порт дээр аслааааа......`);
});
