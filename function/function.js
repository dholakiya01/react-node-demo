const db = require('../database/databse');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const hashpassword = '$2b$10$fnbpcXZhTei9PTsBYeGyaeLRPKmfCfrdG81rTHZjF3vcFh72X4DVe'
require('dotenv').config();

async function validationEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid Email"
  }
  const user = await db('users').where({ email }).first()
  console.log(user, 10)
  if (user) {
    return false
  }
  else {
    return true
  }
}

async function getuser() {
  try {
    const data = await db('users').select('*')
    return data

  } catch (err) {
    console.log({ err: err.message })
  }
}

//profile data
async function profileget() {
  try {
    const data = await db('profile').first()
    let item = data.hobbies
    data.hobbies = item
    return data

  } catch (err) {
    console.log({ err: "error in profile" })
  }
}
async function profilepost(hobbies) {
  try {
    const data = await db('profile').insert({ hobbies })
    console.log(data)
    return data;

  }
  catch (err) {
    console.log({ err: "error in profile" })
  }
}


// Login API
// async function postuser(email, password) {
//   try {
//     const user = await db("users").where({ email, password }).first()
//     // .where("name", "like", `%${name}%`)
//     // .orWhere("email", "like", `%${name}%`)
//     // .first();
//     if (!user) {
//       throw new Error('user Not found')
//     }
//     const passwordmatch = await bcrypt.compare(password, user.password);
//     if (!passwordmatch) {
//       throw new Error("invalid password");
//       // return ({ message: 'Password must be at least 8 characters long' });
//     } else {
//       const jwtsecretkey = process.env.JWT_SECRET_KEY;
//       const data = {
//         // time: Date(),
//         expriresIn: '10h',
//         userData: user,
//       };
//       const token = jwt.sign(data, jwtsecretkey);
//       return { message: "Login successfully", token: token };

//     }
//   } catch (error) {
//     throw error;
//   }
// }


//join 

async function joindata() {
  try {
    const users = await db('users')
      .join('profile', 'users.id', "=", "profile.id")
      .select(
        'users.id',
        'users.name',
        'users.email',
        'profile.hobbies',
      )
      .first()
    // console.log(users,"120")

    let temp = users.hobbies;
    let parsevlaue = JSON.parse(temp);
    users.hobbies = parsevlaue;
    return users

  } catch (eror) {
    return eror
  }
}

//login api
async function LoginApi(name, password) {
  console.log(name, "ggg100")
  try {
    const user = await db("users")
      .where("name", "like", `%${name}%`)
      .orWhere("email", "like", `%${name}%`)
      .first();
    if (!user) {
      throw new Error("User not found")
    }
    const match = await bcrypt.compare(password,
      user.password)
    console.log(password, "105")
    if (!match) {
      throw new Error("Invalid password")
    } else {
      let jwtsecretkey = process.env.JWT_SECRET_KEY;
      let data = {
        time: Date(),
        userData: user,
      }
      const token = jwt.sign(data, jwtsecretkey)
      return { message: "Login Successful", token: token }
    }
  }
  catch (err) {
    throw new Error(err)
  }
}

//post
async function postnew(name, email, password) {
  try {
    const user = await db('users').insert({ name, email, password })
    let jwtsecretkey = process.env.JWT_SECRET_KEY
    let data = {
      expriresIn: '20h',
      userData: user,
    }
    const token = jwt.sign(data, jwtsecretkey)
    // console.log(token, '69')
    return { message: 'Registration successfull !', token: token }
  } catch (err) {
    throw new Error(err)
  }
}

//update
async function putuser(id, name, email, password) {
  try {
    const data = await db('users').where({ id }).update({ name, email, password })
    return data
  }
  catch (err) {
    console.log({ err: err.message })
  }
}


//profile update
async function ProfilePut(id, name, email, hobbies) {
  try {
    const data = await db('users')
      .where('users.id', '=', id)
      .update({
        "users.name": name,
        "users.email": email
      })
    const user = await db('profile')
      .where("profile.id", "=", id)
      .update({
        "profile.hobbies": JSON.stringify(hobbies)
      })
    if (data && user) {
      return "user update successfully"
    }
    else {
      return "something went wrong"
    }

  } catch (err) {
    console.log(err)
  }
}

//feedback

async function feedbackget() {
  try {
    const data = await db('feedback').select("*")
    return data
  } catch (err) {
    console.log(err)
  }
}
async function feedback(name, email, message) {
  try {
    const data = await db('feedback').insert({ name, email, message })
    return data
  }
  catch (err) {
    console.log(err)
  }
}

//list data and pagination

// async function listuser(page = 1, limit = '*') {
//   try {
//     const offset = (page - 1) * limit 
//     const query = await db('users')
//       .join('profile', "users.id", "=", "profile.id")
//       .select('*')
//       .limit(limit)
//       .offset(offset)

//       let queryCount = db('users').count('users.id as totalUserCount').join('profile', "users.id", "=", "profile.id").first() 

//       let users = await query

//       const totalUser = await queryCount
//       const finalData = {}
//       finalData["totalUser"] = totalUser.totalUserCount
//       finalData["users"] = users
//       return finalData
//     // return data
//   } catch (err) {
//     console.log(err)
//   }
// }

async function listuser(page = 1, limit = 10, searchterm) {
  try {
    const offset = (page - 1) * limit
    // const perPage = 5;
    let query = db("users")
      .join("profile", "users.id", "=", "profile.id") 
      .select("*")
      .limit(limit)
      .offset(offset)

    let querycount = db('users')
      .count('users.id as totalusercount')
      .join('profile', 'users.id', '=', 'profile.id')
      .first()

    if(searchterm){
      query = query.where("name", "like", `%${searchterm}%`)
      query = query.orWhere("email", "like", `%${searchterm}%`)
      query = query.orWhere("hobbies", "like", `%${searchterm}%`)
      querycount = querycount.where("name", "like", `%${searchterm}%`)
      querycount = querycount.orWhere("email", "like", `%${searchterm}%`)
      querycount = querycount.orWhere("hobbies", "like", `%${searchterm}%`)
    }

    // const [users, { total }] = await Promise.all([query, countQuery]);

    let users = await query
    const totaluser = await querycount
    const finalData = {}
    finalData["totaluser"] = totaluser.totalusercount
    finalData['users'] = users
    return finalData
  }
  catch (err) {
    console.log(err)
  }
}



module.exports = { getuser, LoginApi, joindata, validationEmail, postnew, putuser, ProfilePut, profileget, feedback, feedbackget, listuser, profilepost }