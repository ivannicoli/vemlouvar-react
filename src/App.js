import React from 'react';
import {
  Form, Dropdown, DropdownButton,
  FormControl, InputGroup, Col,
  Row, Container, Navbar, Nav,
  NavDropdown, ButtonToolbar, ButtonGroup,
  Button
} from 'react-bootstrap';
import AlgoliaSearch from './js/algolia/algolia-ac';
import FormularioMusica from './js/formulario'

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

  editar = posicao => {
    let arrMusicas = this.state.musicas;
    this.setState(
      {
        ...this.state,
        id: arrMusicas[posicao].id,
        nome: arrMusicas[posicao].nome,
        momento: arrMusicas[posicao].momento,
        cifra: arrMusicas[posicao].cifra,
        apresentacao: arrMusicas[posicao].apresentacao
      }
    )
    

  }

  removeMusica = posicao => {
    let arrMusicas = this.state.musicas;
    arrMusicas.splice(posicao, 1);
    this.setState({
      ...this.state,
      musicas: arrMusicas
    })
    this.handleChangeTable()
  }

  paraCima = posicao => {
    if (posicao === 0)
      return;
    let arrMusicas = this.state.musicas;
    let tmp = arrMusicas[posicao]
    arrMusicas[posicao] = arrMusicas[posicao - 1];
    arrMusicas[posicao - 1] = tmp;
    this.setState({
      ...this.state,
      musicas: arrMusicas
    })
    this.handleChangeTable()
  }

  paraBaixo = posicao => {
    let arrMusicas = this.state.musicas;
    if (posicao === arrMusicas.length - 1)
      return;
    let tmp = arrMusicas[posicao]
    arrMusicas[posicao] = arrMusicas[posicao + 1];
    arrMusicas[posicao + 1] = tmp;
    this.setState({
      ...this.state,
      musicas: arrMusicas
    })
    this.handleChangeTable()
  }

  addMusica = m => {
    let arrMusicas = this.state.musicas;
    arrMusicas.push(m)
    this.setState({
      ...this.state,
      musicas: arrMusicas
    })
    this.handleChangeTable()
  }

  async componentDidMount() {
    this.setState((await FirebaseService.getState()))
  }

  handleChangeTable = () => {
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
                icon: 'edit',
                tooltip: 'Editar',
                onClick: (event, rowData) => {
                  this.editar(rowData.tableData.id)
                }
              },
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
                  this.handleChangeTable()
                }),
            }}
          />
        </div>

        <Row >
          <Col>
            <Form.Label>&nbsp;</Form.Label>
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

        <FormularioMusica 
          id={this.state.id}
          nome={this.state.nome}
          momento={this.state.momento}
          cifra={this.state.cifra}
          apresentacao={this.state.apresentacao} />

      </Container >
    );
  }
}
export default App;