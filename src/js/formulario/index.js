import React from 'react';
import {
  Form, Dropdown, DropdownButton,
  FormControl, InputGroup, Col,
  Row, Container, Navbar, Nav,
  NavDropdown, ButtonToolbar, ButtonGroup,
  Button
} from 'react-bootstrap';
import FirebaseService from '../services/FirebaseServices';

class CadastroMusica extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  async componentWillMount() {
    let momentos = (await FirebaseService.listMomentos());
    this.setState({
      ...this.state,
      momentos
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      id: nextProps.id,
      nome: nextProps.nome,
      momento: nextProps.momento,
      cifra: nextProps.cifra,
      apresentacao: nextProps.apresentacao
    })
  }


  handleChange = (event) => {
    const id = event.target.id;
    this.setState({
      ...this.state,
      [id]: event.target.value,
    });
    console.log(this.state.momento)
  }

  handleSubmit = (event) => {
    let musica = {
      id: this.state.id,
      nome: this.state.nome,
      momento: this.state.momento,
      cifra: this.state.cifra,
      apresentacao: this.state.apresentacao
    }
    FirebaseService.saveMusica(musica)
    this.props.salvar()
  }

  render() {
    if(this.state.momentos === undefined)
      return <div></div>
    return (
      <div>
        <Row >
          <Col>
            <Form.Label>&nbsp;</Form.Label>
          </Col>
        </Row>
        <Row>
          <Col sm>
            <Form.Group >
              <Form.Label>id</Form.Label>
              <input type="text" id="id" class="form-control" onChange={this.handleChange} value={this.state.id} />
            </Form.Group>
          </Col>
          <Col sm>
            <Form.Group >
              <Form.Label>Nome</Form.Label>
              <input type="text" id="nome" class="form-control" onChange={this.handleChange} value={this.state.nome} />
            </Form.Group>
          </Col>
          <Col sm>
            <Form.Group >
              <Form.Label>Momento</Form.Label>
              <select id="momento" class="form-control" onChange={this.handleChange} value={this.state.momento} >
                {this.state.momentos.map((value, index) => {
                  return <option>{value}</option>
                })}
              </select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm>
            <Form.Group >
              <Form.Label>Cifra</Form.Label>
              <textarea rows="50" id="cifra" class="form-control" onChange={this.handleChange} value={this.state.cifra} />
            </Form.Group>
          </Col>
          <Col sm>
            <Form.Group >
              <Form.Label>Apresentação</Form.Label>
              <textarea rows="50" id="apresentacao" class="form-control" onChange={this.handleChange} value={this.state.apresentacao} />
            </Form.Group>
          </Col>
        </Row>
        <Row >
          <Col>
            <Form.Label>&nbsp;</Form.Label>
          </Col>
        </Row>
        <Row>
          <Col>
            <ButtonToolbar>
              <Button className="mr-2" variant="outline-danger" onClick={this.handleSubmit}>Salvar</Button>
              <Button className="mr-2" variant="outline-danger" onClick={this.gerarPptX}>Excluir</Button>
            </ButtonToolbar>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CadastroMusica;