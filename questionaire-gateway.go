package main

import ( 
	"fmt"
	"os"
	"time"
	"encoding/json" 
	"log"
	"net/http" 
	"github.com/gorilla/websocket"
	"database/sql" 
	"github.com/lib/pq"
	_ "github.com/go-sql-driver/mysql"
	mo "github.com/AtegyekaRodgers/WebsocketMessageObject"
	"github.com/julienschmidt/httprouter" 
)

type adminClient struct {
	Websocket *websocket.Conn
	StartTime int64 `json:"starttime"` 
	StayDuration int64 `json:"stayduration"`  
} 

type respondent struct {
            Name string `json:"name"` 
            Gender string `json:"gender"` 
            Title string `json:"title"`
            Email string `json:"email"` 
        }
type respons struct {
            QuestionId string `json:"questionId"` 
            Answers []string `json:"answers"`
        }
type organization struct {
            Orgname string `json:"orgname"` 
            Ttype string `json:"ttype"` 
            About string `json:"about"` 
            Respondents []respondent `json:"respondents"`
            Responses []respons `json:"responses"`
          }


var chanoToAddNewClient = make(chan *adminClient) 
var chanoToDeleteClient = make(chan *adminClient) 
var chanoToTriggerReading = make(chan bool)

var upgrader = websocket.Upgrader{} //use default options 

type Wc struct {
	Websocket *websocket.Conn
}
/*
func dbconnect() *sql.DB {
	db, err := sql.Open("mysql","root:@tcp(127.0.0.1:3306)/research_questionaire_db")
	if err != nil {  fmt.Println("Failed to connect to the dabtabase"); fmt.Println(err.Error()) 
		return nil
	}
	fmt.Println("questionare gateway Connected to the dabtabase ");
	return db
}
*/
//For connecting to heroku postgres database, do the following:
func dbconnect() *sql.DB {
    url := os.Getenv("DATABASE_URL")
    connection, _ := pq.ParseURL(url)
    connection += " sslmode=require"

    db, err := sql.Open("postgres", connection)
    if err != nil {
        log.Println(err)
    } 
    return db
}

func createAppDB(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
    db := dbconnect()
	defer db.Close()
	createDbQuery := fmt.Sprintf("CREATE DATABASE questionaire_db")
    _, err := db.Exec(createDbQuery)
    if err != nil {  
	    fmt.Println(err.Error())
    }else{ 
        fmt.Println("Database: 'questionaire_db' created successfully.")
          
        StartTransactionQuery := fmt.Sprintf("START TRANSACTION")
        _, err = db.Exec(StartTransactionQuery)
        if err != nil {  
	        fmt.Println(err.Error())
        } 
        createTableQuery1 := fmt.Sprintf("CREATE TABLE IF NOT EXISTS organisations (orgID varchar(12) NOT NULL, orgname varchar(300) NOT NULL, orgType varchar(12) NOT NULL, about varchar(300) DEFAULT '', email varchar(60) DEFAULT '', phone varchar(20) DEFAULT '' )")  
        _, err = db.Exec(createTableQuery1)
        if err != nil {  
	        fmt.Println(err.Error())
        }else{
            fmt.Println("Table: 'organisations' created successfully.")
        } 
        createTableQuery2 := fmt.Sprintf("CREATE TABLE IF NOT EXISTS respondents (orgID varchar(12) NOT NULL, email varchar(60) DEFAULT '', phone varchar(20) DEFAULT '' )")  
        _, err = db.Exec(createTableQuery2)
        if err != nil {  
	        fmt.Println(err.Error())
        }else{
            fmt.Println("Table: 'respondents' created successfully.")
        } 
        createTableQuery3 := "CREATE TABLE IF NOT EXISTS responses ( count SERIAL NOT NULL UNIQUE, orgID varchar(12) NOT NULL UNIQUE, OrgResponseData TEXT )" 
        _, err = db.Exec(createTableQuery3)
        if err != nil {  
	        fmt.Println(err.Error())
        }else{
            fmt.Println("Table: 'responses' created successfully.")
        }  
        commitTransactionQuery := fmt.Sprintf("COMMIT")  
        _, err = db.Exec(commitTransactionQuery)
        if err != nil {  
	        fmt.Println(err.Error())
        }else{
            fmt.Println("Transaction commited successfully.")
            fmt.Println("................Done......................")
        } 
    } 
}

