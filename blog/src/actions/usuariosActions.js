import axios from 'axios';

export const traerTodos = () => async (dispatch) => {

  const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');

  dispatch({
    type: 'traer_usuarios',
    payload: respuesta.data
  })
}