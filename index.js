const express = require('express');
const app = express();
const userModel = require('./userModel');
const cookieParsor = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const pdfParse = require("pdf-parse/lib/pdf-parse");
require("dotenv").config();


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParsor());

app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    res.render("home");
})

//handling logins
app.get("/login",(req,res)=>{
    res.render("login",{ error: null});
})

app.post("/login",async (req,res)=>{
    let {email,password} = req.body;
    let data = await userModel.findOne({email: email});
    console.log(data);
    if(!data)
    {
        return res.send("wither email or password is wrong go back and try again")
    }
    else{
        bcrypt.compare(password, data.password, function(err,result){
            console.log(result);
            if(!result)
            {
                return res.send("Either email or password is wrong go back and try again");
            }
            else{
                const token = jwt.sign({email:data.email},'secret')
                res.cookie("token" , token);
                res.render("index");
            }
        })
    }
})

//Handling signup
app.get("/signup",(req,res)=>{
    res.render("signup");
})

app.post("/signup",(req,res)=>{
    console.log(req.body);
    let {username,email,type,password} = req.body;
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(req.body.password,salt,async function(err,hash){
            //var password = hash;
            let newUser = await userModel.create({
                username,
                email,
                type,
                password : hash,
            })
        })
        res.redirect("/login")
        console.log("new user created");
    })
    
})

function isLoggedIn(req,res,next){
    if(!req.cookies.token)
    {
        return res.send("Log In First to access this page")
    }
    else{
        let data = jwt.verify(req.cookies.token,'secret');
        req.user = data;
        next();
    }
}

//main content page
app.get("/index", isLoggedIn,(req,res)=>{
    res.render("index");
})

const storage = multer.diskStorage({
        destination:(req,file,cb)=>{
           cb(null,'./public')
                
        },
        filename:(req,file,cb)=>{
            crypto.randomBytes(12,function(err,bytes){
                const fn = bytes.toString("hex") + path.extname(file.originalname);
                console.log(fn)
                cb(null,fn);
            })
        }
    })

const upload = multer({storage:storage,
     fileFilter:(req,file,cb)=>{
         if(path.extname(file.originalname).toLowerCase() === '.pdf')
                cb(null,true)
            else{
                cb (new Error("Only pdfs allowed"));
            }
     }
});

// app.use((err, req, res, next) => {
//     if (err.message === "Only pdfs allowed") {
//         return res.send("Only PDF files are allowed");
//     }
//     next(err);
// });

const analyzeResume = require("./gemini");


app.post("/check", upload.single("check"), isLoggedIn, async (req, res) => {
    try {
        const filePath = req.file.path;
        const dataBuffer = fs.readFileSync(filePath);

        const pdfData = await pdfParse(dataBuffer);
        const resumeText = pdfData.text;

        // Example job profile (later frontend se aayega)
        let user = await userModel.findOne({email : req.user.email});
        console.log(user);
        const type = user.type;
        const jobProfile = req.body.job;

        const analysis = await analyzeResume(resumeText, jobProfile,type);
        // console.log(analysis);
       res.render("result", {
            analysis
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Resume analysis failed" });
    }
});

app.listen(3000,(req,res)=>{
    console.log("Server is on in http://localhost:3000");
})