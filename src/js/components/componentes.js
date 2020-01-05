import React from 'react';

export function ImportsVemLouvar(props) {
  return (
    <>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
      <link rel="stylesheet" href="./styles.css" />

      <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
      <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js"></script>
      <link href="https://code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css" />

      <script src="./js/algolia/algoliasearchLite.js"></script>
      <script src="./js/algolia/autocomplete.js"></script>
      <script src="./js/algolia/algolia.js"></script>
      <link href="./js/algolia/algolia.css" />

      <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.css" />
      <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid-theme.min.css" />
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.js"></script>
      <script src="./js/jsgrid/jsgrid.js"></script>

      <script src="https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/7.5.0/firebase-firestore.js"></script>

      <script src="./js/window.js" charset="utf-8"></script>
    </>
  )
}

export function Label(props) {
  return (
    <div>
      <h10 class="hash-heading">{props.children}</h10>
    </div>
  )
}

export function Texto(props) {
  return (
    <select id="musicas" class="form-control text-input">
    </select>
  )
}

export function Row(props) {
  return (
    <div class="row">
      {props.children}
    </div>
  )
}

export function Collumn(props) {
  return (
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      {props.children}
    </div>
  )
}