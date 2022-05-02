# Azure-CV-API : Brand, object, caption, text detection and extraction API
**By Sravani Kalangi for ITIS 6177**

## Where is it present

> **API URL** <br/> http://161.35.113.254:3000/api/
<br/>

> **Swagger documentation** <br/> http://161.35.113.254:3000/api/docs/

## Endpoints

> **Text Extraction** <br/> /detectText
<br/>

> **Brand Detection** <br/> /image/detectBrand
<br/>

> **Object Detection** <br/> /image/detectObject 
<br/>

> **Image Caption** <br/> /image/imageCaption

All endpoints are POST requests with request body of JSON type:
```JavaScript
{
    "imageUrl" : "<< Image_URL >>"
}
```
<br/>

Give a valid URL in the place of `<< Image_URL >>`. The API can be tested using POSTMAN or you can try it out in the swagger docs.

`A sample [Postman collection](https://github.com/Sravani-Kalangi/Azure-CV-API/blob/main/Postman%20Collection.json) that you can use for testing.`

## Text Extraction

By default, the service extracts all text from your images including mixed languages. 

Send a `POST` request to the url - `http://161.35.113.254:3000/api/detectText`

If the image is successfully processed, 

1. If there is text present, a result is returned
2. If there is no text, a message `There is no text to read.` is returned

If the request body is empty, `Bad request - Body required` error is returned

If the request body is missing the imageUrl , `Bad request - imageUrl required` error is returned

For more details on the other errors, visit [here](https://centraluseuap.dev.cognitive.microsoft.com/docs/services/computer-vision-v3-2/operations/5d9869604be85dee480c8750)

## Brand Detection

The API returns the brands detected in the imageUrl

Send a `POST` request to the url - `http://161.35.113.254:3000/api/image/detectBrand`

If the image is successfully processed, 

1. If there is brand present, a result is returned
2. If there is no text, a message `No brands detected.` is returned

If the request body is empty, `Bad request - Body required` error is returned

If the request body is missing the imageUrl , `Bad request - imageUrl required` error is returned

For more details on the other errors, visit [here](https://centraluseuap.dev.cognitive.microsoft.com/docs/services/computer-vision-v3-2/operations/56f91f2e778daf14a499f21b)

## Object Detection

The API returns the objects detected in the imageUrl

Send a `POST` request to the url - `http://161.35.113.254:3000/api/image/detectObject`

If the image is successfully processed, 

1. If there is text present, a result is returned
2. If there is no text, a message `There is no text to read.` is returned

If the request body is empty, `Bad request - Body required` error is returned

If the request body is missing the imageUrl , `Bad request - imageUrl required` error is returned

For more details on the other errors, visit [here](https://centraluseuap.dev.cognitive.microsoft.com/docs/services/computer-vision-v3-2/operations/56f91f2e778daf14a499f21b)

## Image Caption

The API returns the possible caption(s) of the image in the imageUrl

Send a `POST` request to the url - `http://161.35.113.254:3000/api/image/imageCaption`

If the image is successfully processed, 

1. If there is text present, a result is returned
2. If there is no text, a message `There is no text to read.` is returned

If the request body is empty, `Bad request - Body required` error is returned

If the request body is missing the imageUrl , `Bad request - imageUrl required` error is returned

For more details on the other errors, visit [here](https://centraluseuap.dev.cognitive.microsoft.com/docs/services/computer-vision-v3-2/operations/56f91f2e778daf14a499f21b)

## Tools, Languages and Frameworks Used
●	Node js - For implementing the API
<br/>
●	Digital Ocean - For deploying the project
<br/>
●	Swagger - For API documentation and testing
<br/>
●	Git - For source code management
<br/>
●   Postman - For testing

## Azure documentation

Check out the complete documentation of the Azure service used [here](https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/)

### Note
The .env file has the following attributes: 
<br/>
API_KEY
<br/>
API_ENDPOINT
<br/>
PORT