func insertSampleDataIntoDb(w http.ResponseWriter, r *http.Request, _ httprouter.Params){
    db := dbconnect()
	defer db.Close()
	insertQuery1 := fmt.Sprintf("INSERT INTO organisations"+
	"(orgID, orgname, orgType, about, email, phone) VALUES"+
    "('DN001', 'UNHCR', 'donor', 'The UN Refugee agancy', 'testorg001@yahoo.com', ''),"+
    "('DN002', 'UNDP', 'donor', 'For the development of the world economy', 'testorg002@gmail.com', ''),"+
    "('NG001', 'AIRD', 'ngo', 'For relief and development', 'testorg003@yahoo.com', ''),"+
    "('NG002', 'Window Trust', 'ngo', 'For education support', 'testorg004@hotmail.com', '')")
    _, err := db.Exec(insertQuery1)
    if err != nil {  
        fmt.Println(err.Error())
    }else{
        fmt.Println("Well inserted into Table: 'organisations'")
    }
    insertQuery2 := fmt.Sprintf("INSERT INTO `respondents` (`orgID`, `email`, `phone`) VALUES"+
    "('DN001', 'testperson003@yahoo.com', '+256706123303'),"+
    "('NG002', 'testperson004@gmail.com', '+256781224508'),"+
    "('DN001', 'testperson001@gmail.com', '+2567061233009'),"+
    "('NG002', 'testperson002@hotmail.com', ''),"+
    "('DN002', 'testperson005@gmail.com', '+2567061233030'),"+
    "('NG001', 'testperson006@hotmail.com', ''),"+
    "('DN002', 'testperson007@gmail.com', ''),"+
    "('NG001', 'testperson008@yahoo.com', '')")
    _, err = db.Exec(insertQuery2)
    if err != nil {  
        fmt.Println(err.Error())
    }else{
        fmt.Println("Well inserted into Table: 'respondents'")
    }
    insertQuery3 := fmt.Sprintf("INSERT INTO `responses` (`count`, `orgID`, `OrgResponseData`) VALUES"+
    "(1, '', '{\"orgname\":\"\",\"ttype\":\"donor\",\"about\":\"\",\"respondents\":[{\"name\":\"Ategyeka Rodgers\",\"gender\":\"Male\",\"title\":\"General manager\",\"email\":\"testperson003@yahoo.com\"},"+
    "{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson003@yahoo.com\"},{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson003@yahoo.com\"},"+
    "{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson003@yahoo.com\"},{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson003@yahoo.com\"},"+
    "{\"name\":\"Pires Robert\",\"gender\":\"Male\",\"title\":\"Footballer\",\"email\":\"testperson004@yahoo.com\"},{\"name\":\"Kabagambe Kened\",\"gender\":\"Male\",\"title\":\"Plumber\",\"email\":\"testperson005@gmail.com\"},"+
    "{\"name\":\"Kelen Jesca\",\"gender\":\"Female\",\"title\":\"Human resource manager\",\"email\":\"testperson008@yahoo.com\"},{\"name\":\"Mawanda Charles\",\"gender\":\"Male\",\"title\":\"Driver\",\"email\":\"testperson008@yahoo.com\"},"+
    "{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson008@yahoo.com\"},{\"name\":\"Kato samuel\",\"gender\":\"Male\",\"title\":\"Manager\",\"email\":\"testperson008@yahoo.com\"},"+
    "{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson004@yahoo.com\"},{\"name\":\"Jimy Piriyo\",\"gender\":\"Male\",\"title\":\"Data analyst\",\"email\":\"testing00021@yahoo.com\"}],\"responses\":[{\"questionId\":\"qn1\",\"answers\":[]},"+
    "{\"questionId\":\"qn1_a\",\"answers\":[\"Ategyeka Rodgers\"]},{\"questionId\":\"qn1_b\",\"answers\":[\"Male\"]},{\"questionId\":\"qn1_c\",\"answers\":[\"General manager\"]},{\"questionId\":\"qn2\",\"answers\":[]},"+
    "{\"questionId\":\"qn2_a\",\"answers\":[\"\"]},{\"questionId\":\"qn2_b\",\"answers\":[\"\"]},"+
    "{\"questionId\":\"qn2_c\",\"answers\":[\"\"]},{\"questionId\":\"qn3\",\"answers\":[\"\"]},{\"questionId\":\"qn4\",\"answers\":[\"\"]},{\"questionId\":\"qn5\",\"answers\":[\"\",\"\"]},{\"questionId\":\"qn6\",\"answers\":[\"\",\"\",\"\",\"\",\"\"]},"+
    "{\"questionId\":\"qn7\",\"answers\":[\"\"]},{\"questionId\":\"qn8\",\"answers\":[\"\"]},"+
    "{\"questionId\":\"qn9\",\"answers\":[\"\"]},{\"questionId\":\"qn10\",\"answers\":[\"\"]},{\"questionId\":\"qn11\",\"answers\":[]},{\"questionId\":\"qn12\",\"answers\":[]},{\"questionId\":\"qn13\",\"answers\":[]},{\"questionId\":\"qn14\",\"answers\":[]},"+
    "{\"questionId\":\"qn15\",\"answers\":[]},{\"questionId\":\"qn16\",\"answers\":[]},"+
    "{\"questionId\":\"qn17\",\"answers\":[\"\",\"\",\"\"]}]}'), "+
    "(2, 'NG001', '{\"orgname\":\"AIRD\",\"ttype\":\"donor\",\"about\":\"For relief and development\",\"respondents\":[{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson008@yahoo.com\"},"+
    "{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson008@yahoo.com\"},"+
    "{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson008@yahoo.com\"},"+
    "{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson008@yahoo.com\"},{\"name\":\"\",\"gender\":\"\",\"title\":\"\",\"email\":\"testperson008@yahoo.com\"}],\"responses\":[{\"questionId\":\"qn1\",\"answers\":[]},"+
    "{\"questionId\":\"qn1_a\",\"answers\":[\"\"]},"+
    "{\"questionId\":\"qn1_b\",\"answers\":[\"\"]},{\"questionId\":\"qn1_c\",\"answers\":[\"\"]},"+
    "{\"questionId\":\"qn2\",\"answers\":[]},{\"questionId\":\"qn2_a\",\"answers\":[\"\"]},{\"questionId\":\"qn2_b\",\"answers\":[\"\"]},{\"questionId\":\"qn2_c\",\"answers\":[\"\"]},{\"questionId\":\"qn3\",\"answers\":[\"\"]},"+
    "{\"questionId\":\"qn4\",\"answers\":[\"\"]},"+
    "{\"questionId\":\"qn5\",\"answers\":[\"\",\"\"]},{\"questionId\":\"qn6\",\"answers\":[\"\",\"\",\"\",\"\",\"\"]},"+
    "{\"questionId\":\"qn7\",\"answers\":[\"\"]},{\"questionId\":\"qn8\",\"answers\":[\"\"]},{\"questionId\":\"qn9\",\"answers\":[\"\"]},{\"questionId\":\"qn10\",\"answers\":[\"\"]},{\"questionId\":\"qn11\",\"answers\":[]},"+
    "{\"questionId\":\"qn12\",\"answers\":[]},{\"questionId\":\"qn13\",\"answers\":[]},"+
    "{\"questionId\":\"qn14\",\"answers\":[]},{\"questionId\":\"qn15\",\"answers\":[]},"+
    "{\"questionId\":\"qn16\",\"answers\":[]},{\"questionId\":\"qn17\",\"answers\":[\"\",\"\",\"\"]}]}')")
    _, err = db.Exec(insertQuery3)
    if err != nil {  
        fmt.Println(err.Error())
    }else{
        fmt.Println("Well inserted into Table: 'responses'")
     }
}

