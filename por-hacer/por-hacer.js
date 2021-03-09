const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = ()=>{
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('./db/data.json', data, (err)=>{
        if(err){
            console.log(err);
        }
        console.log(`Información guardada con éxito`);
    });
};

const cargarDB = ()=>{
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
};

const getListado = ()=>{
    cargarDB();
    return listadoPorHacer;
};

const crear = (descripcion)=>{
    cargarDB();

    let porHacer = {
        descripcion: descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
};

const actualizar = (descripcion, completado = true)=>{
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea=>{
        return tarea.descripcion === descripcion;
    });

    if(index >= 0){
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }else{
        return false;
    }
};

const borrar = (descripcion)=>{
    cargarDB();
    // let indice = listadoPorHacer.findIndex(tarea =>{
    //     return tarea.descripcion === descripcion;
    // });
    let nuevoListado = listadoPorHacer.filter((tarea)=>{
        return tarea.descripcion !== descripcion;
    });
    // if(indice >= 0){
    //     listadoPorHacer.splice(indice, 1);
    //     guardarDB();
    //     return true;
    // }else{
    //     return false;
    // }
    if(listadoPorHacer.length === nuevoListado.length){
        return false;
    }else{
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
};

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
};