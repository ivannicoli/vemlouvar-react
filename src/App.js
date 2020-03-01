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
import GeradorDocx from "./js/classes/GerardorDocx"
import FirebaseService from './js/services/FirebaseServices';

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
    new GeradorDocx(this.state.musicas).gerarDocX();

  }


  gerarPptX = () => {
    new GeradorPptx(this.state.musicas).gerarPptX();
  }

  removeMusica = posicao => {
    let arrMusicas = this.state.musicas;
    arrMusicas.splice(posicao, 1);
    this.setState({
      ...this.state,
      musicas: arrMusicas
    })
    this.handleChange()
  }

  paraCima = posicao => {
    if (posicao == 0)
      return;
    let arrMusicas = this.state.musicas;
    let tmp = arrMusicas[posicao]
    arrMusicas[posicao] = arrMusicas[posicao - 1];
    arrMusicas[posicao - 1] = tmp;
    this.setState({
      ...this.state,
      musicas: arrMusicas
    })
    this.handleChange()
  }

  paraBaixo = posicao => {
    let arrMusicas = this.state.musicas;
    if (posicao == arrMusicas.length - 1)
      return;
    let tmp = arrMusicas[posicao]
    arrMusicas[posicao] = arrMusicas[posicao + 1];
    arrMusicas[posicao + 1] = tmp;
    this.setState({
      ...this.state,
      musicas: arrMusicas
    })
    this.handleChange()
  }

  addMusica = m => {
    let arrMusicas = this.state.musicas;
    arrMusicas.push(m)
    this.setState({
      ...this.state,
      musicas: arrMusicas
    })
    this.handleChange()
  }

  async componentDidMount() {    
    this.setState((await FirebaseService.getState()))
  }

  handleChange = () => {
    FirebaseService.saveState(this.state)
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
              { title: "Momento", field: "momento" },
              { title: "Nome", field: "nome" }
            ]}
            data={this.state.musicas}
            title="Missa"
            actions={[
              {
                icon: 'delete',
                tooltip: 'Delete Música',
                onClick: (event, rowData) => {
                  this.removeMusica(rowData.tableData.id)
                }
              },
              {
                icon: 'keyboard_arrow_up',
                tooltip: 'Para Cima',
                onClick: (event, rowData) => {
                  this.paraCima(rowData.tableData.id)
                }
              },
              {
                icon: 'keyboard_arrow_down',
                tooltip: 'Para Baixo',
                onClick: (event, rowData) => {
                  this.paraBaixo(rowData.tableData.id)
                }
              },
            ]}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      const data = this.state.musicas;
                      const index = data.indexOf(oldData);
                      data[index] = newData;
                      this.setState({ ...this.state, musicas: data }, () => resolve());
                    }
                    resolve()
                  }, 1000)
                  this.handleChange()
                }),
            }}
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