const express = require("express");
const bodyParser = require("body-parser");
const { render } = require("ejs");
const server = express();

server.set('view engine', 'ejs');
server.use(bodyParser.urlencoded({ extended: true }));

let data = [];

server.get("/", (req, res) => {
    res.render("index", {data});
});


server.get("/view", (req, res) => {
    res.render("view");
});


server.post('/addDoc', (req, res) => {
    console.log(req.body);
    console.log("Hello");

    var newData = {...req.body , id : Math.floor(Math.random() * 1000)} 

    data = [...data, newData]; 
    console.log(data);
    res.redirect('/');
});

server.get("/deleted/:id", (req, res) => {
    //    console.log("Hellooooooo",req.params.id);
    
        let deleteData = data.filter((d) => {
            return d.id != req.params.id;
        });

        data = deleteData;
        

        res.redirect("/")
    });

server.get("/editData/:id", (req, res) => {
    //    console.log("Hellooooooo",req.params.id);
    
        let editData = data.find((d) => {
            return d.id == req.params.id;
        });
        

        res.render('edit',{editData})
    });

    server.post("/updateDoc", (req,res) => {

        let updateData = data.map((u) =>{

            if(u.id == req.body.id){
                return u = req.body
            }else{``
                return u = u
            }

        });
        
        data = updateData ;

        res.redirect('/')
        
    })

server.listen(3005, () => {
    console.log('Server is running on port 3005');
});
