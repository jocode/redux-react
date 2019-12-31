import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';

import * as tareasActions from '../../actions/tareasActions';

class Tareas extends Component {

  componentDidMount() {
    if (!Object.keys(this.props.tareas).length) {
      this.props.traerTodas();
    }
  }

  componentDidUpdate() {

    const { tareas, cargando, traerTodas } = this.props;

    if (!Object.keys(tareas).length && !cargando) {
      traerTodas();
    }
  }

  mostrarContenido = () => {
    const { tareas, cargando, error } = this.props;

    if (cargando) {
      return <Spinner />
    }

    if (error) {
      return <Fatal mensaje={error} />
    }

    return Object.keys(tareas).map((usuId) => (
      <div key={usuId}>
        <h2>Usuario {usuId}</h2>
        <div className='contenedor_tareas'>
          {this.ponerTareas(usuId)}
        </div>
      </div>
    ));

  }

  ponerTareas = (usuId) => {
    // Se necesita destructuras tareas
    const { tareas, cambioCheck, eliminar } = this.props;

    const userTask = {
      ...tareas[usuId]
    };

    return Object.keys(userTask).map((idTarea) => (
      <div key={idTarea} >
        <input
          type="checkbox"
          defaultChecked={userTask[idTarea].completed}
          onChange={() => cambioCheck(usuId, idTarea)} />
        {
          userTask[idTarea].title
        }
        <button className='m_left'>
          <Link to={`/tareas/guardar/${usuId}/${idTarea}`}>
            Editar
          </Link>
        </button>
        <button className='m_left' onClick={() => eliminar(idTarea)}>
          Eliminar
        </button>
      </div >

    ));

  }

  render() {
    return (
      <div>
        <button>
          <Link to='/tareas/guardar'>
            Agregar
          </Link>
        </button>
        {this.mostrarContenido()}
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);