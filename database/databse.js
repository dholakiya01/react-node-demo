const knex = require('knex')({
    client:'mysql',
    connection:{
        host:"localhost",
        password:"",
        user:"root",
        database:"database"
    }
})
module.exports = knex