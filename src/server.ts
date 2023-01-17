import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { Router, Response, Request } from 'express';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
   // endpoint to filter an image from a public url.
 
  /**************************************************************************** */

  //! END @TODO1

/***********************START OF RESTFUL ENDPOINT IMPLEMENTATION**********************/

  app.get( "/filteredimage", async ( req: Request, res: Response ) => {

// QUERY PARAMATERS
//    image_url: URL of a publicly accessible image
// RETURNS

    const  udagram_image_url =req.query.image_url;

//  1. validate the image_url query

    if(!udagram_image_url){
      
      res.status(400).send("Udagram image URL is required!");

    }
//   2. call filterImageFromURL(image_url) to filter the image

    const udg_filtered_image= await filterImageFromURL(udagram_image_url);

//   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
//    3. send the resulting file in the response

    res.status(200).sendFile(udg_filtered_image, () => {

//    4. deletes any files on the server on finish of the response

      deleteLocalFiles([udg_filtered_image]);
    });

  } );
/**********END OF ENDPOINT IMPLEMENTATION CODE SECTION***************/  


  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();