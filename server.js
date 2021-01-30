const express = require('express');
const bodyParse = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const app =express(); 
const cors = require('cors')
app.use(bodyParse.json());
app.use(cors())
const database ={
    user:[
            {
                id:'123',
                name:'john',
                email:'john@gmail.com',
                password:'john123',
                entreis:0,
                joined:new Date()
            },
            {
                id:'124',
                name:'sally',
                email:'sally@gmail.com',
                password:'sally123',
                entreis:0,
                joined:new Date()
            }
        ]
}

app.get('/',(req,res) =>{
    res.json(database.user);
})

app.post('/signin',(req,res) =>{
// bcrypt.compare("gvorax1234", '$2a$10$ZMt4TqotnNnx5PnA9Cly9uLuSESK93EXxpy8S8DGuu/kkw3KY7Gz2', function(err, res) {
//     console.log('first guess',res)
// });
// bcrypt.compare("veggies", '$2a$10$ZMt4TqotnNnx5PnA9Cly9uLuSESK93EXxpy8S8DGuu/kkw3KY7Gz2', function(err, res) {
//     console.log('second guess',res)
// });
    if(req.body.password === database.user[0].password && 
        req.body.email === database.user[0].email)
        {
            res.json(database.user[0])
        }
        else{
            res.status(400).json('error, not found')
        }

})

app.post('/register',(req,res) =>{
    const {name,email,password} = req.body
    database.user.push({
        id:'125',
        name:name,
        email:email,
        password:password,
        entreis:0,
        joined:new Date()
    });
    res.json(database.user[database.user.length-1]);
})

app.post('/profile/:id',(req,res) =>{
    const {id} = req.params; 
    let found = false
    database.user.forEach(user => {
        if(user.id === id)
        {
            found = true
            return res.json(user)
        }
    })
    if(!found)
        res.status(404).json('Not found');
})

app.put('/image',(req,res) =>{
    const {id} = req.body; 
    let found = false
    database.user.forEach(user => {
        if(user.id === id)
        {
            user.entreis++
            found = true
            return res.json(user.entreis)
        }
    })
    if(!found)
        res.status(404).json('Not found');
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


app.listen(3000, () =>{
    console.log("This is build on port 3000")
})


/*
--> res = user
--> signin => post = success/fail
--> register => post = user
-->profile/:userID --> get -user
--> image -->put --> user


*/
