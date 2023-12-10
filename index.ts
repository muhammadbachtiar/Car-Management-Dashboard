import knex from "knex";
import { Model } from "objection";
const express = require("express");
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');
const carRouter = require("./src/routes/carRouter");
const usersRouter = require("./src/routes/userRouter");
const path = require("path");
const PORT: number = 3000;
const bodyParser = require('body-parser')
const methodOverride = require('method-override');
const knexInstance = knex({
    client: "postgresql",
    connection: {
        database: "cars_management_server",
        user: "muhammadbachtiar",
        password: "123456",
        port:5000
    }
})

Model.knex(knexInstance);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extended: true }));     
app.use(express.static("public"));
app.use('/scripts', express.static(path.join(__dirname, 'public/script')));
app.set("view engine", "ejs");
app.set("views","./src/views");
app.use("", carRouter);
app.use("/api/v1", usersRouter);


app.listen(PORT, () => {
    console.log(`Is Listenting to port ${PORT}`);    
})