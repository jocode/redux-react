import axios from 'axios';
import { TRAER_TODAS, CARGANDO, ERROR, CAMBIO_USUARIO_ID, CAMBIO_TITULO, GUARDAR, ACTUALIZAR, LIMPIAR } from '../types/tareasTypes'

export const traerTodas = () => async (dispatch) => {

  dispatch({
    type: CARGANDO
  });

  try {
    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');

    const tareas = {};
    respuesta.data.map((task) => (

      tareas[task.userId] = {
        ...tareas[task.userId],
        [task.id]: {
          ...task
        }
      }

    ));

    dispatch({
      type: TRAER_TODAS,
      payload: tareas
    })
  } catch (error) {
    console.log('Error: ', error.message
    );

    dispatch({
      type: ERROR,
      payload: 'Información de tareas no disponible.'
    });
  }

}

export const updateValue = (name, value) => (dispatch) => {
  const data = {
    name,
    value
  };
  dispatch({
    type: 'UPDATE_VALUE',
    payload: data
  });
};


export const cambioUsuarioId = (usuario_id) => (dispatch) => {
  dispatch({
    type: CAMBIO_USUARIO_ID,
    payload: usuario_id
  });
}

export const cambioTitulo = (titulo) => (dispatch) => {
  dispatch({
    type: CAMBIO_TITULO,
    payload: titulo
  });
}

export const agregar = (nueva_tarea) => async (dispatch) => {
  dispatch({
    type: CARGANDO
  });

  try {
    const respuesta = await axios.post('https://jsonplaceholder.typicode.com/todos', nueva_tarea);

    dispatch({
      type: GUARDAR
    });

  } catch (error) {
    console.log(error.message);

    dispatch({
      type: ERROR,
      payload: 'Intente más tarde'
    });
  }
}

export const editar = (tarea_editada) => async (dispatch) => {

  dispatch({
    type: CARGANDO
  });

  try {
    const respuesta = await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`, tarea_editada);

    dispatch({
      type: GUARDAR
    });

  } catch (error) {
    console.log(error.message);

    dispatch({
      type: ERROR,
      payload: 'Intente más tarde'
    });
  }

}

export const cambioCheck = (usuId, idTarea) => (dispatch, getState) => {
  const { tareas } = getState().tareasReducer;

  const seleccionada = tareas[usuId][idTarea];

  const actualizadas = {
    ...tareas
  };

  actualizadas[usuId] = {
    ...tareas[usuId]
  };

  actualizadas[usuId][idTarea] = {
    ...tareas[usuId][idTarea],
    completed: !seleccionada.completed
  };

  dispatch({
    type: ACTUALIZAR,
    payload: actualizadas
  });

}


export const eliminar = (idTarea) => async (dispatch) => {

  dispatch({
    type: CARGANDO
  });

  try {
    const respuesta = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${idTarea}`);

    dispatch({
      type: TRAER_TODAS,
      payload: {}
    });
  } catch (error) {
    console.log(error.message);

    dispatch({
      type: ERROR,
      payload: 'Servicio no disponible'
    });
  }
}

export const limpiarForma = () => (dispatch) => {

  dispatch({
    type: LIMPIAR
  });

}