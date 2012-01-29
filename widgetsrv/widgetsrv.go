package widgetsrv

import (
    "fmt"
    "http"
)

func init() {
    http.HandleFunc("/", index)
}

func index(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, startPage)
}

const startPage = `
<html>
  <head>
    <title>Widgetproxy</title>
  </head>
  <body>
    <h1>Widgetproxy</h1>
  </body>
</html>
`