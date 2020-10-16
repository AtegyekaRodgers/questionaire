var organization = {
            orgname:"",
            ttype:"donor",
            about:"",
            respondents:[{name:"",gender:"",title:"",email:""}],
            responses:[]
          }

var responses = [];
function submitDonorForm(){
    portxx = process.env.PORT || 9910;
    let serverEndPoint = "ws://0.0.0.0:"+portxx+"/submit/newcon";
    console.log("serverEndPoint = "+serverEndPoint); 
    document.querySelector('#formfeedback-box').style.display = 'block';
    console.log(JSON.stringify(organization));
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
        //create websocket connection 
        ws = new WebSocket(serverEndPoint);
        ws.onopen = function(evt) {
            console.log("websocket connection OPEN");
			ws.binaryType = "arraybuffer";
			wmo.Encode();
			//send the object 
			ws.send(wmo.BinaryData);
        }
        ws.onclose = function(evt) {
            console.log("connection CLOSED");
            ws = null;
			ws = new WebSocket(serverEndPoint);
			let msghtml = '<img src="/static/images/ic_error_outline_black_24dp.png" width="30px" />\
                            <h4>'+'!! Connection closed</h4>\
                            '+'Please check your internet connectivity and try send again.<br/><br/>';
            document.querySelector('#formfeedback-box').innerHTML = msghtml;
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
function readDonorForm(){
    //read question 1
    var respondentname = document.querySelector("#respondentname").value;
    var respondentgender = document.querySelector("#respondentgender").value;
    var respondenttitle = document.querySelector("#respondenttitle").value;
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
            var ans_element = boxvalue+": "+number
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
    
    submitDonorForm();
} 




