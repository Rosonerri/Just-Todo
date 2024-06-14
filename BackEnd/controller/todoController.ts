import { Request, Response } from "express"
import todoModel, { iProps } from "../model/todoModel"


export const createTodo = async (req: Request, res:Response) => {
    try {
        const {title, description} = req.body

        const createTask = await todoModel.create({title, description},)

        return res.status(201).json({
            message: "Todo Created Successfully",
            data: createTask
        })
    } catch (error: any) {
        console.log(error);

        return res.status(404).json({
            message: "Error Creating Task",
            data: error.message
        })
    }
}

export const moveTodoToProgress = async (req: Request, res: Response) => {
    try {
        const {Id} = req.params

        const find  = await todoModel.findByIdAndUpdate(Id, {progress: true}, {new: true})
         return res.status(201).json({
           message: "Task Found",
           data: find,
         });
    } catch (error) {
       return res.status(404).json({
        message: "Error Finding Task"
       })
    }
}

export const moveProgressToDone = async (req: Request, res: Response) => {
    try {
        const {Id} = req.params;

        const findTask = await todoModel.findById(Id)
        if(findTask?.progress){
            const createTask = await todoModel.findByIdAndUpdate(Id, {done: true}, {new: true});
            return res.status(201).json({
                message: "Moved To Done Successfully",
                data: createTask
            })
        } else{
            return res.status(404).json({
                message: "Task must have started First....!"
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: "Error Moving To Progress"
        })
    }
}

export const getAll = async (req: Request, res: Response) => {
try {
    const getTask = await todoModel.find();

    return res.status(201).json({
        message: "All Task Gotton Successfully",
        data: getTask
    })
} catch (error) {
    return res.status(404).json({
        message: "Error Creating New Todo",
    })
}
}

export const getAllCombine = async (req: Request, res: Response) => {
    try {
        const getTask = await todoModel.find()

        const getAllTask = getTask.filter((el: iProps) => {
            return el.progress === false && el.done === false;
        })

        const getAllProgress = getTask.filter((el: iProps) => {
            return el.progress === true && el.done === false
        });

        const getAllDone = getTask.filter((el: iProps) => {
            return el.progress === true && el.done === true
        })

        let data = {
            task: getAllTask,
            progress: getAllProgress,
            done: getAllDone
        }

        return res.status(200).json({
            message: "Todo Task Gotten Successfully",
            data: data,
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error Creating new Todo"
        })
    }
};

