const express = require('express');
const bodyParse = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex')
const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
 }); 
db.select('*').from('users');

const register = require('./components/register')
const signins=require('./components/signin')
const profile=require('./components/profile')
const img=require('./components/image')
const app =express(); 
const cors = require('cors');
const { json } = require('body-parser');

app.use(bodyParse.json());
app.use(cors())


app.get('/',(req,res) =>{res.json(`it is working`)})

app.post('/signin',(req,res) =>{signins.signin(req,res,db,bcrypt)});

app.post('/register',(req,res)=>{register.register(req,res,db,bcrypt)});

app.post('/profile/:id',(req,res) =>{profile.profile(req,res,db)})

app.post('/imageUrl',(req,res) =>{img.handleApiCall(req,res)})
app.put('/image',(req,res) =>{img.img(req,res,db)})

app.listen(process.env.PORT || 3000, () =>{
    console.log(`This is build on port ${process.env.PORT}`)
})

