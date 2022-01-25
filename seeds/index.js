const express = require("express");
const path = require("path");
const cities = require("./cities");
const mongoose = require("mongoose");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect(
  "mongodb+srv://MERN:OneStep@cluster0.vc9ol.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "61ed90786704f126da966354",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, voluptatibus?Culpa sint in, non cumque, eius fugit ducimus vero molestias at placeat qui quodharum quae dolore deserunt ad illo!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dpu1jig6c/image/upload/v1643112053/YelpCamp/f7bhn8xydnumffqouiwb.jpg",
          filename: "YelpCamp/f7bhn8xydnumffqouiwb",
        },
        {
          url: "https://res.cloudinary.com/dpu1jig6c/image/upload/v1643112053/YelpCamp/wwwuz8jf8rvhs6euierh.jpg",
          filename: "YelpCamp/wwwuz8jf8rvhs6euierh",
        },
        {
          url: "https://res.cloudinary.com/dpu1jig6c/image/upload/v1643112053/YelpCamp/cwmxlhdswojcycrir6zg.jpg",
          filename: "YelpCamp/cwmxlhdswojcycrir6zg",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
