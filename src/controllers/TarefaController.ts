import { TarefaService } from "../services/TarefaService.js";
import type { Request, Response } from "express";
const tarefaService = new TarefaService();
export class TarefaController{
 listTasks(req: Request, res:Response){
    const tarefas = tarefaService.list();
    return res.status(200).json(tarefas);
 }
 searchTask(req: Request, res:Response){
  try{  const searchId = req.body;
    const task = tarefaService.search(searchId);
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
        const id:number = req.body;
        tarefaService.delete(id);
    } catch (error:any){
        return res.status(400).json({erro: error.message});
    }
 }
 editTask(req:Request, res:Response){
    try{
        const {name,desc,taskId} = req.body;
        const editedTask = tarefaService.edit({name,desc,taskId});
        return res.status(200).json(editedTask);
    }
    catch (error:any){
        return res.status(400).json({erro: error.message});
    }
 }
}