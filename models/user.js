const { run_query } = require('../helpers/db');

exports.findAll = async (page, limit, order) => {
    /*
    * Gets all user records from the DB.
    *
    * @returns  {object}
    */

    let offset = limit * (page-1); //Used for pagination.
    let query = "SELECT ID, role_id, firstName, lastName, username, about, email, avatarURL FROM users ORDER BY ? LIMIT ? OFFSET ?;"; //Probably don't want to be getting password / password salt.
    let values = [order, parseInt(limit), offset]; //Limit tends to pass in as string not int causing an error.
    let data = await db.run_query(query, values);
    return data;
}

exports.getById = async (id) => {
    const query = "SELECT * FROM users WHERE ID = ?;";
    const values = [id];
    
    const data = await run_query(query, values);
    return data;
}

exports.createUser = async (user) => {
    // Not to be implemented until blog service is running.
}

exports.getByEmail = async (email) => {
    /*
    * Gets a user record from the db using their email.
    *
    * @param    {object}  email  An object containing user email used to find a record.
    *
    * @returns  {object}
    */
    let query = "SELECT ID, role_id, firstName, lastName, username, about, email, avatarURL FROM users WHERE email = ?;";
    let values = [email];
    let data = await db.run_query(query, values);
    return data;
}
  
exports.updateUser = async (user) => {
    /*
    * Updates a user record in the database.
    *
    * @param    {object}  user  An object containing user data to be updated in the db.
    *
    * @returns  {object}
    */
    let query = "UPDATE users SET ? WHERE ID = ?;";
    let values = [user, user.ID];
    let data = await db.run_query(query, values);
    return data;
}
  
exports.deleteUser = async (id) => {
    //Not to be implemented until blog service.
}
  
exports.getByUsername = async (username) => {
    /*
    * Gets a user record from the db using their username.
    *
    * @param    {object}  username  An object containing username used to find a db record.
    *
    * @returns  {object}
    */

    let query = "SELECT * FROM users WHERE username = ?;";
    let values = [username];
    let data = await db.run_query(query, values);
    return data;
}