$(() => {

  const client = algoliasearch('EZQCIMR39C', 'f732355d64b2c1994d710a96b48dcd5f');
  const musicas = client.initIndex('musicas');

  autocomplete('#aa-search-input', {}, [
    {
      source: autocomplete.sources.hits(musicas, { hitsPerPage: 100 }),
      displayKey: 'nome',
      templates: {
        header: '<div class="aa-suggestions-category">musicas</div>',
        suggestion({ _highlightResult }) {
          return `<span>
                    <div>Momento: ${_highlightResult.momento.value}</div>
                    <div>Nome: ${_highlightResult.nome.value}</div>
                    <div>${_highlightResult.apresentacao.value}</div>
                  </span>`;
        }
      }
    }
  ]).on('autocomplete:selected', function (event, suggestion, dataset, context) {
    musicasGrid.push(suggestion)
    updateMusicasGrid()
  });

  resizeAutoComplete();

  $(window).resize(function () {
    resizeAutoComplete();
  });

})

function resizeAutoComplete() {
  $('#aa-search-input').css('width', $('#jsGrid').css('width'))
  $('.aa-dropdown-menu').css('width', $('#jsGrid').css('width'))
}

