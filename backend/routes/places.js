const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const places = [];

router.get('/user/:uid', (req, res) => {
    const userPlaces = places.filter(place => place.creatorId === req.params.uid);
    res.json({ places: userPlaces });
});

router.get('/:pid', (req, res) => {
    const place = places.find(p => p.id === req.params.pid);
    if (!place) return res.status(404).json({ message: 'Place not found' });
    res.json({ place });
});

router.post('/', (req, res) => {
    const { title, description, address, location, photoUrl, creatorId } = req.body;
    const newPlace = {
        id: uuidv4(),
        title,
        description,
        address,
        location,
        photoUrl,
        creatorId
    };
    places.push(newPlace);
    res.status(201).json({ place: newPlace });
});

router.patch('/:pid', (req, res) => {
    const place = places.find(p => p.id === req.params.pid);
    if (!place) return res.status(404).json({ message: 'Тийм газар олдсонгүй...' });

    const { title, description, address } = req.body;
    if (title) place.title = title;
    if (description) place.description = description;
    if (address) place.address = address;

    res.json({ place });
});

router.delete('/:pid', (req, res) => {
    const index = places.findIndex(p => p.id === req.params.pid);
    if (index === -1) return res.status(404).json({ message: 'Тийм газар олдсонгүй...' });

    places.splice(index, 1);
    res.status(200).json({ message: 'Газрыг амжилттай устгалаа!' });
});

module.exports = router;
