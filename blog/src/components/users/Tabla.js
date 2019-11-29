import React from 'react'
import { connect } from 'react-redux';

const Tabla = (props) => {

  const ponerFilas = () => props.usuarios.map((user) => (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.website}</td>
    </tr>
  ));

  return (
    <table className="tabla">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Enlace</th>
        </tr>
      </thead>
      <tbody>
        {ponerFilas()}
      </tbody>
    </table>
  );


}


const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
}

export default connect(mapStateToProps)(Tabla);
