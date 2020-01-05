import React from 'react';
import './styles.css'
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div id="container" class="container-fluid d-flex h-100 flex-column">


        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
            <div>
              <h10 class="hash-heading">Algolia&nbsp;</h10>
            </div>
            <div class="aa-input-container" id="aa-input-container">
              <input type="search" id="aa-search-input" class="form-control text-input" placeholder="Pesquisar por músicas e momentos..." name="search" autocomplete="off" />
            </div>
          </div>
        </div>


        <div class="row" style={{ display: "none" }}>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div>
              <h10 class="hash-heading">Momentos&nbsp;</h10>
            </div>
            <select id="momentos" class="form-control text-input">
            </select>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div>
              <h10 class="hash-heading">Musicas&nbsp;</h10>
            </div>
            <select id="musicas" class="form-control text-input">
            </select>
          </div>
        </div>


        <div class="row" style={{ display: "none" }}>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
            <div>
              <h10 class="hash-heading">Missa&nbsp;</h10>
            </div>
            <ol class='musicas'>
              <li>Primeira Música</li>
              <li>Segunda Música</li>
              <li>Terceira Música</li>
            </ol>
          </div>
        </div>


        <div class="row flex-fill d-flex justify-content-start">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 portlet-container portlet-dropzone">
            <div>
              <h10 class="hash-heading">Missa&nbsp;</h10>
            </div>
            <div id="jsGrid"></div>
          </div>
        </div>


        <div class="row">
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
            <div>
              <h10 class="hash-heading">Apresentação&nbsp;</h10>
            </div>
            <textarea class="form-control text-input" rows="5"></textarea>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
            <div>
              <h10 class="hash-heading">Cifra&nbsp;</h10>
            </div>
            <textarea class="form-control text-input" rows="5"></textarea>
          </div>
        </div>


        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
            <div>
              <h10 class="hash-heading">&nbsp;</h10>
            </div>

            <div class="btn-toolbar">
              <button type="button" class="btn btn-secondary btn-pptx">Gerar Apresentação</button>&nbsp;&nbsp;&nbsp;
              <button type="button" class="btn btn-secondary btn-docx">Gerar Cifra</button>&nbsp;&nbsp;&nbsp;
              <button type="button" class="btn btn-secondary" onclick="window.location.href = './pages/cadastromusicas.html';">Cadastro Músicas</button>
            </div>
            <div>
              <h10 class="hash-heading">&nbsp;</h10>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;