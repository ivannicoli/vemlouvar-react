var musicasGrid = []

$(() => {
    createJsGrid();
});

async function createJsGrid() {

    while (arrMomentos.length <= 0) {
        await sleep(1000);
    }

    generateJsGridHtml()

    while (typeof lastMissa === 'undefined') {
        await sleep(1000);
    }

    carregarLastMissa()
}

async function carregarLastMissa() {

    const promises = lastMissa.musicas.map(async momentoMusica => {
        let _ref = momentoMusica.musica.path
        musicaDoc = await firebase.firestore().collections("musicas").get("" + momentoMusica.musica);
        momentoMusica.musica = musicaDoc.data()
        if (typeof momentoMusica.musica === 'undefined') {
            momentoMusica.musica = {
                nome: "***ERRO: A música " + _ref + " não foi encontrada",
            }
        }
        momentoMusica.musica.momento = momentoMusica.momento;
        musicasGrid.push(momentoMusica.musica)
    })
    await Promise.all(promises);
    updateMusicasGrid();
    
    $("#jsGrid .jsgrid-grid-body tbody").sortable();
    $("#jsGrid .jsgrid-grid-body tbody").disableSelection();
}

function updateMusicasGrid() {
    musicasGrid.forEach((musicaGrid, i) => {
        musicaGrid.posicao = i
    });
    $("#jsGrid").jsGrid("option", "data", musicasGrid)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createMomentoAutoCompleteField() {
    var momentoField = function (config) {
        jsGrid.Field.call(this, config);
    };
    momentoField.prototype = new jsGrid.Field({
        sorter: function (momento1, momento2) {
            return momento1.localeCompare(momento2);
        },
        itemTemplate: function (value) {
            return value;
        },
        insertTemplate: function (value) {
            return this._insertAuto = $("<input>").autocomplete({ source: arrMomentos });
        },
        editTemplate: function (value) {
            return this._editAuto = $("<input>").autocomplete({ source: arrMomentos }).val(value);
        },
        insertValue: function () {
            return this._insertAuto.val();
        },
        editValue: function () {
            return this._editAuto.val();
        }
    });
    jsGrid.fields.momentoField = momentoField;    
}

function generateJsGridHtml() {
    createMomentoAutoCompleteField()

    $("#jsGrid").jsGrid({
        width: "100%",
        autoload: true,
        rowClass: function(item, itemIndex) {
            return "client-" + itemIndex;
        },
        inserting: false,
        editing: false,
        sorting: false,
        paging: false,
        data: musicasGrid,
        fields: [
            { name: "posicao", type: "text", title: "Posição", width: 10 },
            { name: "momento", type: "momentoField", title: "Momento" },
            { name: "nome", type: "text", width: 150, validate: "required", title: "Nome", editing: false },
            { type: "control" }
        ],
        onRefreshed: function() {
            var $gridData = $("#jsGrid .jsgrid-grid-body tbody");
 
            $gridData.sortable({
                update: function(e, ui) {
                    // array of indexes
                    var clientIndexRegExp = /\s*client-(\d+)\s*/;
                    var indexes = $.map($gridData.sortable("toArray", { attribute: "class" }), function(classes) {
                        return clientIndexRegExp.exec(classes)[1];
                    });
                    alert("Reordered indexes: " + indexes.join(", "));
 
                    // arrays of items
                    var items = $.map($gridData.find("tr"), function(row) {
                        return $(row).data("JSGridItem");
                    });
                    console && console.log("Reordered items", items);
                }
            });
        }
    })
}
