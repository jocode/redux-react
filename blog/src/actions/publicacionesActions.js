import axios from 'axios';
import { ACTUALIZAR, CARGANDO, ERROR, COM_CARGANDO, COM_ERROR, COM_ACTUALIZAR } from '../types/publicacionesTypes'
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
      type: ACTUALIZAR,
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
export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
  // Desestructiramos las publicaciones
  const { publicaciones } = getState().publicacionesReducer;

  const seleccionada = publicaciones[pub_key][com_key];

  const actualizada = {
    ...seleccionada,
    abierto: !seleccionada.abierto
  };

  const publicaciones_actualizadas = [...publicaciones];
  publicaciones_actualizadas[pub_key] = [
    ...publicaciones[pub_key]
  ];

  publicaciones_actualizadas[pub_key][com_key] = actualizada;

  dispatch({
    type: ACTUALIZAR,
    payload: publicaciones_actualizadas
  });

}


export const traerComentarios = (pub_key, com_key) => async (dispatch, getState) => {
  // Buscamos los comentarios
  dispatch({
    type: COM_CARGANDO
  });

  const { publicaciones } = getState().publicacionesReducer;
  const seleccionada = publicaciones[pub_key][com_key];

  try {
    // Comentarios de una publicacion
    const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`);

    const actualizada = {
      ...seleccionada,
      comentarios: respuesta.data
    };

    // Todo lo que publicaciones tiene
    const publicaciones_actualizadas = [...publicaciones];
    publicaciones_actualizadas[pub_key] = [
      ...publicaciones[pub_key]
    ];

    // A esa publicacion se le hace el dispatch para guardar mostrar los comentarios
    publicaciones_actualizadas[pub_key][com_key] = actualizada;

    dispatch({
      type: COM_ACTUALIZAR,
      payload: publicaciones_actualizadas
    });

  } catch (error) {
    console.log(error.message);

    dispatch({
      type: COM_ERROR,
      payload: 'Comentarios no disponibles'
    });
  }

}