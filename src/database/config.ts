// const mongoose = require("mongoose");
import mongoose from "mongoose";

export const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGOBD_CNN);
        console.log("Database online!")
    } catch (error) {
        console.log(error);
        throw new Error('Hubo un problema al conectarse a la base de datos'); 
    }
}
