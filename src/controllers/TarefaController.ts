import { TarefaService } from "../services/TarefaService.js";
import type { Request, Response } from "express";
const tarefaService = new TarefaService();
export class TarefaController{
 listTasks(req: Request, res:Response){
    const {done}=req.query;
    const tarefas = tarefaService.list(done as string|undefined);
    return res.status(200).json(tarefas);
 }
 searchTask(req: Request, res:Response){
  try{  const {id} = req.params;
    const task = tarefaService.search(Number(id));
    return res.status(200).json(task);
 }
 catch (error:any){
    return res.status(400).json({erro: error.message});
 }
 }
 createTask(req:Request, res:Response){
    try {
        const {name,desc} = req.body;
        const newTask = tarefaService.create({name,desc});
        return res.status(201).json(newTask);
    } catch (error:any){
        return res.status(400).json({erro: error.message});
    }
 }
 deleteTask(req:Request, res:Response){
    try {
        const {id} = req.params;
        tarefaService.delete(Number(id));
        return res.status(204).send();
    } catch (error:any){
        return res.status(400).json({erro: error.message});
    }
 }
 editTask(req:Request, res:Response){
    try{
        const {id} = req.params;
        const taskId = Number(id);
        const {name,desc,done} = req.body;
        const editedTask = tarefaService.edit({name,desc,taskId,done});
        return res.status(200).json(editedTask);
    }
    catch (error:any){
        return res.status(400).json({erro: error.message});
    }
 }
}