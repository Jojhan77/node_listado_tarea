const { ModuleResolutionKind } = require('typescript');

require('colors');


const mostrarMenu = () => {
    return new Promise( resolve => {
        console.clear();
        console.log('+===========================+'.rainbow);
        console.log('    Seleccione una opcion   ');
        console.log('+===========================+\n'.rainbow);
    
        console.log(`1. Crear tarea`.magenta);
        console.log(`2. Listar tareas`.blue); 
        console.log(`3. Listar tareas completadas`.cyan);
        console.log(`4. Listar tareas pendientes`.yellow);
        console.log(`5. Completar tareas`.green);
        console.log(`6. Borrar tarea`.red);
        console.log(`0. Salir`);
        
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
       });
    
       readLine.question('Selecciona una opcion: ', (opt) => {
            readLine.close();
            resolve(opt);
       })

    });
   



}


const pausa =() => {
    
    return new Promise( resolve => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
     
        readLine.question(`\nPresione ${ 'ENTER'.rainbow} para continuar\n`, (opt) => {
             readLine.close();
             resolve();
        })
    });
   
   }

module.exports = {
    mostrarMenu,
    pausa
}