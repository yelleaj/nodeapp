const Pool = require("pg").Pool



const pool = new Pool({
    user : "postgres",
    password : "Bharath@04",
    host : "localhost",
    port : 5432,
    database : "Login_Registerpage"

});
pool.connect();


module.exports = pool;