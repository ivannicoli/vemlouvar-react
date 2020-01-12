import React, { Component } from 'react';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import AutoComplete from '../algolia/AutoComplete';

const searchClient = algoliasearch(
    'EZQCIMR39C',
    'f732355d64b2c1994d710a96b48dcd5f'
);

export default props => (
  <InstantSearch indexName="actors" searchClient={searchClient}>
      <AutoComplete/>
  </InstantSearch>
);