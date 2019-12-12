import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Tabla = (props) => {

  const ponerFilas = () => props.usuarios.map((user, key) => (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.website}</td>
      <td>
        <Link to={`/publicaciones/${key}`}>
          <div className="eye-solid icon"></div>
        </Link>
      </td>
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
