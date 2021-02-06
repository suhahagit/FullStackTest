const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize')
const apiKey = require('./credentials')
const axios = require('axios');

const sequelize = new Sequelize('mysql://root:@localhost/restaurants_db')

router.get('/sanity', function (req, res) {
    res.sendStatus(200);
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

router.get('/restaurants', async function (req, res) {
    try {
        let restaurants = await sequelize.query(`SELECT * FROM restaurants`);
        const restaurantsObj = []
        for (let r of restaurants[0]) {
            if ((r.location.split("/")).length === 2) {
                const locationArr = r.location.split("/")
                const address = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationArr[0]},${locationArr[1]}&key=${apiKey}`);
                r.location = address.data.results[1].formatted_address
            }
            restaurantsObj.push({ id: r.id, name: r.name, type: r.type, phone: r.phone, location: r.location })
        }
        res.send(restaurantsObj)
    }
    catch (error) {
        res.send(error);
    }
});

router.put('/restaurant', async (req, res) => {
    try {
        const updateObject = req.body
        const id = updateObject.id
        delete updateObject.id
        let set = Object.keys(updateObject).reduce((total, u) => {
            return total + `${u} = '${updateObject[u]}' ,`
        }, "")
        set = set.slice(0, -1);
        const query = `UPDATE restaurants SET ${set} WHERE id = "${id}" ;`
        const restaurant = await sequelize.query(query)
        res.send(restaurant)
    } catch (error) {
        res.send(error);
    }
})

router.delete('/restaurant/:id', async function (req, res) {
    try {
        const query = `DELETE FROM restaurants WHERE id = "${req.params.id}" ;`
        const restaurant = await sequelize.query(query)
        res.send(restaurant);
    } catch (error) {
        res.send(error);
    }
});

router.post('/restaurant', async (req, res) => {
    try {
        const { id, name, type, phone, location } = req.body
        const query = `INSERT INTO restaurants
        VALUES ('${id}', '${name}', '${type}', '${phone}', '${location}')`
        const restaurant = await sequelize.query(query)
        res.send(restaurant)
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;