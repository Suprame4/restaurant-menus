//imports 
const sequelize = require('./db')

const {Menu, Restaurant} = require('./models/index')
//import the data from the seed data 
const {seedMenu, seedRestaurant} = require('./seedData')

//define a function that will help you seed the data into your table 
//async await makes the function behave asynchronous

async function seedData(){
    //sync our database - clear out all tables - everytime we restart our app we wont create duplicates
    await sequelize.sync({ force: true})

    //add seedMenu and seedRestaurant to each individual Menu and Restaurant models
    await Menu.bulkCreate(seedMenu)
    await Restaurant.bulkCreate(seedRestaurant)

    console.log("database seeded successfully")
}

seedData()

