require('dotenv').config();

const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;
const sleep = require('util').promisify(setTimeout);
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
* /api/detectText:
*   post:
*     description: Api to read engilsh text in a given image URL of a printed or handwritten and you will receive an output of the converted text. Example image url https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/printed_text.jpg . 
*     parameters:
*       - name: imageUrl
*         in: formData
*         type: string
*         required: true     
*     responses:
*       '200':
*         description: Success
*       '400':
*         description: Invalid Request, Argument, Failed To Download Image, Unsupported Image Format, Invalid Image Size, Invalid Image Dimension, Invalid Reading Order, Invalid Page Range
*       '404':
*         description: Not Found
*       '415':
*         description: Unsupported Media Type
*       '500':
*         description: Internal Server Error
*       '503':
*         description: Service is temporarily unavailable
*/

async function readFromURL(client, url) {
    let result = await client.read(url);
    let operationId = result.operationLocation.split('/').slice(-1)[0];
    while (result.status !== 'succeeded') { 
        await sleep(1000); 
        result = await client.getReadResult(operationId); 
    }
    return result.analyzeResult.readResults; 
}

function extractText(extractedText){
    let result = [];
    if(extractedText.length != 0)
        for (let i = 0 ; i<extractedText.length ; i++){
            result[i] = extractedText[i].text;
        }
    return result;
}
  
router.post('/',[check('imageUrl').isURL().withMessage('Enter a valid URL')],urlencodedParser, async function(req, res){
    const errors = validationResult(req)
    if (req.body) {
        if (req.body.imageUrl) {
            if (!errors.isEmpty())
                res.send(errors.errors[0].msg)
            const imageUrl = req.body.imageUrl;
            try{
                let extractedText = (await readFromURL(computerVisionClient, imageUrl));
                const result = extractText(extractedText[0].lines)
                if(result.length == 0 )
                    res.send("There is no text to read.")
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

module.exports = router;