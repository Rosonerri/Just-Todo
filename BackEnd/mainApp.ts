import { Application, Request, Response } from "express";
import Todo from "./router/todoRouter"



export const mainApp = (app: Application) => {
try {
    app.use("", Todo)
    app.get("/", (req: Request, res: Response) => {
        try {
            return res.status(200).json({
                message: "welcome to my Api"
            })
        } catch (error) {
           return res.status(404).json({
            message: "Error"
           }) 
        }
    })
} catch (error) {
    console.log(error)
}
} 