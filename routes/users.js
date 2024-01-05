const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(users)
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  const email = req.params.email
  let user = users.filter(item => item.email === email)
  res.send(user)
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  const query = req.query
  users.push({
    firstName: query.firstName,
    lastName: query.lastName,
    email: query.email,
    DOB: query.DOB
  })
  res.send('The user ' + query.firstName + ' ' + query.lastName + ' has been added!')//This line is to be replaced with actual return value
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email
  let filtered_users = users.filter(item => item.email.toLowerCase() === email.toLowerCase())

  if (filtered_users.length > 0) {
    const user = filtered_users[0]
    const query = req.query
    const DOB = query.DOB
    const firstName = query.firstName
    const lastName = query.lastName
  
    if (DOB) {
      user.DOB = DOB
    }

    if (firstName) {
      user.firstName = firstName
    }

    if (lastName) {
      user.lastName = lastName
    }

    users = users.filter((user) => user.email.toLowerCase() != email.toLowerCase())
    users.push(user)
    res.send(`User with the email ${email} updated.`)

  } else {
    res.send(`Could not find user with email matching ${email}.`)
  }

});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email.toLowerCase()
  let filtered_users = users.filter(item => item.email.toLowerCase() === email)

  if (filtered_users.length > 0) {
    users = users.filter(item => item.email.toLowerCase() !== email)
    res.send(`User with the email ${email} deleted.`)
  } else {
    res.send(`Could not find user with email matching ${email}.`)
  }
});

module.exports=router;
