import React, { Component } from 'react';
import { connect } from 'react-redux';

import Fatal from '../general/Fatal';
import Spinner from '../general/Spinner';

import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';


const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario, abrirCerrar } = publicacionesActions;

class Publicaciones extends Component {


  async componentDidMount() {

    // Destructuramos el objeto
    const {
      usuariosTraerTodos,
      publicacionesTraerPorUsuario,
      match: { params: { key } }
    } = this.props;

    if (!this.props.usuariosReducer.usuarios.length) {
      await usuariosTraerTodos();
    }

    if (this.props.usuariosReducer.error) {
      return;
    }

    if (!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])) {
      publicacionesTraerPorUsuario(key);
    }

  }

  ponerUsuario = () => {
    const {
      usuariosReducer,
      match: { params: { key } }
    } = this.props;

    if (usuariosReducer.error) {
      return <Fatal mensaje={usuariosReducer.error} />
    }

    if (!usuariosReducer.usuarios.length || usuariosReducer.cargando) {
      return <Spinner />
    }

    const nombre = usuariosReducer.usuarios[key].name;

    return (
      <h1>Publicaciones de de {nombre} </h1>
    );

  };

  ponerPublicaciones = () => {
    const {
      usuariosReducer,
      usuariosReducer: { usuarios },
      publicacionesReducer,
      publicacionesReducer: { publicaciones },
      match: { params: { key } }
    } = this.props;

    if (!usuarios.length) return;

    if (usuariosReducer.error) return;

    if (publicacionesReducer.error) {
      return <Fatal mensaje={publicacionesReducer.error} />
    }


    if (publicacionesReducer.cargando) {
      return <Spinner />;
    }

    if (!publicaciones.length) return;

    if (!('publicaciones_key' in usuarios[key])) return;

    const { publicaciones_key } = usuarios[key];

    return this.mostrarInfo(publicaciones[publicaciones_key], publicaciones_key);

  };


  mostrarInfo = (publicaciones, pub_key) => (
    publicaciones.map((publicacion, com_key) => (
      <div
        key={publicacion.id} className='pub_titulo'
        onClick={() => this.props.abrirCerrar(pub_key, com_key)
        }>
        <h2>{publicacion.title}</h2>
        <h3>
          {publicacion.body}
        </h3>
      </div >
    ))
  );

  render() {
    console.log(this.props)
    return (
      <div>
        {this.ponerUsuario()}
        {this.ponerPublicaciones()}
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
  publicacionesTraerPorUsuario,
  abrirCerrar
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);