
## Creacion de usuarios
Cuando se crea un usuario se le crea el proyecto inbox y se le asocia. 



Se incluye el campo parentTask en el modelo Task para relacionar la tarea con su tarea padre. Patron: adjacency list

Se modifica los types de Task para incluir los nuevos campos del modelo Task

## task.services.ts

En el alta de tarea se comprueba si llega o no informado un proyecto. Si no llega se informa el proyecto por defecto. 

## formater.ts

Se crea un formateador para convertir los errores devueltos por el validador de Joi en formato ValidationResult


## Validaciones

- Se crea un validador especifico por cada modelo de datos. 
- Se crea un fichero barrel index.ts dentro de src/validator para centralizar las exportaciones. 

