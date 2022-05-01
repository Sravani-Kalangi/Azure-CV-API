require('dotenv').config();

const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const key = process.env.API_KEY;
const endpoint = process.env.API_ENDPOINT;

const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);

/**
* @swagger
* /api/image/detectBrand:
*   post:
*     description: This api can be used to detect brand logos in a given image. Pass the image URL of an online image of a product or anything with the brand logo on it and you will receive an output with the corresponding details. For example try passing this image url https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/images/red-shirt-logo.jpg . 
*     parameters:
*       - name: imageUrl
*         in: formData
*         type: string
*         required: true     
*     responses:
*       '200':
*         description: Success
*       '400':
*         description: Invalid Request or Argument
*       '404':
*         description: Not Found
*       '415':
*         description: Invalid Media Type
*       '500':
*         description: Internal Server Error
*       '503':
*         description: Service is temporarily unavailable
*/

function extractBrands(brands){
    let result = [];
    if(brands.length != 0)
        for (let i = 0 ; i<brands.length ; i++){
        result[i] = brands[i].name;
        }
    return result;
}
  
router.post('/detectBrand',[check('imageUrl').isURL().withMessage('Enter a valid URL')],urlencodedParser, async function(req, res){
    const errors = validationResult(req)
    if (req.body) {
        if (req.body.imageUrl) {
            if (!errors.isEmpty())
                res.send(errors.errors[0].msg)
            const imageUrl = req.body.imageUrl;
            try{
                let brands = (await computerVisionClient.analyzeImage(imageUrl, { visualFeatures: ['Brands'] })).brands;
                const result = extractBrands(brands);
                if(result.length == 0)
                    res.send('No brands detected.')
                else
                    res.status(200).json(result);
            }catch (err){
                res.status(err.statusCode).send(err.message);
            } 
        }else
            res.status(400).send('Bad request - URL required');
    }else
        res.status(400).send('Bad request - Body required');
});

/**
* @swagger
* /api/image/detectObject:
*   post:
*     description: This api can be used to detect objects in a given image. Pass the image URL containing object(s) and you will receive an output with its name(s). For example try passing this image url https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/images/windows-kitchen.jpg . 
*     parameters:
*       - name: imageUrl
*         in: formData
*         type: string
*         required: true     
*     responses:
*       '200':
*         description: Success
*       '400':
*         description: Invalid Request or Argument
*       '404':
*         description: Not Found
*       '415':
*         description: Invalid Media Type
*       '500':
*         description: Internal Server Error
*       '503':
*         description: Service is temporarily unavailable
*/

function extractObjects(objects){
    let result = [];
    if(objects.length != 0)
        for (let i = 0 ; i<objects.length ; i++){
        result[i] = objects[i].object;
        }
    return result;
}
  
router.post('/detectObject',[check('imageUrl').isURL().withMessage('Enter a valid URL')],urlencodedParser, async function(req, res){
    const errors = validationResult(req)
    if (req.body) {
        if (req.body.imageUrl) {
            if (!errors.isEmpty())
                res.send(errors.errors[0].msg)
            const imageUrl = req.body.imageUrl;
            try{
                let objects = (await computerVisionClient.analyzeImage(imageUrl, { visualFeatures: ['Objects'] })).objects;
                const result = extractObjects(objects);
                if(result.length == 0)
                    res.send('No Objects detected.')
                else
                    res.status(200).json(result);
            }catch (err){
                console.log(err);
                res.status(err.statusCode).send(err.message);
            } 
        }else
            res.status(400).send('Bad request - URL required');
    }else
        res.status(400).send('Bad request - Body required');
});


/**
* @swagger
* /api/image/imageCaption:
*   post:
*     description: This api can be used to get suggestions for possible captions for a given image. Pass the image URL of an online image and you will receive suggestions for captions. For example try passing this image url https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/images/bw_buildings.png . 
*     parameters:
*       - name: imageUrl
*         in: formData
*         type: string
*         required: true     
*     responses:
*       '200':
*         description: Success
*       '400':
*         description: Invalid Request or Argument
*       '404':
*         description: Not Found
*       '415':
*         description: Invalid Media Type
*       '500':
*         description: Internal Server Error
*       '503':
*         description: Service is temporarily unavailable
*/

function extractCaptions(captions){
    let result = [];
    if(captions.length != 0)
        for (let i = 0 ; i<captions.length ; i++){
        result[i] = captions[i].text;
        }
    return result;
}
  
router.post('/imageCaption',[check('imageUrl').isURL().withMessage('Enter a valid URL')],urlencodedParser, async function(req, res){
    const errors = validationResult(req)
    if (req.body) {
        if (req.body.imageUrl) {
            if (!errors.isEmpty())
                res.send(errors.errors[0].msg)
            const imageUrl = req.body.imageUrl;
            try{
                let description = (await computerVisionClient.analyzeImage(imageUrl, { visualFeatures: ['Description'] })).description;
                const result = extractCaptions(description.captions);
                console.log(description)
                if(result.length == 0)
                    res.send('No Captions possible.')
                else
                    res.status(200).json(result);
            }catch (err){
                console.log(err);
                res.status(err.statusCode).send(err.message);
            } 
        }else
            res.status(400).send('Bad request - URL required');
    }else
        res.status(400).send('Bad request - Body required');
});

module.exports = router;