import { error } from "node:console";

export interface Tarefa{
id:number,
title:string,
description:string,
done:boolean};
interface CriarTarefa{
    name:string,
    desc:string};
const bancoDeDados: Tarefa[] = [];
export class TarefaService {
    create({name,desc}:CriarTarefa){
        if (!name){
            throw new Error("Nome da tarefa é obrigatório");
        }
        const novaTarefa = {id:Math.floor(Math.random()*1000), title: name, description: desc, done: false};
        return novaTarefa;
    }
    list(){
        return bancoDeDados;
    }
}