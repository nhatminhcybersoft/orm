const express = require('express');
const { AppError, handleError } = require('./helper/error');
const { sequelize } = require('./models');


const app = express();
app.use(express.json());
app.use(express.static("."));

sequelize.sync({alter: true});

const v1 = require("./routers/v1");
app.use("/api/v1", v1);



app.use(handleError);

app.listen(4000);