# Curso de Redux

Aprende a usar el ciclo completo de Redux creando una conexión a un api gratuito para obtener datos para tu Platzi Blog. Crea y configura el almacenamiento principal, conecta componentes para optimizar el funcionamiento de tu blog. Utiliza **llamadas asíncronas** y prepara sus fases obligatorias, utiliza diversos enfoques de desarrollo para que veas diferentes alternativas. Codifica con varias estructuras y decide cuál te gusta más. Entiende el ciclo completo y adáptalo a nuevos proyectos. 

> "Todos los grandes desarrolladores llegaron ahí resolviendo problemas que no estaban calificados para resolver, hasta que en realidad lo hicieron". _Patrick McKenzie_ 


## ¿Qué es React y cómo funciona?

React es uno de los frameworks web de JavaScript más comentados en años. Junto con Angular, y más recientemente Vue, React es una herramienta que ha tenido un gran impacto en la forma en que construimos aplicaciones web. En su página lo definen de una manera rápida y sencilla:

**_Una biblioteca de JavaScript para construir interfaces de usuario._**

React generalmente se considera la capa de vista en una aplicación. Es posible que hayamos utilizado bibliotecas como Handlebars o jQuery en el pasado. Al igual que jQuery, React manipula los elementos de la interfaz de usuario que se insertan en la página, los componentes de React cambian lo que el usuario ve.


- **Entorno de trabajo**

Se usará Node.js. Un ambiente de trabajo que nos permite ejecutar JavaScript por fuera de un navegador.

- Ingresa al siguiente url: https://nodejs.org/en/download/
- Descarga el instalador correspondiente a tu sistema operativo.


## Creación de la app con react

Para crear el proyecto con react ejecutamos el siguiente comando:

- `npx create-react-app blog`

Luego vamos a la carpeta **`blog/src/`** y eliminamos los siguientes archivos.
- App.css
- App.test.js
- logo.svg
- serviceWorker.js

Vamos crear una carpeta llamada **components** y movemos el archivo **`App.js`** a esa carpeta.

Luego que hagamos eso, debemos cambiar las rutas en el archivo **`index.js`** y eliminar los imports a `serviceWorker`


## Stateful vs Stateless

- Los componentes **no funcionales** _no manejan estado_, solo manejan información y funciones.

- Los **componentes de clases** manejan un estado interno, información y funciones, no hace falta definir las funciones con const simplemente con el nombre de la función ya lo detecta.


## Ciclo de vida de React

Tenemos 4 fases por los que un componente pasa:

1. **Initialization**: Declaramos nuestro estado o propiedades
2. **Mounting**: Todo componente debe tener render. Es obligatorio. 
  - `componentWillMount`
  - `render`
  - `componentDidMount`
3. **Updation**
4. **Unmounting**: Solo hay una función en caso de que queramos hacer algo cuando se destruya un componente
  - `componentWillUmount`


[**jsonplaceholder**](https://jsonplaceholder.typicode.com/) Fake Online REST API for Testing and Prototyping 

**Axios** Es un modulo de JS que permite utilizar todos los métodos HTTP. Se instala con 

- `npm install axios`

_Su uso se puede ver así:_

```js
import axios from 'axios';

const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
```

_El ejemplo completo se puede ver en:_ [index.js](blog/src/components/users/index.js)

## Manejando promesas

Una **Promesa** es un proxy para un valor no necesariamente conocido en el momento que es creada la promesa.

Las promesas tienen tres estados:
- pending
- fullfilled
- rejected

Las promesas se invocan de la siguiente forma:

```js
new  Promise( ( resolve, reject ) => {
// --- llamado asíncrono 
        if( todoOK ) { 
        // -- se ejecutó el llamado exitosamente resolve() }
        else { 
        // -- hubo un error en el llamado reject() 
        } 
} )
```


## React Router DOM

Vamos a instalar ReactRouterDom, que es una biblioteca adicional a React, que nos permite manejar rutas dentro de la aplicación.

- `npm react-router-dom`


**_Ejemplo de Rutas con ReactJS_**

```js
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Menu from './Menu';
import Users from './users';

const Tareas = () => <div>Tareas</div>;

const App = () => (
  <BrowserRouter>
    <Menu />
    <Route exact path='/' component={Users} />
    <Route exact path='/tareas' component={Tareas} />
  </BrowserRouter>
);

export default App;
```


[Ciclo de vida de un componente de react](https://platzi.com/tutoriales/1548-react/2283-ciclo-de-vida-de-un-componente-de-react/)

