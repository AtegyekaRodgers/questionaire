var organization = {
            orgname:"",
            ttype:"donor",
            about:"",
            respondents:[{name:"",gender:"",title:"",email:""}],
            responses:[]
          }

var responses = [];
function submitDonorForm(){
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
        //ws = new ReconnectingWebSocket( serverEndPoint );
        ws = new WebSocket( serverEndPoint );
        ws.onopen = function(evt) {
            console.log("websocket connection OPEN");
			ws.binaryType = "arraybuffer";
			wmo.Encode();
			//send the object 
			ws.send(wmo.BinaryData);
        }
        ws.onclose = function(event) {
            //this.ws = new WebSocket(ws.url); 
			//ws = new WebSocket( serverEndPoint );
			var reason;
            //alert(event.code);
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
			let msghtml = '<img src="images/ic_error_outline_black_24dp.png" width="30px" />\
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
                                <small>'+"Please check your internet connectivity and try send again."+'</small>';
                document.querySelector('#formfeedback-box').innerHTML = msghtml;
            } 
        }
        ws.onerror = function(evt) {
            console.log("ERROR: " + evt.data);
        }  
	}
}
function readDonorForm(Paused){
    var formPaused = Paused || false;
    //read question 1
    var  nameprefix = document.querySelector("#nameprefix").value;
    var fullname = document.querySelector("#respondentname").value;
    var respondentname = nameprefix+". "+fullname;
    var respondentgender = document.querySelector("#respondentgender").value;
    var respondenttitle = document.querySelector("#respondenttitle").value;
    var respondentorgzn = document.querySelector("#respondentorgzn").value;
    var emailBox = document.querySelector("#hidden-email-box");
    var respondentem = emailBox != null ? emailBox.value : ''; 
    console.log("respondentem = "+respondentem+" || urlParams.em = "+urlParams.em);
    var respondentemail = respondentem || urlParams.em;
    console.log("respondentemail = "+respondentemail);
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
    organization.orgname = respondentorgzn;
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
    var checkedRadio1 = document.querySelector('input[name="op-time"]:checked');
    var optime = checkedRadio1 != null ? checkedRadio1.value : ''; 
    var qn3 = {questionId:"qn3",answers:[optime]};
    responses.push(qn3); 
    
    //read question 4
    var numberOfEmployees = document.querySelector('#number-of-employees').value;
    var qn4 = {questionId:"qn4",answers:[numberOfEmployees]};
    responses.push(qn4); 
    
    //read question 5
    var checkedRadio2 = document.querySelector('input[name="ngos-sponsored"]:checked');
    var anyNGOsFunded = checkedRadio2 != null ? checkedRadio2.value : '';
    var NoOfNGOs = null;
    if(anyNGOsFunded=="Yes"){ 
        NoOfNGOs = document.querySelector('#ngos-sponsored').value; 
    }else{ 
        NoOfNGOs=anyNGOsFunded;
    } 
    var qn5 = {questionId:"qn5",answers:[]};
    qn5.answers.push(anyNGOsFunded); 
    if(NoOfNGOs!=null){qn5.answers.push(NoOfNGOs); }
    responses.push(qn5); 
    
    //read question 6
    var checkedRadio3 = document.querySelector('input[name="how-effective-y1"]:checked');
    var how_effective_y1 = checkedRadio3 != null ? checkedRadio3.value : ''; 
    var checkedRadio4 = document.querySelector('input[name="how-effective-y2"]:checked');
    var how_effective_y2 = checkedRadio4 != null ? checkedRadio4.value : ''; 
    var checkedRadio5 = document.querySelector('input[name="how-effective-y3"]:checked');
    var how_effective_y3 = checkedRadio5 != null ? checkedRadio5.value : ''; 
    var checkedRadio6 = document.querySelector('input[name="how-effective-y4"]:checked');
    var how_effective_y4 = checkedRadio6 != null ? checkedRadio6.value : ''; 
    var checkedRadio7 = document.querySelector('input[name="how-effective-y5"]:checked');
    var how_effective_y5 = checkedRadio7 != null ? checkedRadio7.value : '';
    var qn6 = {questionId:"qn6",answers:[how_effective_y1, how_effective_y2, how_effective_y3, how_effective_y4, how_effective_y5]};
    responses.push(qn6); 
    
    //read question 7
    var checkedRadio8 = document.querySelector('input[name="org-reg"]:checked');
    var orgreg = checkedRadio8 != null ? checkedRadio8.value : ''; 
    var qn7 = {questionId:"qn7",answers:[orgreg]};
    responses.push(qn7); 
    
    //read question 8
    var checkedRadio9 = document.querySelector('input[name="rating"]:checked');
    var rating = checkedRadio9 != null ? checkedRadio9.value : ''; 
    var qn8 = {questionId:"qn8",answers:[rating]};
    responses.push(qn8); 
    
    //read question 9
    var checkedRadio10 = document.querySelector('input[name="consultations"]:checked');
    var consultations = checkedRadio10 != null ? checkedRadio10.value : ''; 
    var qn9 = {questionId:"qn9",answers:[consultations]};
    responses.push(qn9); 
    
    //read question 10
    var checkedRadio11 = document.querySelector('input[name="documenting"]:checked');
    var documenting = checkedRadio11 != null ? checkedRadio11.value : '';
    var qn10 = {questionId:"qn10",answers:[documenting]};
    responses.push(qn10); 
    
    //read question 11
    var how_communicate_checkboxes = document.querySelectorAll('input[name="how-communicate"]');
    var checkboxvalues1 = [];
    how_communicate_checkboxes.forEach(function(checkbox){
        if(checkbox.checked){ var boxvalue = checkbox.value; checkboxvalues1.push(boxvalue); }
    }); 
    var qn11 = {questionId:"qn11", answers:checkboxvalues1};
    responses.push(qn11); 
    
    //read question 12
    var what_support_checkboxes = document.querySelectorAll('input[name="what-support"]');
    var checkboxvalues2 = [];
    what_support_checkboxes.forEach(function(checkbox){
        if(checkbox.checked){ var boxvalue = checkbox.value; checkboxvalues2.push(boxvalue); }
    }); 
    var qn12 = {questionId:"qn12", answers:[]};
    var what_support_all_checkbox = document.querySelector('input[name="what-support-all"]'); 
    if(what_support_all_checkbox.checked){
        qn12 = {questionId:"qn12", answers:["Supervision visits","Inter-agency audits","External audits","Staff trainings"]};
    }else{
        qn12 = {questionId:"qn12", answers:checkboxvalues2};
    } 
    responses.push(qn12); 
    
    //read question 13 
    var how_often_checkboxes = document.querySelectorAll('input[name="how-often"]');
    var checkboxvalues3 = [];
    how_often_checkboxes.forEach(function(checkbox){
        if(checkbox.checked){ var boxvalue = checkbox.value; checkboxvalues3.push(boxvalue); }
    }); 
    var qn13 = {questionId:"qn13", answers:[]};
    var how_often_all_checkbox = document.querySelector('input[name="how-often-all"]'); 
    var how_often_none_checkbox = document.querySelector('input[name="how-often-none"]');
    if(how_often_all_checkbox.checked){
        qn13 = {questionId:"qn13", answers:["Monthly","Quarterly","Semi-annually","Annually"]};
    }else if(how_often_none_checkbox.checked){
        qn13 = {questionId:"qn13", answers:["Never"]};
    }else{
        qn13 = {questionId:"qn13", answers:checkboxvalues3};
    } 
    responses.push(qn13); 
    
    //read question 14
    var impression_checkboxes = document.querySelectorAll('input[name="impression"]');
    var checkboxvalues4 = [];
    impression_checkboxes.forEach(function(checkbox){
        if(checkbox.checked){
            var boxvalue = checkbox.value; 
            var number = checkbox.parentNode.parentNode.parentNode.querySelector('input[type="number"]').value;
            var ans_element = boxvalue+": "+number
            checkboxvalues4.push(ans_element); 
        }
    }); 
    var qn14 = {questionId:"qn14", answers:checkboxvalues4};
    responses.push(qn14); 
    
    //read question 15
    var common_options_checkboxes = document.querySelectorAll('input[name="common-options"]');
    var checkboxvalues5 = [];
    common_options_checkboxes.forEach(function(checkbox){
        if(checkbox.checked){
            var boxvalue = checkbox.value; 
            var number = checkbox.parentNode.parentNode.parentNode.querySelector('input[type="number"]').value;
            var ans_element = boxvalue+": "+number;
            checkboxvalues5.push(ans_element); 
        }
    }); 
    var qn15 = {questionId:"qn15", answers:checkboxvalues5};
    responses.push(qn15); 
    
    //read question 16 
    var what_issues_checkboxes = document.querySelectorAll('input[name="what-issues"]');
    var checkboxvalues6 = [];
    what_issues_checkboxes.forEach(function(checkbox){
        if(checkbox.checked){ var boxvalue = checkbox.value; checkboxvalues6.push(boxvalue); }
    }); 
    var qn16 = {questionId:"qn16", answers:[]};
    var what_issues_all_checkbox = document.querySelector('input[name="what-issues-all"]'); 
    if(what_issues_all_checkbox.checked){
        qn16 = {questionId:"qn16", answers:["Missing receipts/documents","Poor filing system","Late report submissions","Inaccurate reporting","Late/non-remittance of due taxes"]};
    }else{
        qn16 = {questionId:"qn16", answers:checkboxvalues6};
    } 
    responses.push(qn16); 
    
    //read question 17 
    var suggestion1 = document.querySelector('#donor-suggestion1').value;
    var suggestion2 = document.querySelector('#donor-suggestion2').value;
    var suggestion3 = document.querySelector('#donor-suggestion3').value;
    var qn17 = {questionId:"qn17",answers:[suggestion1, suggestion2, suggestion3]};
    responses.push(qn17); 
    
    organization.responses = responses;
     
    if(!formPaused){
    submitDonorForm();
    }
} 

