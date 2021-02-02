const signin = (req,res,db,bcrypt) =>{
    db.select('email','hash').from('login')
    .where('email','=',req.body.email)
    .then( user=> {
        const isValid = bcrypt.compareSync(req.body.password,user[0].hash)
        if(isValid){
            return db.select('*').from('users').where('email','=',req.body.email)
                .then(data =>{
                    res.json(data[0])
                })
                .catch(err =>res.status(400).json('unable is get user'))
        }
        else
        {
            res.status(400).json('wrong credentials')
        }
    }).catch(err => res.status(400).json('wrong credentials'))
}
module.exports={
    signin:signin
}