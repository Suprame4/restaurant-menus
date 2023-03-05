const {Restaurant, Menu} = require('./models/index')

async function fxn(){
    const foundRestaurant = await Restaurant.findByPk(1)
    console.log("test: ", foundRestaurant)
}
fxn()
