import mongoose from "mongoose";
 const connection = async ()=>{
    const URL='mongodb+srv://ritikasinghal2101:vu0OHclM76j0traN@whatsapp.9zpftw8.mongodb.net/'
    try{
        await mongoose.connect(URL);
        console.log('Database Connected Succesfully');
    }
catch(err){
    console.log(err.message)
}
}

export default connection;