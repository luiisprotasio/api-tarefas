import { TarefaService } from "../services/TarefaService.js";
import type { Request, Response } from "express";
const tarefaService = new TarefaService();
export class TarefaController{
 async listTasks(req: Request, res:Response){
    const {done}=req.query;
    const tarefas = await tarefaService.getAll(done as string|undefined);
    return res.status(200).json(tarefas);
 }
 async searchTask(req: Request, res:Response){
  try{  const {id} = req.params;
    const task = await tarefaService.getById(Number(id));
    return res.status(200).json(task);
 }
 catch (error:any){
    return res.status(404).json({erro: error.message});
 }
 }
 async createTask(req:Request, res:Response){
    try {
        const {name,desc} = req.body;
        const newTask = await tarefaService.create({name,desc});
        return res.status(201).json(newTask);
    } catch (error:any){
        return res.status(400).json({erro: error.message});
    }
 }
 async deleteTask(req:Request, res:Response){
    try {
        const {id} = req.params;
        await tarefaService.delete(Number(id));
        return res.status(204).send();
    } catch (error:any){
        return res.status(404).json({erro: error.message});
    }
 }
 async editTask(req:Request, res:Response){
    try{
        const {id} = req.params;
        const taskId = Number(id);
        const {name,desc,done} = req.body;
        const editedTask = await tarefaService.edit({name,desc,taskId,done});
        return res.status(200).json(editedTask);
    }
    catch (error:any){
        return res.status(404).json({erro: error.message});
    }
 }
}