require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require ('swagger-ui-express');
const cors = require("cors");

const app = express();

const imageAnalyzeApi = require("./controller/imageAnalyze");
const textAnalyzeApi = require("./controller/textAnalyze");

const PORT = process.env.PORT;

const swaggerOptions ={
    swaggerDefinition: {
        info: {
            title: 'Computer vision: Brand, object, caption, text detection and extraction API',
            description: 'The Computer Vision service provides us a way to access AI algorithms for processing images and returns brands, objects, captions and text using Azure Computer Vision API',
            contact: {
                name:'Sravani Kalangi'
            },
            basePath:"/api/",
            servers:["http://161.35.113.254:3000"]
        }
    },
    apis: ['./controller/imageAnalyze.js','./controller/textAnalyze.js']
}

const swaggerDocs= swaggerJsDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World! Visit http://161.35.113.254:3000/api/docs for more details!')
  });

app.use('/api/image/',imageAnalyzeApi);

app.use('/api/detectText',textAnalyzeApi);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});
  
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(PORT, ()=>{
    console.log(`Serving on port ${PORT}`);
});