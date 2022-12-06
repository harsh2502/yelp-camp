const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb+srv://Sumo:hello@cluster2.pdtpxlm.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '62c2e41516877f744dd57e78', 
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum ',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dijf2pnrg/image/upload/v1657046635/YelpCamp/kumwgwnrdsvr1g50hym2.jpg',
                  filename: 'YelpCamp/kumwgwnrdsvr1g50hym2'
                },
                {
                  url: 'https://res.cloudinary.com/dijf2pnrg/image/upload/v1657046635/YelpCamp/xfalyzbf2id1cfe2hbpy.jpg',
                  filename: 'YelpCamp/xfalyzbf2id1cfe2hbpy'
                }
              ] 
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})