function SaveAndContinueLater(){
    readDonorForm(true);
    let pausedformdata = JSON.stringify(organization);
    localStorage.setItem('pausedform',pausedformdata);
    document.querySelector("#SaveContinueLaterBtn").innerHTML = '<img src="/static/images/ic_done_black_36dp.png" width="15px"/><small>Saved</small>';
}

function fillOptions(stringArr, checkboxArr, otherTarget, otherBox){
    for(var i in stringArr){
        let valNotFound = true;
        if(checkboxArr){
            checkboxArr.forEach(function(box){
                if(stringArr[i]==box.value){ box.checked = true; valNotFound = false;}
            });
        }
        if(valNotFound){ 
            if(otherTarget){
                otherTarget.value = stringArr[i]; 
                if(otherBox){
                    otherBox.checked = true; 
                }
            }
        }
    }
}

function getResponseIndex(orgresponses, qnId){
    for(var ii in orgresponses){
        if(orgresponses[ii].questionId == qnId){
            return ii;
        }
    }
    return null;
}

function fillBackToForm(org){
     urlParams.em = org.respondents[0].email;
     document.querySelector("#respondentorgzn").value = org.orgname;
     document.querySelector("#nameprefix").value = org.respondents[0].name.includes(". ")?
     org.respondents[0].name.split(". ")[0]:org.respondents[0].name;
     let nameOnly = org.respondents[0].name.includes(". ") ? org.respondents[0].name.split(". ")[1]:"";
     document.querySelector("#respondentname").value = nameOnly; //leaving out the prefix eg. Mr. Prof. ...
     document.querySelector("#respondentgender").value = org.respondents[0].gender;
     document.querySelector("#respondenttitle").value = org.respondents[0].title; 
     let index = getResponseIndex(org.responses, "qn2_a");
     document.querySelector("#physicalAddr").value = org.responses[index].answers[0];
     index = getResponseIndex(org.responses, "qn2_b");
     document.querySelector("#District").value = org.responses[index].answers[0]; 
     index = getResponseIndex(org.responses, "qn4");
     document.querySelector('#number-of-employees').value = Number(org.responses[index].answers[0]);
     //
     index = getResponseIndex(org.responses, "qn2_c");
     let stringArr = org.responses[index].answers;
     let checkboxArr = document.querySelectorAll('input[name="permit"]');
     let otherTarget = document.querySelector("#org-permit-number");
     let otherBox = document.querySelector('input[value="Permit No"]');
     console.log("qn2_c: otherBox="+otherBox);
     fillOptions(stringArr, checkboxArr, otherTarget, otherBox);
     //
     index = getResponseIndex(org.responses, "qn3");
     stringArr = org.responses[index].answers;
     checkboxArr = document.querySelectorAll('input[name="op-time"]');
     otherTarget = null; otherBox = null; 
     fillOptions(stringArr, checkboxArr, otherTarget, otherBox);
     //
     index = getResponseIndex(org.responses, "qn5");
     stringArr = org.responses[index].answers;
     checkboxArr = document.querySelectorAll('input[name="consultations"]');
     otherTarget = null; otherBox = null; 
     fillOptions(stringArr, checkboxArr, otherTarget, otherBox);
     //
     index = getResponseIndex(org.responses, "qn6");
     stringArr = org.responses[index].answers;
     checkboxArr = document.querySelectorAll('input[name="pubic-access"]');
     otherTarget = document.querySelector("#other-pubic-access");
     otherBox = document.querySelector('input[name="pubic-access-other"]');
     console.log("qn6: otherBox="+otherBox);
     fillOptions(stringArr, checkboxArr, otherTarget, otherBox);
     //
     index = getResponseIndex(org.responses, "qn7");
     stringArr = org.responses[index].answers;
     checkboxArr = document.querySelectorAll('input[name="rating"]');
     otherTarget = null; otherBox = null; 
     fillOptions(stringArr, checkboxArr, otherTarget, otherBox);
     //
     index = getResponseIndex(org.responses, "qn8");
     stringArr = org.responses[index].answers;
     checkboxArr = document.querySelectorAll('input[name="fair-req"]');
     otherTarget = null; otherBox = null; 
     fillOptions(stringArr, checkboxArr, otherTarget, otherBox);
     //
     index = getResponseIndex(org.responses, "qn9");
     stringArr = org.responses[index].answers;
     checkboxArr = document.querySelectorAll('input[name="suggest"]');
     otherTarget = document.querySelector("#other-motivations");
     otherBox = document.querySelector('input[name="suggest-other"]');
     console.log("qn9: otherBox="+otherBox);
     fillOptions(stringArr, checkboxArr, otherTarget, otherBox);
}

