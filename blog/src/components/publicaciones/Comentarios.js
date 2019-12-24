// Componentes funcional o StateLess
import React from 'react';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';


// Redux
import { connect } from 'react-redux';

const Comentarios = (props) => {

  if (props.com_error) {
    return <Fatal mensaje={props.com_error} />
  }

  if (props.com_cargando && !props.comentarios.length) {
    return <Spinner />
  }

  console.log(props.com_error);



  const ponerComentarios = () => (

    props.comentarios.map((comentario) => (
      <li key={comentario.id}>
        <b><u>
          {comentario.email}
        </u></b>
        <br />
        {comentario.body}
      </li>
    ))
  );

  return (
    <ul>
      {ponerComentarios()}
    </ul>
  );
};

const mapStateToProps = ({ publicacionesReducer }) => publicacionesReducer;

export default connect(mapStateToProps)(Comentarios);