func startSessionFor(thisClient *adminClient) {
	chanoToAddNewClient <- thisClient
}
 type msg struct {
                Status string `json:"status"`
                Errror string `json:"errror"` 
            } 
//-------------------------------------
 func retreiveSendersOrg(email string) string {
    db := dbconnect()
	defer db.Close()
    selecQuery := fmt.Sprintf("SELECT orgID FROM respondents WHERE email='%s' LIMIT 1",email)
    queryResult, err := db.Query(selecQuery)
    if err != nil {  
	    fmt.Println(err.Error())
    }  
    defer queryResult.Close()
    notFound := true
    var orgID string
    for queryResult.Next(){ 
		_ = queryResult.Scan(&orgID)
		notFound = false
		break
    }
    if notFound {
        selecQuery = fmt.Sprintf("SELECT orgID FROM organisations WHERE email='%s' LIMIT 1",email)
        queryResult, err = db.Query(selecQuery)
        if err != nil {  
	        fmt.Println(err.Error())
        } 
        for queryResult.Next(){ 
		    _ = queryResult.Scan(&orgID)
		    notFound = false
		    break
        } 
    }
    fmt.Println("retreiveSendersOrg: used email=",email,", returning ",orgID)
    return orgID
 }
 //-------------------------------------
 func retreiveSendersOrgName(orgID string) (string, string) {
    db := dbconnect()
	defer db.Close()
    selecQuery := fmt.Sprintf("SELECT orgname, about FROM organisations WHERE orgID='%s' LIMIT 1",orgID)
    queryResult, err := db.Query(selecQuery)
    if err != nil {  
	    fmt.Println(err.Error())
    }  
    defer queryResult.Close()
    var orgname string
    var aboutorg string
    for queryResult.Next(){ 
		_ = queryResult.Scan(&orgname, &aboutorg)
		break
    }
    return orgname, aboutorg
 } 
 //---------------------
  func retreiveOrgResponses(orgID string) string {
    db := dbconnect()
	defer db.Close()
    selecQuery := fmt.Sprintf("SELECT OrgResponseData FROM responses WHERE orgID='%s' LIMIT 1",orgID)
    queryResult, err := db.Query(selecQuery)
    if err != nil {  
	    fmt.Println(err.Error())
    }  
    defer queryResult.Close()
    var OrgResponseData string
    OrgResponseData = ""
    for queryResult.Next(){ 
		_ = queryResult.Scan(&OrgResponseData)
		break
    } 
    return OrgResponseData;
 }
 //---------------------
 func retreiveAllResponses() *sql.Rows {
    db := dbconnect()
	defer db.Close()
    //retrieve all responses. 
    selecQuery := fmt.Sprintf("SELECT OrgResponseData FROM responses WHERE 1 ORDER BY count DESC")
    queryResult, err := db.Query(selecQuery)
    if err != nil {  
	    fmt.Println(err.Error())
    }  
    defer queryResult.Close()
    
    return queryResult;
 }
 //---------------------
 func insertOrgResponse(orgID string, data string){
    db := dbconnect()
	defer db.Close()
    insertQuery := fmt.Sprintf("INSERT INTO responses SET orgID='%s', OrgResponseData='%s'", orgID, data)
    _, err := db.Exec(insertQuery)
    if err != nil {  
	    fmt.Println(err.Error())
    }   
 }
 //---------------------
 func updateOrgResponse(orgID string, data string){
    db := dbconnect()
	defer db.Close()
    insertQuery := fmt.Sprintf("UPDATE responses SET OrgResponseData='%s' WHERE orgID='%s'", data, orgID)
    _, err := db.Exec(insertQuery)
    if err != nil {  
	    fmt.Println(err.Error())
    }   
 }
 //---------------------
 
 func sendResponsesToAdmin(queryResult *sql.Rows, wscon *websocket.Conn) {
    wmo := mo.NewWMO() 
    fmt.Println("queryResult.Next():")
    noResponsesYet := true
    statuss := "noResponseYet"
    for queryResult.Next(){
        //stream each response to the client
        fmt.Println(" --> queryResult.Next loop")
        var OrgResponseData string  
		_ = queryResult.Scan(&OrgResponseData) 
		fmt.Println(" --> OrgResponseData = ",OrgResponseData)
		statuss = "OK"
        errror := "! Some error ocured while retreiving a response from this organization. "
        m := &msg{Status:statuss, Errror:errror}
	    mjson, _ := json.Marshal(m)
	    wmo.AddJson(mjson)
        wmo.AddString("jsonstring", OrgResponseData)
        wmo.Encode()
		//send to client
		fmt.Println(" --> wscon.WriteMessage(2, wmo.BinaryData) ")
		err := wscon.WriteMessage(2, wmo.BinaryData) //responding to the web client. 
        if err != nil {
            log.Println("response Error:", err)
        }
        noResponsesYet = false
    }
    if noResponsesYet {
        errror := "There are no responses received yet. "
        m := &msg{Status:statuss, Errror:errror}
        mjson, _ := json.Marshal(m)
        wmo.AddJson(mjson) 
        wmo.Encode()
        err := wscon.WriteMessage(2, wmo.BinaryData) //responding to the web client. 
        if err != nil {
            log.Println("response Error:", err)
        }
    }
    fmt.Println(" --> done ")
 }

