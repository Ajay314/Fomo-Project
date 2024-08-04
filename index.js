 const express = require("express");
 const axios = require('axios');
 const app = express();
 const mongoose = require("mongoose");
 const price = require("./model");


 const PORT = 3001;
  

 mongoose.connect("mongodb://localhost:27017/Database")
 .then(()=> console.log("DataBase Connected"))
 .catch(err => console.log("Error in connecting with Database"));

 const dataSchema = new mongoose.Schema({
  symbol: String,
  timestamp: Date,
  price: Number,

});




// const fetchAndStoreData = async () => {
//   try {
//     const symbols = ['BTC', 'ETH', 'GOOG', 'AAPL', 'TSLA']; 

//     for (const symbol of symbols) {
//       const response = await axios.get(`http://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`);
//      // console.log("hellooooooooooooooo" ,response);
//       console.log("MY NAME IS NODE AND EXPRESS")
//     //  const res = await response.json();
//     //  console.log("UNA ISBT",res);
//     console.log("hi my name is pushkar 22", response.data);
//       const priceData = {
//         symbol,
//         price: response.data[symbol]                               ,
//         timestamp: new Date(),
//       };
//    // const price = response.data[symbol].usd;
    

//       const newPrice = new Price(priceData);
//       await newPrice.save();
//     }
//   } catch (error) {
//     console.error('Error fetching and storing data:', error);
//   }
// };

// LiveCoinWatch API configuration
const apiUrl = 'http://api.livecoinwatch.com/api/ticker';
const symbols = ['BTC', 'ETH', 'LTC', 'XRP', 'DOGE']; 


async function fetchDataAndStore() {
    try {
      for (const symbol of symbols) {
        console.log("dbvjhoifwehvuadbh jksdcihovuadbkjciefhwovjbdk");
        const response = await axios.get(`${apiUrl}?currency=USD&symbol=${symbol}`);
        const data = response.data.data[symbol];
        console.log("PUSHKAR",data);
  
        const newData = new DataModel({
          symbol,
          timestamp: new Date(),
          price: data.price_usd,
          
        });
  
      
        await newData.save();
      }
    } catch (error) {
      console.error('Error fetching or storing data:', error);
    }
  }

    app.get('/api/crypto-prices', async (req, res) => {
    try {
      await fetchDataAndStore();

      res.json({ message: 'Crypto price data fetched and stored' });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data' });
      console.error(error);
    }
  });


  setInterval(fetchDataAndStore, 5000);

fetchDataAndStore();


 app.listen(PORT,() => console.log(`Server started on port ${PORT}`));