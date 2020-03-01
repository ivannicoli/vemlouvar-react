import React from 'react';
import {
  Form, Dropdown, DropdownButton,
  FormControl, InputGroup, Col,
  Row, Container, Navbar, Nav,
  NavDropdown, ButtonToolbar, ButtonGroup,
  Button
} from 'react-bootstrap';

class CadastroMusica extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      momento: props.momento,
      nome: props.nome,
      cifra: props.cifra,
      apresentacao: props.apresentacao
    }
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        momento: nextProps.momento,
        nome: nextProps.nome,
        cifra: nextProps.cifra,
        apresentacao: nextProps.apresentacao
    })
  }


  // handleChange = (event) => {
  //   const id = event.target.id;
  //   this.setState({
  //     ...this.state, 
  //     [id]: event.target.value,
  //     cifra: event.target.value
  //   });
  // }

  handleSubmit = (event) => {
    alert('Um nome foi enviado: ' + this.state.nome);
  }

  render() {
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
              <Form.Label>Nome</Form.Label>
              <input type="text" id="nome" class="form-control" onchange={this.state.nome} value={this.state.nome} />
            </Form.Group>
          </Col>
          <Col sm>
            <Form.Group >
              <Form.Label>Momento</Form.Label>
              <select id="momento" class="form-control" onchange={this.state.momento} value={this.state.momento} >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm>
            <Form.Group >
              <Form.Label>Cifra</Form.Label>
              <textarea rows="50" id="cifra" class="form-control" onchange={this.state.cifra} value={this.state.cifra} />
            </Form.Group>
          </Col>
          <Col sm>
            <Form.Group >
              <Form.Label>Apresentação</Form.Label>
              <textarea rows="50" id="apresentacao" class="form-control" onchange={this.state.apresentacao} value={this.state.apresentacao} />
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