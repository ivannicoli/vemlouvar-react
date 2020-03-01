import React, { Component } from 'react';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure,
  Hits,
  Highlight,
  connectSearchBox,
} from 'react-instantsearch-dom';

import {
  Row, Col, Container
} from 'react-bootstrap';

import Autocomplete from './Autocomplete';
import './index.css';
import FirestoreServices from '../../services/FirebaseServices'

const VirtalSearchBox = connectSearchBox(() => null);

const searchClient = algoliasearch(
  // 'B1G2GM9NG0',
  // 'aadef574be1f9252bb48d4ea09b5cfe5'
  'EZQCIMR39C',
  'f732355d64b2c1994d710a96b48dcd5f'
);

class App extends Component {
  state = {
    query: '',
  };

  onSuggestionSelected = async (_, { suggestion }) => {
    let musica = (await FirestoreServices.getMusicaById(suggestion.id));
    musica.momento = suggestion.momento
    this.props.addMusica(musica)
  };

  onSuggestionCleared = () => {
    this.setState({
      query: '',
    });
  };

  render() {
    const { query } = this.state;

    return (
        <Row>
          <Col>
            <InstantSearch indexName="musicas" searchClient={searchClient}>
              <Configure hitsPerPage={5} />
              <Autocomplete
                onSuggestionSelected={this.onSuggestionSelected}
                onSuggestionCleared={this.onSuggestionCleared}
              />
            </InstantSearch>
          </Col>
        </Row>
    );
  }
}

function Hit(props) {
  return (
    <div>
      <Highlight attribute="name" hit={props.hit} />
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
