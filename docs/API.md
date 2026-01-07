# API Documentation

Base URL (desarrollo): `http://localhost:3000`

Autenticación: Bearer Token en cabecera `Authorization: Bearer <token>`

---

## Resumen de códigos HTTP comunes
- 200 OK — petición correcta
- 201 Created — recurso creado
- 400 Bad Request — datos inválidos
- 401 Unauthorized — token faltante/inválido
- 403 Forbidden — acceso denegado
- 404 Not Found — recurso no encontrado
- 500 Internal Server Error — error servidor


## Registro de usuario

Método: POST  
Ruta: `/auth/register`  



Request (ejemplo)
```json
{
  "email": "antonio1.test@example.com",
  "password": "123456b"
}
```

Response 201 (ejemplo)

```json
{
  "userRegister": {
    "user": {
      "_id": "695e9f565544eca38fd56ae7",
      "email": "antonio1.test@example.com"
    },
    "token": "eyJhbGciOi..."
  }
}
```

Errores comunes:
- 400 — validación del body / email no encontrado
- 401 — contraseña no válida (AppError.unauthorized)
- 500 — error inesperado / DB / librerías

## Login de usuario

Método: POST  
Ruta: `/auth/login`  



Request (ejemplo)
```json
{
  "email": "antonio1.test@example.com",
  "password": "123456b"
}
```

Response 200 (ejemplo)

```json
{
    "userLogged": {
        "user": {
            "_id": "695e9f565544eca38fd56ae7",
            "email": "antonio2.test@example.com"
        },
        "token": "eyJhbGciOiJIU..."
    }
}
```

Errores comunes:
- 400 — validación del body / email no encontrado
- 401 — contraseña no válida (AppError.unauthorized)
- 500 — error inesperado / DB / librerías

## Login con Google | googleOath

Método: POST  
Ruta: `/auth/auth/google-OAuth`  



Request (ejemplo)
```json
{
  "googleToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ij...",
}
```

Response 200 (ejemplo)

```json
{
}
```

Errores comunes:
- 400 — validación del body / email no encontrado
- 500 — error inesperado / DB / librerías



## Obtener todas las tareas | getUserTasks

Método: GET  
Ruta: `/tasks`  
Requiere autenticación con Token. 



Request (ejemplo)
```json

```

Response 200 (ejemplo)

```json
{
    "tasks": {
        "tasks": [
            {
                "_id": "695ea0c65544eca38fd56aef",
                "name": "Tarea 1",
                "description": "Descripción 1",
                "dueTime": "2026-01-08T09:30:00.000Z"
            }
        ],
        "taskCounter": 1
    }
}
```

Errores comunes:
- 400 — validación del body / email no encontrado
- 500 — error inesperado / DB / librerías



## Nueva tarea | newTask

Método: POST  
Ruta: `/tasks`  
Requiere autenticación con Token. 



Request (ejemplo)
```json
  {
    "name": "Tarea 3",
    "description": "Descripción Tarea 3",
    "dueTime": "2026-01-08T09:30:00.000Z"
  }
```

Response 200 (ejemplo)

```json
{
    "newtask": {
        "name": "Tarea 3",
        "description": "Descripción Tarea 3",
        "priority": "priority 4",
        "dueTime": "2026-01-08T09:30:00.000Z",
        "repeat": {
            "repeatType": "none"
        },
        "user": "695e9f565544eca38fd56ae7",
        "label": [],
        "project": "695e9f565544eca38fd56aea",
        "_id": "695eaa065544eca38fd56af8",
        "created": "2026-01-07T18:46:30.842Z",
        "createdAt": "2026-01-07T18:46:30.843Z",
        "updatedAt": "2026-01-07T18:46:30.843Z",
        "__v": 0
    }
}
```

Errores comunes:
- 400 — id de usuario no informado
- 500 — error inesperado / DB / librerías


## Buscar tarea | searchTask


Método: GET  
Ruta: `/tasks/search?search=XXX`  
Requiere autenticación con Token. 



Request (ejemplo)
```json
```

Response 200 (ejemplo)

```json
{
    "tasks": [
        {
            "id": "695ea0c65544eca38fd56aef",
            "name": "Pasar a limpio las citas del Papa",
            "description": "Las tienes en una foto en el móvil",
            "project": "695e9f565544eca38fd56aea"
        },
        {
            "id": "695ea0e85544eca38fd56af2",
            "name": "Pasar a limpio las citas del Papa",
            "description": "Las tienes en una foto en el móvil",
            "project": "695e9f565544eca38fd56aea"
        }
    ]
}
```

Errores comunes:
- 400 — cadena de búsqueda vacía o no válida
- 500 — error inesperado / DB / librerías



## Obtener tarea del dia | getDayTask

Método: GET  
Ruta: `/tasks/today`  
Requiere autenticación con Token. 



Request (ejemplo)
```json
```

Response 200 (ejemplo)

```json
{
    "tasks": {
        "overdue": [],
        "todayTasks": [],
        "taskCounter": 0
    }
}
```

Errores comunes:
- 400 — user id no informado
- 500 — error inesperado / DB / librerías


## Proximas tareas | getUpcomingTask

Método: GET  
Ruta: `/tasks/upcoming`  
Requiere autenticación con Token. 



Request (ejemplo)
```json
```

Response 200 (ejemplo)

```json
{
    "tasks": {
        "overdue": [],
        "todayTasks": [],
        "upcomingTask": [
            {
                "repeat": {
                    "repeatType": "none"
                },
                "_id": "695ea0c65544eca38fd56aef",
                "name": "Pasar a limpio las citas del Papa",
                "description": "Las tienes en una foto en el móvil",
                "priority": "priority 4",
                "dueTime": "2026-01-08T09:30:00.000Z",
                "user": "695e9f565544eca38fd56ae7",
                "label": [],
                "project": "695e9f565544eca38fd56aea",
                "created": "2026-01-07T18:07:02.226Z",
                "createdAt": "2026-01-07T18:07:02.227Z",
                "updatedAt": "2026-01-07T18:07:02.227Z",
                "__v": 0
            },
            {
                "repeat": {
                    "repeatType": "none"
                },
                "_id": "695ea0e85544eca38fd56af2",
                "name": "Pasar a limpio las citas del Papa",
                "description": "Las tienes en una foto en el móvil",
                "priority": "priority 4",
                "dueTime": "2026-01-08T09:30:00.000Z",
                "user": "695e9f565544eca38fd56ae7",
                "label": [],
                "project": "695e9f565544eca38fd56aea",
                "created": "2026-01-07T18:07:36.618Z",
                "createdAt": "2026-01-07T18:07:36.619Z",
                "updatedAt": "2026-01-07T18:07:36.619Z",
                "__v": 0
            },
            {
                "repeat": {
                    "repeatType": "none"
                },
                "_id": "695eaa065544eca38fd56af8",
                "name": "Tarea 3",
                "description": "Descripción Tarea 3",
                "priority": "priority 4",
                "dueTime": "2026-01-08T09:30:00.000Z",
                "user": "695e9f565544eca38fd56ae7",
                "label": [],
                "project": "695e9f565544eca38fd56aea",
                "created": "2026-01-07T18:46:30.842Z",
                "createdAt": "2026-01-07T18:46:30.843Z",
                "updatedAt": "2026-01-07T18:46:30.843Z",
                "__v": 0
            }
        ]
    }
}
```

Errores comunes:
- 400 — user id no informado
- 500 — error inesperado / DB / librerías

