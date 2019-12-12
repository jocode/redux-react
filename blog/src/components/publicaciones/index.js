import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario } = publicacionesActions;

class Publicaciones extends Component {


  async componentDidMount() {
    if (!this.props.usuariosReducer.usuarios.length) {
      await this.props.usuariosTraerTodos();
    }

    this.props.publicacionesTraerPorUsuario(this.props.match.params.key);

  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Publicaciones de</h1>
        {this.props.match.params.key}
      </div>
    );
  }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
  return {
    usuariosReducer,
    publicacionesReducer
  };
};

const mapDispatchToProps = {
  usuariosTraerTodos,
  publicacionesTraerPorUsuario
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);