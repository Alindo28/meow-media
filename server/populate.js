import modelAccount from "./models/model.account.js";
import connectDB from "./connections/connection.mongodb.js";
import { config } from "dotenv";

config()

async function populate(data) {
    try {
        await connectDB(process.env.MONGO_URI)
        if(!data){
            await modelAccount.deleteMany()
            console.log("successfully cleared database")
        }
        
    } catch (error) {
        console.log(error)
    } finally{
        process.exit()
    }

}

populate()