import React from 'react';
import {
  Form, Dropdown, DropdownButton,
  FormControl, InputGroup, Col,
  Row, Container, Navbar, Nav,
  NavDropdown, ButtonToolbar, ButtonGroup,
  Button
} from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (


      <Container fluid="true">

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
                </Nav>
                <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Navbar.Collapse>
            </Navbar>
          </Col>

        </Row>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text variant="success" id="basic-addon1">Algolia</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Col>

        </Row>


        <Row style={{ display: "none" }}>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text variant="success" id="basic-addon1">Momentos</InputGroup.Text>
              </InputGroup.Prepend>
              <DropdownButton
                as={InputGroup.Prepend}
                variant="outoline-secondary"
                title="Dropdown"
                id="input-group-dropdown-1"
              >
                <Dropdown.Item href="#">Action</Dropdown.Item>
                <Dropdown.Item href="#">Another action</Dropdown.Item>
                <Dropdown.Item href="#">Something else here</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#">Separated link</Dropdown.Item>
              </DropdownButton>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text variant="success" id="basic-addon1">Músicas</InputGroup.Text>
              </InputGroup.Prepend>
              <DropdownButton
                as={InputGroup.Prepend}
                variant="outoline-secondary"
                title="Dropdown"
                id="input-group-dropdown-1"
              >
                <Dropdown.Item href="#">Action</Dropdown.Item>
                <Dropdown.Item href="#">Another action</Dropdown.Item>
                <Dropdown.Item href="#">Something else here</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#">Separated link</Dropdown.Item>
              </DropdownButton>
            </InputGroup>
          </Col>

        </Row>


        <Row>
          <Col>
            <Form.Label>Missa</Form.Label>
          </Col>
        </Row>


        <Row>
          <Col sm>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Apresentação</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as="textarea" aria-label="With textarea" rows="5" />
            </InputGroup>
          </Col>
          <Col sm>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Cifra</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as="textarea" aria-label="With textarea" rows="5" />
            </InputGroup>
          </Col>

        </Row>

        <Row>
          <Col>
            <Form.Label>&nbsp;</Form.Label>
          </Col>
        </Row>

        <Row>
          <Col>

            <ButtonToolbar>
              <Button className="mr-2" variant="outline-info">Gerar Apresentação</Button>
              <Button className="mr-2" variant="outline-success">Gerar Cifra</Button>
            </ButtonToolbar>

          </Col>

        </Row>
      </Container >
    );
  }
}
export default App;