//----------------------------------------------------------------------------
func adminConnectHandler(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true; }
	webclient, _ := upgrader.Upgrade(w, r, nil) 
	//defer webclient.Close()
	fmt.Println("> New websocket connection (admin).")
	thisClient := &adminClient{ Websocket: webclient }
	fmt.Println("> startSessionFor(thisClient).")
	startSessionFor(thisClient)
	fmt.Println("> sqlResult := retreiveAllResponses().")
	sqlResult := retreiveAllResponses()
	fmt.Println("> sendResponsesToAdmin(sqlResult, webclient).")
	sendResponsesToAdmin(sqlResult, webclient)
} 

//----------------------------------------------------------------------------
func respondentConnectHandler(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	fmt.Println("handler : respondentConnectHandler")
	upgrader.CheckOrigin = func(r *http.Request) bool { return true; }
	webclient, _ := upgrader.Upgrade(w, r, nil) 
	defer webclient.Close()
	fmt.Println("> New websocket connection (respondent).")
 
	for {  
		log.Println("=========================================")
		log.Println("Waiting for data from websocket client ...")
		datatype, dataFromClient, err := webclient.ReadMessage() 
		fmt.Println("datatype ======= ", datatype)
		if err != nil {
			log.Println("!! Error:", err) 
		}else if len(dataFromClient)>=31 {
		    type respons struct {
	            QuestionId string `json"questionId"`
	            Answers []string `json"answers"`
		    }
		    wmo := mo.NewWMO() 
		    jsonMessageFromClient := wmo.DecodeJson(dataFromClient)
		    var responsesFromClient organization
		    json.Unmarshal([]byte(jsonMessageFromClient), &responsesFromClient)
		    //email := respondentEmail
	        email := responsesFromClient.Respondents[0].Email
            //look in the database for the organisation of that email holder
            orgId := retreiveSendersOrg(email)
            //retreive the json string message submited from the identified organisation so far.
            OrgRespData := retreiveOrgResponses(orgId)
	        if OrgRespData != "" {
	            //convert the json string to json
	            var responsesFromDb organization
	            json.Unmarshal([]byte(OrgRespData), &responsesFromDb)
	            responsesFromDb.Respondents = append(responsesFromDb.Respondents, responsesFromClient.Respondents[0]) //pushing to respondents
	            responsesFromDb.Ttype = responsesFromClient.Ttype //ngo, donor, regulator, ...
	            // find all fields that are still empty and look in the new message from client if they have been answered -
	            //responsesFromDb == responsesFromClient comparision:
	            // pick the values of the new answers and populate the empty fields. 
	            for i, resp := range responsesFromDb.Responses {
	                if len(resp.Answers) == 0 {
	                    responsesFromDb.Responses[i].Answers = responsesFromClient.Responses[i].Answers
	                }else{
	                    for ii, ans := range resp.Answers {
	                        if ans=="" {
	                            responsesFromDb.Responses[i].Answers[ii] = ans
	                        } 
	                    }
	                }
	            } 
		        //save to database: convert the updated message back to string format (json string)
	            respsjsonInBytes, _ := json.Marshal(responsesFromDb)
	            newJsonStr := string(respsjsonInBytes)
	            //save the updated version of the message from this organisation by updating the one existing in the database
	            updateOrgResponse(orgId, newJsonStr)
	            //give a feedback msg to client
	            type FeedBackMessage struct { 
                    Submitedstatus string `json:"submitedstatus"`
                    Submitedsuccessmsg string `json:"submitedsuccessmsg"`
                    Submitdescrition string `json:"submitdescrition"` 
                }
                m := &FeedBackMessage{Submitedstatus:"ok", Submitedsuccessmsg:"Response submitted successfully. ", 
                        Submitdescrition:"Your response has been merged with other responses from your organisation/agency."}
				mjson, _ := json.Marshal(m)
				wmo.AddJson(mjson)
				wmo.Encode()
				err = webclient.WriteMessage(datatype, wmo.BinaryData) //responding to the web client.
	        }else{
	            //retreive org name & about using sender orgId, 
	            orgnm, aboutOrg := retreiveSendersOrgName(orgId)
	            //attach to the response
	            responsesFromClient.Orgname = orgnm
	            responsesFromClient.About = aboutOrg
	            respsjsonInBytes, _ := json.Marshal(responsesFromClient)
	            newJsonStr := string(respsjsonInBytes)
	            insertOrgResponse(orgId, newJsonStr)
	            //give a feedback msg to client
	            type FeedBackMessage struct {
                    Submitedstatus string `json:"submitedstatus"`
                    Submitedsuccessmsg string `json:"submitedsuccessmsg"`
                    Submitdescrition string `json:"submitdescrition"` 
                }
                m := &FeedBackMessage{Submitedstatus:"ok", Submitedsuccessmsg:"Response submitted successfully. ",
                Submitdescrition:"Other later responses from your organisation/agency will be merged with yours. "}
				mjson, _ := json.Marshal(m)
				wmo.AddJson(mjson)
				wmo.Encode()
				err = webclient.WriteMessage(datatype, wmo.BinaryData) //responding to the web client.
	        }
		    //check channel of administrators; if any is available, retreive from database and push to all the connected admins.            
		    chanoToTriggerReading <- true
		    //send feedback/success message to client
		    /*
		    statuss := "OK"
            feedbackmsg := "Thank you so much for your response, we have received the information successfully."
            errror := "Temporary system failure! Please click the 'submit now' button again. Thank you."
		    type Message struct {
                Submitstatus string `json:"submitstatus"`
                Submitsuccessmsg string `json:"submitsuccessmsg"`
                Submiterrormsg string `json:"submiterrormsg"`
            } 
            m := &Message{Submitstatus:statuss, Submitsuccessmsg:feedbackmsg, Submiterrormsg:errror}
		    mjson, _ := json.Marshal(m)
		    wmo.AddJson(mjson)
		    wmo.Encode()
		    err = webclient.WriteMessage(datatype, wmo.BinaryData) //responding to the web client. 
		    if err != nil {
			    log.Println("response Error:", err)  
			    break
		    }
		    */
		    log.Println("len(wmo.BinaryData) = ", len(wmo.BinaryData))
		}  
	} //loop back: end of for loop.
} 
   
