package widgetsrv

import (
    "appengine"
    "appengine/urlfetch"
    "fmt"
    "http"
    "template"
)

func init() {
    http.HandleFunc("/", index)
    http.HandleFunc("/url", getURL)
    http.HandleFunc("/template", srvTemplate)
}

type Page struct {
    Title   string
    Body    []byte
}

func index(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, startPage)
}

func srvTemplate(w http.ResponseWriter, r *http.Request) {
    title := "Widgetproxy"
    filename := "templates/index.html"
    p := &Page{Title: title}
    t, _ := template.ParseFile(filename)
    t.Execute(w, p)
}

func getURL(w http.ResponseWriter, r *http.Request) {
    c := appengine.NewContext(r)
    client := urlfetch.Client(c)
    resp, err := client.Get("http://www.torlaune.de/")
    if err != nil {
        http.Error(w, err.String(), http.StatusInternalServerError)
        return
    }

    contentlen := resp.ContentLength
    buffer := make([]byte, contentlen)
    resp.Body.Read(buffer)
    w.Header().Set("Content-Length", fmt.Sprint(contentlen))
    w.Header().Set("Content-Type", resp.Header.Get("Content-Type"))
    w.Write(buffer)
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