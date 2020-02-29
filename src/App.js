import React from 'react';
import {
  Form, Dropdown, DropdownButton,
  FormControl, InputGroup, Col,
  Row, Container, Navbar, Nav,
  NavDropdown, ButtonToolbar, ButtonGroup,
  Button
} from 'react-bootstrap';
import AlgoliaSearch from './js/algolia/algolia-ac';

import MaterialTable from "material-table";

import './themes/bootstrap.min-darkly.css';

import GeradorPptx from "./js/classes/GerardorPptx"

// import OfficeGenUtils from './js/utils/officegenUtils.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      musicas: []
    }
    this.addMusica.bind(this);
  }

  gerarDocX = () => {

    alert("oi")

  }

  
  gerarPptX = () => {
    new GeradorPptx(this.state.musicas).gerarPptX();
  }

  addMusica = m => {
    var arrMusicas = this.state.musicas;
    arrMusicas.push(m)
    this.setState({
      musicas: arrMusicas
    })
  }

  render() {
    return (
      <Container fluid className="d-flex h-100 flex-column">
        <Row>
          <Col>
            <Navbar expand="lg">
              <Navbar.Brand href="#home">Vem Louvar</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <NavDropdown title="Missa" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Cadastro Músicas</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Missas</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Sobre</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Themes" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Cadastro Músicas</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Missas</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Sobre</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>

        </Row>

        <AlgoliaSearch addMusica={this.addMusica} />

        <div style={{ maxWidth: "100%" }}>
          <MaterialTable
            columns={[
              { title: "Nome", field: "nome" },
              { title: "Momento", field: "momento" }
            ]}
            data={this.state.musicas}
            title="Missa"
          />
        </div>

        <Row>
          <Col sm>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Cifra</Form.Label>
              <Form.Control as="textarea" rows="5" />
            </Form.Group>
          </Col>
          <Col sm>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Apresentação</Form.Label>
              <Form.Control as="textarea" rows="5" />
            </Form.Group>
          </Col>

        </Row>

        <Row>
          <Col>

            <ButtonToolbar>
              <Button className="mr-2" variant="outline-info" onClick={this.gerarPptX}>Gerar Apresentação</Button>
              <Button className="mr-2" variant="outline-success" onClick={this.gerarDocX}>Gerar Cifra</Button>
            </ButtonToolbar>

          </Col>
        </Row>

        <Row >
          <Col>
            <Form.Label>&nbsp;</Form.Label>
          </Col>
        </Row>
      </Container >
    );
  }
}
export default App;