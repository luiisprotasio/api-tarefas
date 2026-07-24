import { error } from "node:console";

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
    create({name,desc}:CriarTarefa){
        if (!name){
            throw new Error("Nome da tarefa é obrigatório");
        }
        const novaTarefa = {id:Math.floor(Math.random()*1000), title: name, description: desc, done: false};
        bancoDeDados.push(novaTarefa);
        return novaTarefa;
    }
    list(done?:string){
        if (done === "true"){
            return bancoDeDados.filter((tarefa) => tarefa.done === true);
        }
        if (done === "false") {
            return bancoDeDados.filter((tarefa) => tarefa.done === false);
        }
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