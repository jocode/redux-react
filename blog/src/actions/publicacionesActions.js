import axios from 'axios';
import { TRAER_POR_USUARIO, CARGANDO, ERROR } from '../types/publicacionesTypes'
import * as usuariosTypes from '../types/usuariosTypes';

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

export const traerPorUsuario = (key) => async (dispatch, getState) => {

  dispatch({
    type: CARGANDO
  });

  const { usuarios } = getState().usuariosReducer;
  const { publicaciones } = getState().publicacionesReducer;
  const user_id = usuarios[key].id;


  try {
    const respuesta = await axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${user_id}`);

    const nuevas = respuesta.data.map((publicacion) => ({
      ...publicacion,
      comentarios: [],
      abierto: false
    }));

    const publicaciones_actualizadas = [
      ...publicaciones,
      nuevas,
    ];

    const publicaciones_key = publicaciones_actualizadas.length - 1;

    // Se necesita primero las publicaciones
    dispatch({
      type: TRAER_POR_USUARIO,
      payload: publicaciones_actualizadas
    });

    // Actualizar los usuarios
    const usuarios_actualizados = [...usuarios];
    usuarios_actualizados[key] = {
      ...usuarios[key],
      publicaciones_key
    };

    dispatch({
      type: USUARIOS_TRAER_TODOS,
      payload: usuarios_actualizados
    });

  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: 'Publicaciones no disponibles.'
    });
  }

}

// La segunda funcion es la que tiene el dispatch
export const abrirCerrar = (pub_key, com_key) => (dispatch) => {
  console.log(pub_key, com_key);
}