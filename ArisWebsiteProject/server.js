// importing pakeges
const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');

// firebase admin setup
let serviceAccount = require("./aris-design-2172d-firebase-adminsdk-8swf1-b0fa149d32.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

//aws config
const aws = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();

//aws parameters
const region = "eu-central-1";
const bucketName = "aris-design";
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

aws.config.update({
    region,
    accessKeyId,
    secretAccessKey
})

// init s3
const s3 = new aws.S3();

//generate image upload link
async function generateUrl(){
    let date = new Date();
    let id = parseInt(Math.random() * 10000000000);

    const imageName = `${id}${date.getTime()}.jpg`;

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 300, //300 ms
        ConentType: 'image/jpeg'
    })
    const uploadUrel = await s3.getSignedUrlPromise('putObject', params);
    retur
}

//declare static path
let staticPath = path.join(__dirname, "public");

// initalizing express.js
const app = express();

//middlewares
app.use(express.static(staticPath));
app.use(express.json());

//routes
//home route
app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})

//signup route
app.get('/signup', (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"));
})

app.post('/signup', (req, res) => {
    let { name, email, password, number, tac} = req.body;

    //form validations
    if(name.length < 3){
        return res.json({'alert': 'name must be 3 letters long'})
    } else if(!email.length){
        return res.json({'alert': 'enter your email'});
    } else if(password.length < 8){
        return res.json({'alert': 'password should be 8 letter long'});
    } else if(!number.length){
        return res.json({'alert': 'enter your phone number'});
    } else if(!Number(number) || number.length < 10){
        return res.json({'alert': 'invalid number, please enter valid one'});
    } else if(!tac){
        return res.json({'alert': 'you must agree to our terms'});
    }

    // store user in database
    db.collection('users').doc(email).get()
    .then(user => {
        if(user.exists){
            return res.json({'alert': 'email alredy exists'});
        } else{
            //encrypt password before soring it.
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    req.body.password = hash;
                    db.collection('users').doc(email).set(req.body)
                    .then(data => {
                        res.json({
                            name: req.body.name,
                            email: req.body.email,
                            user: req.body.user,
                        })
                    })
                })
            })
        }
    })
})

//login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"));
})

app.post('/login', (req, res) => {
    let { email, password } = req.body;

    if(!email.length || !password.length){
        return res.json({'alert': 'fill all the inputs'})
    }

    db.collection('users').doc(email).get()
    .then(user => {
        if(!user.exists){ // is email do not exists
            return res.json({'alert': 'log in email noes not exists'})
        } else{
            bcrypt.compare(password, user.data().password, (err, result) => {
                if(result){
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        user: data.user,
                    })
                } else{
                    return res.json({'alert': 'password in incorrect'})
                }
            })
        }
    })
})

// user route

app.get('/user', (req, res) => {
    res.sendFile(path.join(staticPath, "user.html"));
})

app.post('/user', (req, res) => {
    let {name, about, number, tac, email} = req.body;
    if(!name.length || !about.length || number.length < 10 || !Number(number)){
        return res.json({'alert':'some information(s) is/are invalid'});
    } else if(!tac){
        return res.json({'alert': 'you must agree to ou terms'});
    } else{
        // update users status here
        db.collection('users').doc(email).set(req.body)
        then(data => {
            db.collection('users').doc(email).update({
                user: true
            }).then(data => {
                res.json(true); 
            })
        })
    }
})

// add idea
app.get('/add-idea', (req, res) => {
    res.sendFile(path.join(staticPath, "addIdea.html"));
})

// get the upload link
app.get('/s3url', (req, res) => {
    generateUrl(). then(url => res.json(url));
})

// 404 route
app.get('/404',(req, res) => {
    res.sendFile(path.join(staticPath, "404.html"));
})

app.use((req, res) => {
    res.redirect('/404');
})

app.listen(3000, () => {
    console.log('listening on port 3000.......');
})