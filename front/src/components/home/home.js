import React, { Component } from 'react'
import '../../styles/home.css'
import ofMat from '../../assets/imgs/ofMat.png'
import logo from "../../assets/imgs/logotype2.png";

export default class Home extends Component {
  render() {
    return (
      <div id="home">
        <div id="banner">
          <div className="position-relative  p-3 p-md-5 m-md-3 text-left">
            <div className="col-md-5 p-lg-5 my-5">
              <h1 className="display-4 font-weight-normal titulo">TutoFinder</h1>
              <b className="lead font-weight-normal titulo">El tutor que necesitas a un click de distancia</b>
              <a id="sobreNosotros" className="btn btn-outline-secondary" href="#nosotros">Sobre nosotros</a>
            </div>
          </div>
        </div>
        <hr></hr>
        <div id="nosotros" className="row">
          <div className="col-md-12 text-center">
            <h1>Sobre Nosotros</h1>
            <img className="img-circle" src={logo} alt="Imagen 1" width="140" height="140"></img>
          </div>
          <div className="col-md-8 col-md-offset-2">
            <div className="about-text text-center">
              <p>TutoFinder; es un proyecto que surgió en el año 2019 como respuesta a la necesidad de apoyo académico a estudiantes en su proceso de aprendizaje. Entendemos las dificultades que se pueden presentar al buscar tutores para determinadas materias, como respuesta a esto creamos este proyecto con el cual buscamos facilitar el proceso de búsqueda de monitores.
            </p>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="container marketing">
          <div className="row">
            <div className="col-lg-4">
              <img className="img-circle" src={ofMat} alt="Generic placeholder" width="140" height="140"></img>
              <h2>Oferta de materias</h2>
              <p className="text-justify">Te ofrecemos una gran cantidad de materias y monitores. A diferencia de otras empresas nosotros te ofrecemos tutorias de las materias que necesites, incluso de las especificas de la carrera</p>
            </div>
            <div className="col-lg-4">
              <img className="img-circle" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Reloj_flat.svg/200px-Reloj_flat.svg.png" alt="Generic placeholder1" width="140" height="140"></img>
              <h2>Flexibilidad</h2>
              <p className="text-justify">Sabemos que tienes un horario apretado por eso te ofrecemos la opción de agendar tus monitorias con un tutor a una hora de tu conveniencia </p>
            </div>
            <div className="col-lg-4">
              <img className="img-circle" src="https://dbf.es/wp-content/uploads/2018/08/referencias.jpg" alt="Generic placeholde3" width="140" height="140"></img>
              <h2>Las mejores referencias</h2>
              <p className="text-justify">Nuestros tutores cuentan con calificaciones y comentarios para que puedas guiarte al momento de buscar una monitoria</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
