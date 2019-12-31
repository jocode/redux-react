// Stateless: Componente funcional
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Menu from './Menu';
import Users from './users';
import Publicaciones from './publicaciones';
import Tareas from './Tareas';
import TareasGuardar from './Tareas/Guardar';

// const Tareas = () => <div>Tareas</div>;

const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="margen">
      <Route exact path='/' component={Users} />
      <Route exact path='/tareas' component={Tareas} />
      <Route exact path='/publicaciones/:key' component={Publicaciones} />
      <Route exact path='/tareas/guardar/' component={TareasGuardar} />
      <Route exact path='/tareas/guardar/:usuId/:idTarea' component={TareasGuardar} />
    </div>
  </BrowserRouter>
);

export default App;