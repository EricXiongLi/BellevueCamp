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
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/random/?city,night",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, voluptatibus?Culpa sint in, non cumque, eius fugit ducimus vero molestias at placeat qui quodharum quae dolore deserunt ad illo!",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});