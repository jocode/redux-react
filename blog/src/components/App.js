// Stateless: Componente funcional
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