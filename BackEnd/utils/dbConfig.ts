import {connect} from "mongoose"
const url: string = "mongodb://localhost:27017/mainTodoDB"

export const dbConfig = async() => {
    try {
        return await connect(url).then(() =>{
            console.log("Database Connected Succesfully⚡⚡⚡");
        }).catch(() =>{
            console.error()
        })
    } catch (error) {
        return error
    }
}