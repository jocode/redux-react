import { ACTUALIZAR, CARGANDO, ERROR, COM_CARGANDO, COM_ERROR, COM_ACTUALIZAR } from '../types/publicacionesTypes'

const INITIAL_STATE = {
  publicaciones: [],
  cargando: false,
  error: '',
  com_cargando: false,
  com_error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case ACTUALIZAR:
      return {
        ...state,
        publicaciones: action.payload,
        cargando: false,
        error: ''
      };

    case CARGANDO:
      return { ...state, cargando: true };

    case ERROR:
      return { ...state, error: action.payload, cargando: false };

    case COM_ACTUALIZAR:
      return {
        ...state,
        publicaciones: action.payload,
        com_cargando: false,
        com_error: ''
      };

    case COM_CARGANDO:
      return { ...state, com_cargando: true };

    case COM_ERROR:
      return { ...state, com_error: action.payload, com_cargando: false };

    default: return state;
  }
}