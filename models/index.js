const Restaurant = require('./Restaurant')
const Menu = require('./Menu')
const Item = require('./Item')

//one to many association
Menu.belongsTo(Restaurant)
//one-to-many relationship
Restaurant.hasMany(Menu)

//many to many association
Menu.belongsToMany(Item, {through: "menu_items"})
Item.belongsToMany(Menu, {through: "menu_items"})

module.exports = { Restaurant, Menu, Item }
