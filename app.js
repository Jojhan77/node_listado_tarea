require('colors');

const { guardarDB, leerDB } = require('./helper/guardarArchivo');
const { pausa, inquirerMenu, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helper/inquierer');

const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

const main = async() => {
    console.clear();
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if ( tareasDB ) {
       tareas.cargarTareasFromArray(tareasDB);
    }

    await pausa();
    do{
        opt = await inquirerMenu();
       
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:');
                
                tareas.crearTarea(desc);
            break;
        
            case '2':
                console.log(tareas.listadoCompleto());
            break;

            case '3':
                console.log(tareas.listarPendientesCompletadas());
            break;

            case '4':
                console.log(tareas.listarPendientesCompletadas(false));
            break;

            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;

            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if (id !== '0'){
                const ok = await confirmar('Estas seguro?');
                if (ok){
                    tareas.borrarTarea(id);
                    console.log('Tarea Eliminada');
                }
            }
            break;
        }

        guardarDB( tareas.listadoArr );

        await pausa();
       
    }while( opt !== '0');
}

main();