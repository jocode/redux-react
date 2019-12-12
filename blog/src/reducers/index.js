import { combineReducers } from 'redux';
import usuariosReducer from './usuariosReducers';
import publicacionesReducer from './usuariosReducers';

export default combineReducers({
  usuariosReducer,
  publicacionesReducer
});