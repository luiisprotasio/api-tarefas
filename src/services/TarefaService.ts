import { error } from "node:console";
import {prisma} from "../config/prismaClient"
export interface Tarefa{
id:number,
title:string,
description:string,
done:boolean};
interface CriarTarefa{  
    name:string,
    desc:string
};
interface EditarTarefa{
    name?:string,
    desc?:string,
    taskId:number,
    done?:boolean
}
let bancoDeDados: Tarefa[] = [];
export class TarefaService {
    async create({name,desc}:CriarTarefa){
        if (!name){
            throw new Error("Nome da tarefa é obrigatório");
        }
        const novaTarefa = await prisma.task.create({
            data:{
                title: name,
                description: desc,
            },
        });
        return novaTarefa;
    }
    async getAll(done?:string){
        if (done === "true"){
       const tarefas = await prisma.task.findMany({
        where: {
            completed:true,
        }
       });    
       return tarefas;
    }
       else if (done==="false"){
const tarefas = await prisma.task.findMany({
        where: {
            completed:false,
        }
       });
         return tarefas;
         }
       else {
        const tarefas = await prisma.task.findMany();
           return tarefas;
       }
    
    }
    async delete(idDelete:number){
        const deletedTask = await prisma.task.findFirst({where:{
            id: idDelete,
        }})
        if (!deletedTask){
            throw new Error("Tarefa não encontrada");
        }
        await prisma.task.delete({where:{
            id: idDelete
        }})
        return deletedTask;
    }
    async getById(idSearch:number){
        const searchedTask = await prisma.task.findFirst({where:{
            id: idSearch,
        }})
        if (!searchedTask){
            throw new Error("Tarefa não encontrada");
        }
        return searchedTask;
    }
    edit({name,desc,taskId,done}:EditarTarefa){
         const editTask = bancoDeDados.find((tarefa)=>tarefa.id === Number(taskId));
           
        if (!editTask){
            throw new Error("Tarefa não encontrada");
        }
        if (desc) {editTask.description=desc;}
        if (name){editTask.title=name;}
        if (done !== undefined) {editTask.done=done;}
        return editTask;
    }
}