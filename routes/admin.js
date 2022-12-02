var express = require('express');
// const { response, render } = require('../app');
const collection = require('../config/collection');
const adminHelpers = require('../helpers/admin-helpers');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();
// const { route } = require('./user');


/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.session.adminLoggedIn) {

    adminHelpers.getAllUsers().then((users) => {
      // console.log(users);
      res.render('admin/view_users', { users })
    })
  }
  else {
    res.redirect('/admin/admlogin')
  }

});
router.get('/admlogin', (req, res) => {
  
  if (req.session.adminLoggedIn) {

    res.redirect('/admin/')
  } else
    res.render('admin/admin_login',{ 'loginErr': req.session.loginErr })
    req.session.loginErr=false

})

router.post('/admlogin', (req, res) => {
  
  if (req.body.Email === 'admin@admin.com' && req.body.Password === 'admin') {
    req.session.adminLoggedIn = true
    res.redirect('/admin/')
  }
  else {
    req.session.loginErr = true
    res.redirect('/admin/admlogin')
  }


})
router.get('/add-user', (req, res) => {
  if(req.session.adminLoggedIn){
    console.log('from add rqst');
  res.render('admin/add-user',{errorMessage:req.session.usedEmail})
  req.session.usedEmail=false
  }
  else{
    res.redirect('/admin/admlogin')
  }
  
})

router.post('/add-user', (req, res) => {

  adminHelpers.addUser(req.body).then((response) => {
    if(response.Email){
      req.session.usedEmail=true
      res.redirect('/admin/add-user')
    }
    else{
      console.log(req.body);
    res.redirect('/admin/')
    }
    
  })

})

router.get('/delete-user/:id', (req, res) => {
  if (req.session.adminLoggedIn) {
    let uId = req.params.id
    console.log(uId);
    adminHelpers.deleteUser(uId).then((response) => {
      res.redirect("/admin/")
    })
  }

})

router.get('/edit-user/:id', async (req, res) => {
  if (req.session.adminLoggedIn) {
    let user = await adminHelpers.getUserDetails(req.params.id)
    console.log(user);
    res.render('admin/edit_user', { user })
  }


})
router.post('/edit-user/:id', (req, res) => {
  console.log(req.params)
  adminHelpers.upadteUserDetails(req.params.id, req.body).then(() => {
    res.redirect('/admin/')
  })

})


router.get('/logout', (req, res) => {
  req.session.adminLoggedIn = false
  res.redirect('/admin/admlogin')

})

module.exports = router;
