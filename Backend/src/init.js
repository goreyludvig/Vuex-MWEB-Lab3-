import mongoose from "mongoose";
import config from "./config.json";
import initDrivers from "./dai/init";


//підключення до бази даних
const connectionUrl = config.db.url+config.db.name;
mongoose.connect (connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(()=>{
    //виклик ініціалізації списку водіїв
    initDrivers.run().then( ()=>{
        console.log(`Database was initialised`);  
    }); 
})
.catch(error=>{console.log(error)});