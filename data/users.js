const ObjectID = require('mongodb').ObjectId
const mongoCollections = require('../config/mongoCollections')
const users = mongoCollections.users

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

async function createUser(
  document,
  firstName,
  lastName,
  emailAddress,
  phoneNumber,
  gender,
) {
  if (
    !firstName ||
    !lastName ||
    !emailAddress ||
    !phoneNumber ||
    !gender ||
    !document
  ) {
    throw { message: `All fields must be supplied`, status: 400 }
  }

  if (typeof firstName !== 'string')
    throw { message: `firstName must be string`, status: 400 }
  if (typeof lastName !== 'string')
    throw { message: `lastName must be string`, status: 400 }
  if (typeof emailAddress !== 'string')
    throw { message: 'emailAddress must be string', status: 400 }
  if (typeof gender !== 'string')
    throw { message: 'gender must be string', status: 400 }
  if (typeof phoneNumber !== 'string')
    throw { message: 'phoneNumber must be string', status: 400 }

  if (/^ *$/.test(firstName))
    throw { message: `firstName cannot be empty`, status: 400 }
  if (/^ *$/.test(lastName))
    throw { message: `lastName cannot be empty`, status: 400 }
  if (/^ *$/.test(emailAddress))
    throw { message: `emailAddress cannot be empty`, status: 400 }
  if (/^ *$/.test(gender))
    throw { message: `gender cannot be empty`, status: 400 }
  if (/^ *$/.test(phoneNumber))
    throw { message: `phoneNumber cannot be empty`, status: 400 }

  if (!validateEmail(emailAddress))
    throw { message: `Please Enter valid Email Address`, status: 400 }

  let phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im
  if (!phoneNumber.match(phoneRe))
    throw {
      message: `Phone number must be in correct format and all numbers`,
      status: 400,
    }

  let gen = ['Female', 'Male', 'Other']

  if (!gen.includes(gender))
    throw { message: `Please enter valid gender`, status: 400 }

  const userCollection = await users()

  const lowerUser = emailAddress.toLowerCase()
  const userexists = await userCollection.findOne({ emailAddress: lowerUser })

  if (userexists)
    throw {
      message: `User with that email address already exists`,
      status: 400,
    }

  let newUser = {
    document: document,
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress.toLowerCase(),
    phoneNumber: phoneNumber,
    gender: gender,
  }

  const insertInfo = await userCollection.insertOne(newUser)
  if (insertInfo.insertCount == 0)
    throw { message: `Could not add user`, status: 400 }

  const newId = insertInfo.insertedId.toString()
  const user = await get(newId)

  return JSON.parse(JSON.stringify(user))
}

async function get(id){
    if(!id) throw {message: `You must provide a proper id`, status:400}
    if(typeof id != 'string') throw {message: `${id} is not string`, status: 400}
    if(/^ *$/.test(id)) throw {message: `id with just empty spaces is not valid`, status: 400}

    const userCollection = await users()
    let getId

    try{
        getId = ObjectID(id);
    }
    catch(e){
        throw {message: `Id is invalid because of ${e}`, status: 400}
    }

    const user = await userCollection.findOne({ _id: getId})

    if(user === null) throw {message: `No user exists with that id`, status: 400};

    return JSON.parse(JSON.stringify(user));

}






module.exports = {
  createUser,
  get
}
