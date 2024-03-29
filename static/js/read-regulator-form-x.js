var organization = {
            orgname:"",
            ttype:"regulator",
            about:"",
            respondents:[{name:"",gender:"",title:"",email:""}],
            responses:[]
          }

var responses = [];
function submitRegulatorForm(){
    let urlProtoco = urlProtocol || window.location.protocol; 
    console.log("urlProtoco: urlProtocol="+urlProtocol+", window.location.protocol="+window.location.protocol); 
    let wsProtoco = urlProtoco=="https:"?"wss":"ws";
    let urlhostt = urlHost || "0.0.0.0";
    let portxx = urlParams.pt || 9910;
    let serverEndPoint = wsProtoco+"://"+urlhostt+":"+portxx+"/submit/newcon";
    console.log("serverEndPoint = "+serverEndPoint);
    document.querySelector('#formfeedback-box').style.display = 'block';
    //console.log(JSON.stringify(organization));
    // create wmo
    let wmo = new WebsocketMessageObject("wmo"); 
    //add json: organization 
    wmo.AddJson(organization);
    wmo.AddString("stringspadding","left"); 
     function validateLoginForm(){
        //---
        return true;
     }
	 let wellValidated = validateLoginForm(); 
	 if(wellValidated){ 
        ws = new ReconnectingWebSocket( serverEndPoint );
        //ws = new WebSocket( serverEndPoint );
        ws.onopen = function(evt) {
            console.log("websocket connection OPEN");
			ws.binaryType = "arraybuffer"; 
			wmo.Encode();
			//send the object 
			ws.send(wmo.BinaryData);
        }
        ws.onclose = function(event) {
            this.ws = new WebSocket(ws.url); 
			//ws = new WebSocket( serverEndPoint );
			var reason;
            alert(event.code);
            if (event.code == 1000)
                reason = "Normal closure, meaning that the purpose for which the connection was established has been fulfilled.";
            else if(event.code == 1001)
                reason = "An endpoint is \"going away\", such as a server going down or a browser having navigated away from a page.";
            else if(event.code == 1002)
                reason = "An endpoint is terminating the connection due to a protocol error";
            else if(event.code == 1003)
                reason = "An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).";
            else if(event.code == 1004)
                reason = "Reserved. The specific meaning might be defined in the future.";
            else if(event.code == 1005)
                reason = "No status code was actually present.";
            else if(event.code == 1006)
               reason = "The connection was closed abnormally, e.g., without sending or receiving a Close control frame";
            else if(event.code == 1007)
                reason = "An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [http://tools.ietf.org/html/rfc3629] data within a text message).";
            else if(event.code == 1008)
                reason = "An endpoint is terminating the connection because it has received a message that \"violates its policy\". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.";
            else if(event.code == 1009)
               reason = "An endpoint is terminating the connection because it has received a message that is too big for it to process.";
            else if(event.code == 1010) // Note that this status code is not used by the server, because it can fail the WebSocket handshake instead.
                reason = "An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake. <br /> Specifically, the extensions that are needed are: " + event.reason;
            else if(event.code == 1011)
                reason = "A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.";
            else if(event.code == 1015)
                reason = "The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).";
            else
                reason = "Connection closed: the cause is not know yet.";
			let msghtml = '<img src="/static/images/ic_error_outline_black_24dp.png" width="30px" />\
                            <h4>'+reason+'<br/><br/>';
            document.querySelector('#formfeedback-box').innerHTML = msghtml;
            console.log("CLOSED connection. Reason: "+reason);
        }
        ws.onmessage = function(evt) {
            console.log("RESPONSE: " + evt.data);
            var feedbackMsg = wmo.DecodeJson(evt.data);
            //display the feedback message especially the success message for the cliet to know their response is well submited.
            if(feedbackMsg.submitedstatus == "ok"){
                let msghtml = '<h4>'+feedbackMsg.submitedsuccessmsg+'\
                                <img src="/static/images/ic_done_black_36dp.png" width="30px" /></h4>\
                                '+feedbackMsg.submitdescrition+'<br/><br/>';
                document.querySelector('#formfeedback-box').innerHTML = msghtml;
            }else{
                let msghtml = '<img src="/static/images/ic_error_outline_black_24dp.png" width="30px" />\
                                <h4>'+"!! Error occured."+'</h4>\
                                <small>'+"Please check your internet connectivity and try send again. Returned:"+evt.data+'</small>';
                document.querySelector('#formfeedback-box').innerHTML = msghtml;
            } 
        }
        ws.onerror = function(evt) {
            console.log("ERROR: " + evt);
            let msghtml = '<img src="/static/images/ic_error_outline_black_24dp.png" width="30px" />\
                            <h4>'+"!! Error occured:"+evt+'</h4>\
                            <small>'+"Please check your internet connectivity and try send again."+'</small>';
            document.querySelector('#formfeedback-box').innerHTML = msghtml;
        }  
	}
}
function readRegulatorForm(){
    //read question 1
    var respondentname = document.querySelector("#respondentname").value;
    var respondentgender = document.querySelector("#respondentgender").value;
    var respondenttitle = document.querySelector("#respondenttitle").value;
    var emailBox = document.querySelector("#hidden-email-box");
    var respondentem = emailBox != null ? emailBox.value : ''; 
    var respondentemail = respondentem || urlParams.em; 
    var qn1 = {questionId:"qn1",answers:[]};
    var qn1a = {questionId:"qn1_a",answers:[respondentname]};
    var qn1b = {questionId:"qn1_b",answers:[respondentgender]};
    var qn1c = {questionId:"qn1_c",answers:[respondenttitle]};
    responses.push(qn1);
    responses.push(qn1a);
    responses.push(qn1b);
    responses.push(qn1c);
    organization.respondents[0].name = respondentname;
    organization.respondents[0].gender = respondentgender;
    organization.respondents[0].title = respondenttitle;
    organization.respondents[0].email = respondentemail;
    console.log("organization.respondents[0].email = "+organization.respondents[0].email);
    
    //read question 2 
    var physicalAddr = document.querySelector("#physicalAddr").value;
    var District = document.querySelector("#District").value;
    var checkedRadio = document.querySelector('input[name="permit"]:checked');
    var permit = checkedRadio != null ? checkedRadio.value : '';
    var permitNo = null;
    if(permit=="Permit No"){ 
        permitNo = document.querySelector('#org-permit-number').value; 
    }else{ 
        permitNo=permit; 
    } 
    var qn2 = {questionId:"qn2",answers:[]};
    var qn2a = {questionId:"qn2_a",answers:[physicalAddr]};
    var qn2b = {questionId:"qn2_b",answers:[District]};
    var qn2c = {questionId:"qn2_c",answers:[permitNo]};
    responses.push(qn2);
    responses.push(qn2a);
    responses.push(qn2b);
    responses.push(qn2c); 
    
    //read question 3 
    var checkedRadio2 = document.querySelector('input[name="op-time"]:checked');
    var optime = checkedRadio2 != null ? checkedRadio2.value : ''; 
    var qn3 = {questionId:"qn3",answers:[optime]};
    responses.push(qn3); 
    
    //read question 4
    var numberOfEmployees = document.querySelector('#number-of-employees').value;
    var qn4 = {questionId:"qn4",answers:[numberOfEmployees]};
    responses.push(qn4); 
     
    //read question 5
    var checkedRadio3 = document.querySelector('input[name="consultations"]:checked');
    var consultations = checkedRadio3 != null ? checkedRadio3.value : ''; 
    var qn5 = {questionId:"qn5",answers:[consultations]};
    responses.push(qn5); 
    
    //read question 6 
    var public_access_checkboxes = document.querySelectorAll('input[name="pubic-access"]');
    var checkboxvalues3 = [];
    public_access_checkboxes.forEach(function(checkbox){
        if(checkbox.checked){ var boxvalue = checkbox.value; checkboxvalues3.push(boxvalue); }
    }); 
    var qn6 = {questionId:"qn6", answers:[]}; 
    var public_access_other_checkbox = document.querySelector('input[name="pubic-access-other"]'); 
    qn6 = {questionId:"qn6", answers:checkboxvalues3};
    if(public_access_other_checkbox.checked){
        var moreOption = document.querySelector('#other-pubic-access').value;
        qn6.answers.push(moreOption);
    }
    responses.push(qn6); 
    
    //read question 7
    var checkedRadio4 = document.querySelector('input[name="rating"]:checked');
    var rating = checkedRadio4 != null ? checkedRadio4.value : '';
    var qn7 = {questionId:"qn7",answers:[rating]};
    responses.push(qn7); 
    
    //read question 8
    var checkedRadio5 = document.querySelector('input[name="fair-req"]:checked');
    var fair_req = checkedRadio5 != null ? checkedRadio5.value : ''; 
    var qn8 = {questionId:"qn8",answers:[fair_req]};
    responses.push(qn8); 
    
    //read question 9 
    var suggest_checkboxes = document.querySelectorAll('input[name="suggest"]');
    var checkboxvalues2 = [];
    suggest_checkboxes.forEach(function(checkbox){
        if(checkbox.checked){ var boxvalue = checkbox.value; checkboxvalues2.push(boxvalue); }
    }); 
    var qn9 = {questionId:"qn9", answers:[]}; 
    var suggest_other_checkbox = document.querySelector('input[name="suggest-other"]'); 
    qn9 = {questionId:"qn9", answers:checkboxvalues2};
    if(suggest_other_checkbox.checked){
        var moreOption = document.querySelector('#other-motivations').value;
        qn9.answers.push(moreOption);
    }
    responses.push(qn9);
     
    organization.responses = responses;
    
    submitRegulatorForm();
} 




