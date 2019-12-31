import { combineReducers } from 'redux';
import usuariosReducer from './usuariosReducers';
import publicacionesReducer from './publicacionesReducer';
import tareasReducer from './tareasReducer';

export default combineReducers({
  usuariosReducer,
  publicacionesReducer,
  tareasReducer
});