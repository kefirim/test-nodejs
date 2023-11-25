const express = require("express");

const axios = require('axios');
const app = express()

app.use(express.json());




app.listen(3000, () => {
    console.log(`Server is running on port 3000`)
});


//http://localhost:3000/cities?zipcode=66490 on va changer le zipcode pour recuperer les code postal de france
app.get('/cities', async (req,res) => {
    try{
   const zipcode = req.query.zipcode
   

   //zipcode doit etre string et required
   if (!zipcode || typeof zipcode !== 'string') {
    return res.status(400).json({
        success: false,
        error: 'Le paramètre zipcode est manquant ou incorrect.'
    });}

  // console.log(zipcode)

    const response = await axios.get(`https://geo.api.gouv.fr/communes?codePostal=${zipcode}`);
    const data = response.data
    
    // si le code postale n'est pas correct 
    if(data.length === 0){
         res.status(response.status).json({
            success: false,
            error:  'le code postale inconnue'
        });

    }
    else{
        //les nom de cities de meme code postal selon affiche demandé
        const cities = data.map(city => city.nom);
        res.status(200).json({
            success: true,
            cities: cities
        });
    }
  
    
    
   
   
   
   


    
    
   
    
} catch (error) {
    console.error(error);
    res.status(500).json({
        success: false,
        error: 'Erreur interne.'
    });}

    

    
   
     


})
     
       
   
