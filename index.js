const { log } = require("console");
const express = require("express");
const { v4:uuidv4 } = require("uuid");
const methodOverride = require("method-override");

const app = express();
const  path = require("path");
const port = 3000;


app.use(express.urlencoded({ extended : true}));
app.use(methodOverride("_method"));


app.set("view engine" ,"ejs");
app.set("views" ,path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts =[
    {
        id : uuidv4(),
        username : "Ashu",
        content : "I Love Coding"
    },
    {
        id : uuidv4(),
        username : "Ritu",
        content : "I Love Talking"
    },
    {
        id : uuidv4(),
        username : "Kirti",
        content : "I Love Sleeping"
    }

]

app.get("/post" , (req, res) => {
    res.render("index.ejs" , { posts });
});

app.get("/post/new" ,(req, res) => {
    res.render("new.ejs");
});


app.patch("/post/:id" , (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => p.id === id );
    post.content = newContent;
    console.log(post);
    res.redirect("/post");
});

app.delete("/post/:id" , (req , res) => {
    let { id } =req.params;
     posts =posts.filter((p) => id !== p.id );
     res.redirect("/post"); 
})

app.get("/post/:id/edit" , (req , res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs" , { post });
});
app.post("/post" , (req, res) => {
    let { username , content} =req.body;
    let id = uuidv4();
    posts.push({ id ,username, content});
    res.redirect("/post");
});

app.get("/post/:id" ,(req, res) => {
    let { id }= req.params;
    let findpost = posts.find((p) => id === p.id);
    console.log(findpost);
    res.render("show.ejs" , { findpost });
});
app.listen(port , () => {
    console.log("Listening on " ,port);
});