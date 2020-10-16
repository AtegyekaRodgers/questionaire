package main

//go:generate rice embed-go

import (
	"flag"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings" 
	rice "github.com/GeertJohan/go.rice"
	"github.com/julienschmidt/httprouter"
)

func readEndPoint() (string, string) {
    ip_addr := "localhost"
    portx := os.Getenv("PORT") 
    return ip_addr, portx
} 

// Model of stuff to render a page
type Model struct {
	Name  string
	Title string
	Email  string
	ServerPort string
	ServerAddress string
}

// Templates with functions available to them
var (
	templateMap = template.FuncMap{
		"Upper": func(s string) string {
			return strings.ToUpper(s)
		},
	}
	templates   = template.New("").Funcs(templateMap)
	templateBox *rice.Box
)

func newTemplate(path string, fileInfo os.FileInfo, _ error) error {
	if path == "" {
		return nil
	}
	/*
	 * takeRelativeTo function will take the absolute path 'path' which is by default passed to 
	 * our 'newTemplate' by Walk function, and will eliminate the intial part of the path up to the end of the
	 * specified directory 'afterDir' ('templates' in this case). Then it will return the rest starting from 
	 * the very end of afterDir. If the specified afterDir has more than 1 occurances in the path, 
	 * only the first occurance will be considered and the other occurances will be ignored.     
	 * eg, If path = "/home/Projects/go/website/templates/html/index.html", then
	 * relativPath := takeRelativeTo(path, "templates") returns "/html/index.html" ; 
	 * If path = "/home/Projects/go/website/templates/testing.html", then ;
	 * relativPath := takeRelativeTo(path, "templates") returns "/testing.html" ;
	 * If path = "/home/Projects/go/website/templates/html/templates/components/footer.html", then
	 * relativPath := takeRelativeTo(path, "templates") returns "/html/templates/components/footer.html" .
	 */
	takeRelativeTo := func(givenpath string, afterDir string) string {
	    if strings.Contains(givenpath, afterDir+string(filepath.Separator)) { 
	        wantedpart := strings.SplitAfter(givenpath, afterDir)[1:]
	        return filepath.Join(wantedpart...)
	    }
	    return givenpath
	}
	//if path is a directory, skip Parsing template. Trying to Parse a template from a directory caused an error, now fixed.
	if !fileInfo.IsDir() {
	//get relative path starting from 'templates' . ie, templates/next-one/.../template-file.html 
	relativPath := takeRelativeTo(path, "templates")
	templateString, err := templateBox.String(relativPath)
	if err != nil {
		log.Panicf("Unable to extract: path=%s, err=%s", relativPath, err)
	}
	if _, err = templates.New(filepath.Join("templates", relativPath)).Parse(templateString); err != nil {
		log.Panicf("Unable to parse: path=%s, err=%s", relativPath, err)
	}
	}
	return nil
}

// Render a template given a model
func renderTemplate(w http.ResponseWriter, tmpl string, p interface{}) {
	err := templates.ExecuteTemplate(w, tmpl, p)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func broken(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	addres, portx := readEndPoint()
	model := Model{ServerPort:portx, ServerAddress:addres}
	renderTemplate(w, "templates/missing.html", &model)
}

func reading(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	addres, portx := readEndPoint()
	model := Model{ServerPort:portx, ServerAddress:addres} 
	renderTemplate(w, "templates/responses.html", &model)
}
 
func index(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	email := r.URL.Query().Get("em")
	if email=="" {
	    email = ps.ByName("email")
	}
	fmt.Println("email = ", email)
	addres, portx := readEndPoint()
	model := Model{Email: email, ServerPort:portx, ServerAddress:addres} 
	renderTemplate(w, "templates/index.html", &model)
}

func getRouter() *httprouter.Router {
	// Load and parse templates (from binary or disk)
	templateBox = rice.MustFindBox("templates")
	templateBox.Walk("", newTemplate)

	// mux handler
	router := httprouter.New() 

	// Example route that encounters an error
	router.GET("/broken/handler", broken)
	
	// Index route 
	router.GET("/", index)
	router.GET("/read/all", reading)
	router.GET("/submit/newcon", respondentConnectHandler) 
	router.GET("/read/newcon", adminConnectHandler)
	
	 
	// Serve static assets via the "static" directory
	fs := rice.MustFindBox("static").HTTPBox()
	router.ServeFiles("/static/*filepath", fs)
	return router
}

func main() { 
    //++++| os.Args |+++++ 
    _, portx := readEndPoint()
    wsEndPoint := fmt.Sprintf("0.0.0.0:%s", portx) 
    addr := flag.String("addr", wsEndPoint, "websocket API gateway service address") 
    flag.Parse()
    //++++++++++++++++++++
	 
	fmt.Println("Websocket API gateway server listening on port: "+(strings.Split(wsEndPoint,":")[1])) 
	go sessionManagerStart() 
	log.Fatal(http.ListenAndServe(*addr, getRouter()))
}






