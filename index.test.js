const sequelize = require('./db')
const {Restaurant, Menu, Item} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
    seedItem
  } = require('./seedData');

describe('Restaurant, Item and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    });

    test('can create a Restaurant', async () => {
        // TODO - write test
        const rest1 =  Restaurant.create({
            name: "testName",
            location: "testLocation",
            cuisine: "testCuisine"
        })
        const rest2 = Restaurant.findByPk(1)
        //console.log(rest1)
        expect(rest1).toEqual(rest2)
    });
    
    test('can create a Menu', async () => {
        // TODO - write test
        const menu1 = Menu.create({
            title: "testTitle"
        })

        const menu2 = Menu.findByPk(1)

        expect(menu1).toEqual(menu2)
    });

    test('can find Restaurants', async () => {
        // TODO - write test
        const foundRestaurant = Restaurant.findByPk(1)
    
        expect(foundRestaurant).toEqual(Restaurant.findByPk(1))
    });

    test('can find Menus', async () => {
        // TODO - write test
        const foundMenu = Menu.findByPk(1)

        expect(foundMenu).toEqual(Menu.findByPk(1))
    });

    test('can delete Restaurants', async () => {
        // TODO - write test

        //await rest1.destroy()
        
        Restaurant.destroy({
            where: {
                name: "testName"
            }
        })
        
        const deletedRestaurants = await Restaurant.findByPk(1)

        expect(deletedRestaurants).toEqual(null)
    })

    test('test association with restaurant and menu (one-to-many)', async () => {
        await Menu.bulkCreate(seedMenu)
        await Restaurant.bulkCreate(seedRestaurant)
    
        const allRest = await Restaurant.findAll()
        console.log(allRest)

        const someRestaurant = await Restaurant.findByPk(2)
        await someRestaurant.addMenu(2)
        await someRestaurant.addMenu(3)
        await someRestaurant.addMenu(4)

        const menus = await Menu.findByPk(2)

        const restMenus = await someRestaurant.getMenus()

        console.log("TEST: ", menus)
        console.log("TEST 2: ", restMenus)

        expect(restMenus.length).toBe(3)
    
    })

    test('test association with item and menu (many-to-many)', async () => {
        //through table: menu_items

        await Menu.bulkCreate(seedMenu)
        await Item.bulkCreate(seedItem)

        let someMenu = await Menu.findByPk(2)
        let someItem = await Item.findByPk(1)

        //console.log("MENU: ", someMenu)
        //console.log("ITEM: ", someItem)

        await someMenu.addItem(1)
        await someMenu.addItem(2)
        await someMenu.addItem(3)

        await someItem.addMenu(2)
        await someItem.addMenu(3)
        await someItem.addMenu(4)

        let menuItems = await someMenu.getItems()

        let itemMenus = await someItem.getMenus()

        expect(menuItems.length).toBe(itemMenus.length)
    })
})