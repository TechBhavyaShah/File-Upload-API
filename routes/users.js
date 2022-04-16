const express = require('express')
const data = require('../data')
const usersData = data.users
const multer = require('multer')
const mongoCollections = require('../config/mongoCollections')
const userColl = mongoCollections.users
const router = express.Router()

//-------------for Storing Files------------------//
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/files')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(' ', '_'))
  },
})

const upload = multer({ storage: storage })
//-----------End of storing Files-----------------------


//----------------function to validate Email---------------------------//
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//---------------End of function to validate Email----------------------//



router.get('/', async (req, res) => {
    try{

            res.render("form",{title: "Upload File"});
    }catch(e){
        res.status(e.status || 500).render("error", {title: "Error", error: e.message})
    }
})


router.post('/', upload.single('document'), async (req, res) => {
  try {
    if (!req.file)  {
        res.status(400).render('form',{ title:"Upload File",error: 'You must provide the file to upload'});
        return;
    }

    if (!req.body.firstName) {
      res
        .status(400)
        .render('form', {
          title: 'Upload File',
          error: 'You must provide First Name',
        })
      return
    }
    if (!req.body.lastName) {
      res
        .status(400)
        .render('form', {
          title: 'Upload File',
          error: 'You must provide profile Last Name',
        })
      return
    }

    if (!req.body.emailAddress) {
      res
        .status(400)
        .render('form', {
          title: 'Upload File',
          error: 'You must provide profile Email Address',
        })
      return
    }

    if (!req.body.phoneNumber) {
      res
        .status(400)
        .render('form', {
          title: 'Upload File',
          error: 'You must provide profile Phone Number',
        })
      return
    }


    if (!req.body.gender) {
      res
        .status(400)
        .render('form', {
          title: 'Upload File',
          error: 'You must provide Gender',
        })
      return
    }

    if (typeof req.body.firstName !== 'string') {
      res
        .status(400)
        .render('form', {
          title: 'Upload File',
          error: 'Firstname must be string',
        })
      return
    }
    if (typeof req.body.lastName !== 'string') {
      res
        .status(400)
        .render('form', {
          title: 'Upload File',
          error: 'Lastname must be string',
        })
      return
    }
    if (typeof req.body.emailAddress !== 'string') {
      res
        .status(400)
        .render('form', {
          title: 'Upload File',
          error: 'EmailAddress must be string',
        })
      return
    }


    if (typeof req.body.gender !== 'string') {
      res
        .status(400)
        .render('form', {
          title: 'Upload File',
          error: 'Gender must be string'
        })
      return
    }

    if (typeof req.body.phoneNumber !== 'string') {
      res
        .status(400)
        .render('form', {
          title: 'Upload File',
          error: 'PhoneNumber must be string'
        })
      return
    }

    if (/^ *$/.test(req.body.firstName)) {
      res
        .status(400)
        .render('form', {
          title: 'Upload File',
          error: 'Firstname cannot be empty'
        })
      return
    }
    if (/^ *$/.test(req.body.lastName)) {
      res
        .status(400)
        .render('form', {
          title: 'Upload File',
          error: 'Lastname cannot be empty'
        })
      return
    }
    if (/^ *$/.test(req.body.emailAddress)) {
      res
        .status(400)
        .render('form', {
          title: 'Upload File',
          error: 'EmailAddress cannot be empty'
        })
      return
    }
    if (/^ *$/.test(req.body.country)) {
      res
        .status(400)
        .render('form', {
          title: 'Upload File',
          error: 'Country cannot be empty'
        })
      return
    }
    if (/^ *$/.test(req.body.gender)) {
      res
        .status(400)
        .render('form', {
          title: 'Upload File',
          error: 'Gender cannot be empty'
        })
      return
    }

    if (/^ *$/.test(req.body.phoneNumber)) {
      res
        .status(400)
        .render('form', {
          title: 'Upload File',
          error: 'PhoneNumber cannot be empty'
        })
      return
    }





    if (!validateEmail(req.body.emailAddress)) {
      res
        .status(400)
        .render('form', {
          title: 'Upload File',
          error: 'Please Enter valid Email Address'
        })
      return
    }


    let phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im
    if (!req.body.phoneNumber.match(phoneRe)) {
      res
        .status(400)
        .render('form', {
          title: 'Upload File',
          error: 'Phone number must be of correct format and all numbers'
        })
      return
    }
 
    let gen = ['Female', 'Male', 'Other']
    if (!gen.includes(req.body.gender)) {
      res
        .status(400)
        .render('form', {
          title: 'Upload File',
          error: 'Please enter valid gender'
        })
      return
    }




    try {
      const user_data = req.body
      if (req.file) {
        user_data.document = req.file.filename
      } 
      const {
        document,
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        gender
      } = user_data
      const postDocument = await usersData.createUser(
        document,
        firstName.trim(),
        lastName.trim(),
        emailAddress.trim(),
        phoneNumber.trim(),
        gender
      )

      if (postDocument) {
        res.render("userData", {document: postDocument.document, firstName: postDocument.firstName, lastName: postDocument.lastName, gender: postDocument.gender, phoneNumber: postDocument.phoneNumber, emailAddress: postDocument.emailAddress, title: "User Data"})
      }
    } catch (e) {
      res
        .status(e.status || 500)
        .render('form', {
          title: 'Upload File',
          error: e.message || `Internal Server Error`,
        })
    }
  } catch (e) {
    res
      .status(e.status || 500)
      .render('error', { title: 'Error', error: e.message })
  }
})



//------------Get Profile-------------------------//
router.get('/profile', async (req, res) => {
    try{
        if(req.session.user){
            const userdata = await usersData.getByUsername(req.session.user)
            res.render("userData", {document: userdata.document, firstName: userdata.firstName, lastName: userdata.lastName, gender: userdata.gender, phoneNumber: userdata.phoneNumber, emailAddress: userdata.emailAddress, title: "User Data"})
        }
        else{
            res.redirect("/")
            // res.render("users/error")
        }
    }catch(e){
        res.status(404).render("error/error", {error: e.message, title: "error"})
    }
})
//--------------End of get Profile----------------//

module.exports = router
