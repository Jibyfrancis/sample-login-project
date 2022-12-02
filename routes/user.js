var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers')



/* GET home page. */
router.get('/', function (req, res, next) {
  let user = req.session.user

  let products = [

    {
      name: 'Apple iPhone 12 (64GB) - Blue',
      decription: 'A14 Bionic chip with next-generation Neural Engine',
      price: 10222,
      category: "mobile",
      image: 'https://m.media-amazon.com/images/I/71ZOtNdaZCL._SX679_.jpg'

    },
    {
      name: 'OPPO F21 Pro (Sunset Orange, 128GB)',
      decription: 'Ultra-slim Retro Design with First Fiberglass',
      price: 1500,
      category: "mobile",
      image: 'https://m.media-amazon.com/images/I/81W6rHmWHhL._SX569_.jpg'

    },
    {
      name: 'OnePlus Nord 2T 5G',
      decription: ' OxygenOS based on Android 12. Processor: Mediatek Dimensity 1300',
      price: 1500,
      category: "mobile",
      image: 'https://images-eu.ssl-images-amazon.com/images/I/41iEc0hf6TL._SX300_SY300_QL70_FMwebp_.jpg'

    },
    {
      name: 'Samsung Galaxy S22 Ultra 5G',
      decription: 'The first Galaxy S with embedded S Pen',
      price: 1500,
      category: "mobile",
      image: 'https://images-eu.ssl-images-amazon.com/images/I/41QPv5h1veL._SX300_SY300_QL70_FMwebp_.jpg'

    },
  ]

  res.render('index', { products, user });
});
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
  }
  else {
    res.render('user/login', { 'loginErr': req.session.loginErr })
    req.session.loginErr = false
  }


})
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')

  }
  else {
    res.render('user/signup', { errorMessage: req.session.usedEmail })
    req.session.usedEmail = false
  }

})
router.post('/signup', (req, res) => {

  console.log("signup")
  userHelpers.doSignup(req.body).then((response) => {
    if (response.Email) {
      req.session.usedEmail = true
      res.redirect('/signup')
    }
    else {
      // console.log(response); 
      console.log(req.body)
      res.redirect('/login')
    }

  })

})
router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')
    }
    else {
      req.session.loginErr = true
      res.redirect('/login')
    }
  })
})

router.get('/logout', (req, res) => {
  req.session.user = null
  req.session.loggedIn = false
  res.redirect('/')
})




module.exports = router;
