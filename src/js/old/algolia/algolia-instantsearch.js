$(() => {
    const searchClient = algoliasearch('EZQCIMR39C', 'f732355d64b2c1994d710a96b48dcd5f');

    const search = instantsearch({
        indexName: 'musicas',
        searchClient,
    });

    search.addWidgets([
        instantsearch.widgets.searchBox({
            container: '#searchbox',
        }),

        instantsearch.widgets.hits({
            container: '#hits',
            templates: {
                item: `
              <div>
                <div class="hit-name">
                  {{#helpers.highlight}}{ "attribute": "nome" }{{/helpers.highlight}}
                </div>
                <div class="hit-description">
                  {{#helpers.highlight}}{ "attribute": "apresentacao" }{{/helpers.highlight}}
                </div>
              </div>
            `,
            },
        })
    ]);

    search.start();

})