//---------------------------------
 func sessionManagerStart(){
	log.Println("The sessionManagerStart go routine is running ... ")
	  var clients = make(map[*adminClient]bool)
	  // keep reading a channel for newly connected clients 
	  for { 
		  select {
			case adminClient := <-chanoToAddNewClient:  //is there a newly connected client? skip if not - (non blocking)
				//read current timestamp and attach to adminClient as start time
				adminClient.StartTime = time.Now().Unix() 
				adminClient.StayDuration = (time.Now().Unix())+(1*60*60)  //maximum active session time is 1 hr
				clients[adminClient] = true
			case clientToDelete := <-chanoToDeleteClient:
			      if clients[clientToDelete]==true {
				      delete(clients, clientToDelete)   
			      }
			case should_do := <-chanoToTriggerReading:
			      if should_do { 
				      sqlResult := retreiveAllResponses()
				      //broadcast the new state of responses to all admin clients
				      for client := range clients {
			             sendResponsesToAdmin(sqlResult, client.Websocket)
		              }
			      }
		  }//end of select
		  
		  // if any client's session duration elapsed, delete from clients map
		  currentTimeStamp := time.Now().Unix()
		  for client := range clients { 
			  if currentTimeStamp >= (client.StartTime+client.StayDuration) { 
				  if clients[client]==true {
					  delete(clients, client)   
				  }
			  }
		  }
		   
	}//end of loop: loop back    
}
 
//======================================== server end ===================================
 




