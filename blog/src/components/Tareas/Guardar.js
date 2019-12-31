import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import { Redirect } from 'react-router-dom';

import * as tareasAction from '../../actions/tareasActions';

class Guardar extends Component {

  componentDidMount() {

    console.log(this.props);

    const {
      match: { params: { usuId, idTarea } },
      tareas,
      cambioUsuarioId,
      cambioTitulo,
      limpiarForma
    } = this.props;

    if (usuId && idTarea) {
      const tarea = tareas[usuId][idTarea];
      cambioUsuarioId(tarea.userId);
      cambioTitulo(tarea.title);
    } else {
      limpiarForma();
    }

  }

  cambioUsuarioId = (event) => {
    this.props.cambioUsuarioId(event.target.value)
  }

  cambioTitulo = (event) => {
    this.props.cambioTitulo(event.target.value)
  }

  guardar = () => {
    // Destructurar los datos
    const {
      match: { params: { usuId, idTarea } },
      tareas,
      usuario_id,
      titulo,
      agregar,
      editar
    } = this.props;

    const nueva_tarea = {
      userId: usuario_id,
      title: titulo,
      completed: false
    };

    if (usuId && idTarea) {



      const tarea = tareas[usuId][idTarea];

      const tarea_editada = {
        ...nueva_tarea,
        completed: tarea.completed,
        id: tarea.id
      }

      editar(tarea_editada);

    } else {
      agregar(nueva_tarea);
    }


  }

  deshabilitar = () => {
    const { usuario_id, titulo, cargando } = this.props;

    if (cargando) {
      return true;
    }

    if (!usuario_id || !titulo) {
      return true;
    }

    return false;

  };

  mostrarAccion = () => {
    const { error, cargando } = this.props;

    if (cargando) {
      return <Spinner />
    }

    if (error) {
      return <Fatal mensaje={error} />;
    }
  }

  render() {
    if (this.props.regresar) return <Redirect to='/tareas' />;

    return (
      <div>
        <h1>
          Guardar Tarea
        </h1>
        Usuario id:
        <input type="number" defaultValue={this.props.usuario_id}
          onChange={this.cambioUsuarioId} /><br /><br />
        Titulo:
        <input type="text" defaultValue={this.props.titulo}
          onChange={this.cambioTitulo} /><br /><br />

        <button
          onClick={this.guardar}
          disabled={this.deshabilitar()}>
          Guardar
        </button>
        {this.mostrarAccion()}
      </div >
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasAction)(Guardar);