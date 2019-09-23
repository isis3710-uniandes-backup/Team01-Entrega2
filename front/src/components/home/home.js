import React, { Component } from 'react'
import '../../styles/home.css'
import ofMat from '../../assets/imgs/ofMat.png'
import logo from "../../assets/imgs/logotype2.png";
import desktop from '../../assets/imgs/desktop.png'
import { Col, Row, Button } from 'react-bootstrap';
import CategoryBlock from '../tutoring/categoryblock';
const url = "Https://tutofinder.herokuapp.com";
export default class Home extends Component {
  state = {
    categories: [],
    imagenes : ["https://concepto.de/wp-content/uploads/2013/08/matematicas-e1551990337130.jpg"]
  
  }
  componentDidMount() {
    fetch(`${url}/categories/`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          categories: json
        })
      }
      );
  }
  render() {
    return (
      <div id="home">
        <Row id="banner" >
          <Col md={6} id="lineamiento" >
            <strong id="nombrem">TutoFinder</strong>
            <br></br>
            <strong id="slogan">Aquí encontrarás los mejores tutores.</strong>
            <br></br>
            <Button href="#categories" id="empecemosButton"><strong>EMPECEMOS</strong></Button>
          </Col>
          <Col md={6}>
            <img className="img" id="logo" src={desktop} alt="Imagen 1"></img>
          </Col>
        </Row>
        <Row id="categories">
          <Col md={12} id="contenedorTitulo">
            <h1 id="titleCat">Selecciona la <strong id="emphasis">categoría</strong> que necesitas...</h1>
          </Col>
          {this.state.categories.map((e, i) => <CategoryBlock key={i} value={e} imagenes={this.state.imagenes} />)}
        </Row>
      </div>
    )
  }
}