function ResumeForm(){
    let pausedformdata = localStorage.getItem('pausedform');
    console.log("Resuming with data: "+pausedformdata);
    if(pausedformdata && pausedformdata!=""){
        let formdataJson = JSON.parse(pausedformdata);
        fillBackToForm(formdataJson);
        localStorage.setItem('pausedform',"");
    }
}
 
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    // DOM is now ready
    ResumeForm();
  }
};

var answeredArr = {"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0 };
function countAnswered(){ let ansrd=0; for(var a in answeredArr){ansrd = ansrd+answeredArr[a];} return ansrd;}
function Answered(num){
    answeredArr[num]=1; 
    let anserdnm = countAnswered();
    document.querySelector("#answerednum").textContent = anserdnm;
    let percentage = Math.floor((anserdnm/17)*100);
    document.querySelector("#form-fill-progress-solid").style.width = percentage+"%";
    document.querySelector("#answeredPercentage").textContent = percentage+"%";
}

function PrintForm(){ 
   document.querySelector("#formTopTable").innerHTML = document.querySelector("#topLogosTable").innerHTML;
   document.querySelector("#formTopTable").style.margin = "4px 0 10px 0";
   var tmp = document.querySelector("#formGuideDiv").innerHTML;
   var tmp2 = document.querySelector("#formfeedback-box").innerHTML;
   var tmp3 = document.querySelector("#submit-response-btn").textContent;
   document.querySelector("#formGuideDiv").innerHTML = '';
   document.querySelector("#formfeedback-box").innerHTML = '';
   document.querySelector("#submit-response-btn").innerHTML = '';
   var mode = 'iframe';
   var close = mode=="popup";
   var options={mode:mode,popClose:close};
   $("#formAreaDiv").printArea(options); 
   document.querySelector("#formGuideDiv").innerHTML = tmp;
   document.querySelector("#formfeedback-box").innerHTML = tmp2;
   document.querySelector("#submit-response-btn").innerHTML = tmp3; 
   document.querySelector("#formTopTable").innerHTML = '';
}

function commenting(){ 
    commentMsg = document.querySelector("#commentingBtn").parentNode.parentNode.querySelector('input[type="text"]').value;
    if(commentMsg!=null && commentMsg!=""){
    document.querySelector("#commentingBtn").innerHTML = '<img src="/static/images/ic_done_black_36dp.png" width="20px"/><small>Comment sent.</small>';
    }
}



