import { error } from "node:console";

export interface Tarefa{
id:number,
title:string,
description:string,
done:boolean};
interface CriarTarefa{
    name:string,
    desc:string};
let bancoDeDados: Tarefa[] = [];
export class TarefaService {
    create({name,desc}:CriarTarefa){
        if (!name){
            throw new Error("Nome da tarefa é obrigatório");
        }
        const novaTarefa = {id:Math.floor(Math.random()*1000), title: name, description: desc, done: false};
        bancoDeDados.push(novaTarefa);
        return novaTarefa;
    }
    list(){
        return bancoDeDados;
    }
    delete(idDelete:number){
        const deletedTask = bancoDeDados.find((tarefa)=>tarefa.id === Number(idDelete));
        if (!deletedTask){
            throw new Error("Tarefa não encontrada");
        }
        bancoDeDados=bancoDeDados.filter((tarefa)=> tarefa !== deletedTask);

    }
     search(idSearch:number){
        const searchedTask = bancoDeDados.find((tarefa)=>tarefa.id === Number(idSearch));
        if (!searchedTask){
            throw new Error("Tarefa não encontrada");
        }
        return searchedTask;
    }
    edit({name,desc}:CriarTarefa, taskId:number){
         const editTask = bancoDeDados.find((tarefa)=>tarefa.id === Number(taskId));
           
        if (!editTask){
            throw new Error("Tarefa não encontrada");
        }
        if (desc) {editTask.description=desc;}
        if (name){editTask.title=name;}
        return editTask;
    }
}