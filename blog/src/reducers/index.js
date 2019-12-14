import { combineReducers } from 'redux';
import usuariosReducer from './usuariosReducers';
import publicacionesReducer from './publicacionesReducer';

export default combineReducers({
  usuariosReducer,
  publicacionesReducer
});