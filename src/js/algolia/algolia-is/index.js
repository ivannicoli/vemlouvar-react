import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './index.css';


import {
  Row, Col, Container
} from 'react-bootstrap';

const searchClient = algoliasearch(
  // 'B1G2GM9NG0',
  // 'aadef574be1f9252bb48d4ea09b5cfe5'
  'EZQCIMR39C',
  'f732355d64b2c1994d710a96b48dcd5f'
);

class App extends Component {
  render() {
    return (
      <div className="ais-InstantSearch">
        <InstantSearch indexName="musicas" searchClient={searchClient} >
          <Container fluid className="d-flex h-100 flex-column">
            <Row >
              <Col sm={false}>
                <ClearRefinements />
                <h2>Momento</h2>
                <RefinementList attribute="momento" />
                <Configure hitsPerPage={8} />
              </Col>
              <Col >
                <SearchBox />
                <Hits hitComponent={Hit} />
                <Pagination />
              </Col>
            </Row>
          </Container>
        </InstantSearch>
      </div>
    );
  }
}

function Hit(props) {
  return (
    <div>
      <div className="hit-name">
        <Highlight attribute="nome" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="apresentacao" hit={props.hit} />
      </div>
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;