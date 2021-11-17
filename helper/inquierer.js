const inquirer = require('inquirer');

require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices:[
                    {
                        value: '1',
                        name: `1. Crear tarea`.magenta
                    },
                    {
                        value: '2',
                        name: `2. Listar tareas`.blue
                    },
                    {
                        value: '3',
                        name: `3. Listar tareas completadas`.cyan
                    },
                    {
                        value: '4',
                        name: `4. Listar tareas pendientes`.yellow
                    },
                    {
                        value: '5',
                        name: `5. Completar tareas`.green
                    },
                    {
                        value: '6',
                        name: `6. Borrar tarea`.red
                    },
                    {
                        value: '0',
                        name: '0. Salir'
                    },
                   
    
                ]
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log('+===========================+'.rainbow);
    console.log('    Seleccione una opcion   ');
    console.log('+===========================+\n'.rainbow);

    const   { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async () => {
 

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.rainbow} para continuar\n`
        }
    ];
    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async( message ) =>{
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Porfavor, ingresa un dato';
                }
                return true;
            }
        }];
        const {desc} = await inquirer.prompt(question);
        return desc;
}


const listadoTareasBorrar = async (tareas = []) => {
    
    const choices = tareas.map((tarea,i) =>{
        const idx = i + 1;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });
    
    choices.unshift({
        value: '0',
        name: '0'.green + '  Cancelar'
    })

    const pregunta = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(pregunta);
    return id;
}

const confirmar = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async (tareas = []) => {
    
    const choices = tareas.map((tarea,i) =>{
        const idx = i + 1;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: ( tarea.completadoEn) ? true : false
        }
    });
    
    

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}
        
module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}