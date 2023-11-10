const express = require("express");
const carRouter = require("./src/routes/carRouter");
const app = express();
const PORT: number = 3000;
const bodyParser = require('body-parser')
const methodOverride = require('method-override');


app.use(methodOverride('_method'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));     
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views","./src/views");
app.use("", carRouter);


app.listen(PORT, () => {
    console.log(`Is Listenting to port ${PORT}`);    
})