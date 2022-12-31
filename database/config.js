const mongoose = require('mongoose');

const dbConnection  = async() => {
    try 
    {
       await mongoose.connect(process.env.STRINGMONGO, { useNewUrlParser: true, useUnifiedTopology: true },
        (err) => {
         if(err) console.log(err) 
         else console.log("mongdb is connected");
        }
      );
    } 
    catch (error) {
        console.log(error);
        throw new Error('Error starting database');
    }

}

module.exports = {
    dbConnection
}