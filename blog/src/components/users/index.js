import React, { Component } from 'react';

// Conectando el componente a reducer
import { connect } from 'react-redux';

import * as usuariosActions from '../../actions/usuariosActions';

class Users extends Component {

  componentDidMount() {
    this.props.traerTodos();
  }

  ponerFilas = () => (
    this.props.usuarios.map((user) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.website}</td>
      </tr>
    ))
  );

  render() {
    return (
      <div>
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Enlace</th>
            </tr>
          </thead>
          <tbody>
            {this.ponerFilas()}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (reducer) => {
  return reducer.usuariosReducer;
}

export default connect(mapStateToProps, usuariosActions/*Actions*/)(Users);