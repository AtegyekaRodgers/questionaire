var organization = {
            orgname:"",
            ttype:"ngo",
            about:"",
            respondents:[{name:"",gender:"",title:"",email:""}],
            responses:[]
          }
var responses = [];
function submitNGOForm(){
    let urlProtoco = urlProtocol || window.location.protocol; 
    let wsProtoco = urlProtoco=="https"?"wss":"ws";
    let urlhostt = urlHost || "0.0.0.0";
    let portxx = urlParams.pt || 9910;
    let serverEndPoint = wsProtoco+"://"+urlhostt+":"+portxx+"/submit/newcon";
    console.log("serverEndPoint = "+serverEndPoint);
    document.querySelector('#formfeedback-box').style.display = 'block';
    console.log(JSON.stringify(organization));
    // create wmo
    let wmo = new WebsocketMessageObject("wmo"); 
    //add json: organization 
    wmo.AddJson(organization);
    wmo.AddString("stringspadding","left");
    //create websocket connection 
     function validateLoginForm(){
        //---
        return true;
     }
	 let wellValidated = validateLoginForm(); 
	 if(wellValidated){ 
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
function readNGOForm(){
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
    
    //read question 2 
    var checkedRadio = document.querySelector('input[name="permit"]:checked');
    var permit = checkedRadio != null ? checkedRadio.value : ''; 
    var permitNo = null;
    if(permit=="Permit No"){ 
        permitNo = document.querySelector('#org-permit-number').value; 
    }else{ 
        permitNo=permit; 
    } 
    var qn2 = {questionId:"qn2",answers:[]};
    var qn2a = {questionId:"qn2_a",answers:[permitNo]};
    responses.push(qn2); 
    responses.push(qn2a); 
    
    //read question 3
    var physicalAddr = document.querySelector("#physicalAddr").value;
    var District = document.querySelector("#District").value;
    var qn3 = {questionId:"qn3",answers:[physicalAddr]};
    var qn3b = {questionId:"qn3_b",answers:[District]};
    responses.push(qn3);
    responses.push(qn3b);
    
    //read question 4
    var checkedRadio2 = document.querySelector('input[name="op-time"]:checked');
    var optime = checkedRadio2 != null ? checkedRadio2.value : '';
    var qn4 = {questionId:"qn4",answers:[optime]};
    responses.push(qn4); 
    
    //read question 5
    var numberOfEmployees = document.querySelector('#number-of-employees').value;
    var qn5 = {questionId:"qn5",answers:[numberOfEmployees]};
    responses.push(qn5); 
    
    //read question 6 
    var diploma = document.querySelector('#diploma').value; 
    var diploma_xpr = document.querySelector('#diploma-exper').value; 
    var first_degree = document.querySelector('#first-degree').value;
    var first_degree_xpr = document.querySelector('#first-degree-exper').value;
    var first_degreeP = document.querySelector('#first-degreeP').value;
    var first_degreeP_xpr = document.querySelector('#first-degreeP-exper').value; 
    var sec_degree = document.querySelector('#sec-degree').value;
    var sec_degree_xpr = document.querySelector('#sec-degree-exper').value;
    var sec_degreeP = document.querySelector('#sec-degreeP').value;
    var sec_degreeP_xpr = document.querySelector('#sec-degreeP-exper').value;
    var qn6 = {questionId:"qn6",answers:[]};
    var qn6a = {questionId:"qn6_a",answers:[diploma, (diploma_xpr!='')?("experience: "+diploma_xpr+" years"):""]}; 
    var qn6b = {questionId:"qn6_b",answers:[first_degree, (first_degree_xpr!='')?("experience: "+first_degree_xpr+" years"):""]};
    var qn6c = {questionId:"qn6_c",answers:[first_degreeP, (first_degreeP_xpr!='')?("experience: "+first_degreeP_xpr+" years"):""]};
    var qn6d = {questionId:"qn6_d",answers:[sec_degree, (sec_degree_xpr!='')?("experience: "+sec_degree_xpr+" years"):""]};
    var qn6e = {questionId:"qn6_e",answers:[sec_degreeP, (sec_degreeP_xpr!='')?("experience: "+sec_degreeP_xpr+" years"):""]};
    responses.push(qn6);
    responses.push(qn6a);
    responses.push(qn6b);
    responses.push(qn6c);
    responses.push(qn6d);
    responses.push(qn6e);
    
    //read question 7
    var checkedRadio3 = document.querySelector('input[name="documenting"]:checked');
    var documenting = checkedRadio3 != null ? checkedRadio3.value : ''; 
    var qn7 = {questionId:"qn7",answers:[documenting]};
    responses.push(qn7); 
    
    //read question 8
    var checkedRadio4 = document.querySelector('input[name="do-you-share"]:checked');
    var do_you_share = checkedRadio4 != null ? checkedRadio4.value : '';
    var shareReason = null;
    if(do_you_share=="No"){ 
        shareReason = document.querySelector('#no-share-reason').value; 
    }else if(do_you_share=="Yes"){
        var checkedRadio5 = document.querySelector('input[name="how-share"]:checked');
        shareReason = checkedRadio5 != null ? checkedRadio5.value : ''; 
    }else{ 
        shareReason=do_you_share; 
    } 
    var qn8 = {questionId:"qn8",answers:[do_you_share, shareReason]}; 
    responses.push(qn8);
    
    //read question 9
    var checkedRadio6 = document.querySelector('input[name="how-effective-y1"]:checked');
    var how_effective_y1 = checkedRadio6 != null ? checkedRadio6.value : ''; 
    var checkedRadio7 = document.querySelector('input[name="how-effective-y2"]:checked');
    var how_effective_y2 = checkedRadio7 != null ? checkedRadio7.value : ''; 
    var checkedRadio8 = document.querySelector('input[name="how-effective-y3"]:checked');
    var how_effective_y3 = checkedRadio8 != null ? checkedRadio8.value : '';
    var checkedRadio9 = document.querySelector('input[name="how-effective-y4"]:checked');
    var how_effective_y4 = checkedRadio9 != null ? checkedRadio9.value : ''; 
    var checkedRadio10 = document.querySelector('input[name="how-effective-y5"]:checked');
    var how_effective_y5 = checkedRadio10 != null ? checkedRadio10.value : ''; 
    var qn9 = {questionId:"qn9",answers:[how_effective_y1, how_effective_y2, how_effective_y3, how_effective_y4, how_effective_y5]};
    responses.push(qn9);
    
    //read question 10
    var checkedRadio11 = document.querySelector('input[name="du-consult"]:checked');
    var du_consult = checkedRadio11 != null ? checkedRadio11.value : ''; 
    var qn10 = {questionId:"qn10",answers:[du_consult]};
    responses.push(qn10); 
    
    //read question 11
    var donor_requirements_checkboxes = document.querySelectorAll('input[name="donor-requirements"]');
    var checkboxvalues3 = [];
    donor_requirements_checkboxes.forEach(function(checkbox){
        if(checkbox.checked){ var boxvalue = checkbox.value; checkboxvalues3.push(boxvalue); }
    }); 
    var qn11 = {questionId:"qn11", answers:[]};
    var donor_requirements_all_checkbox = document.querySelector('input[name="donor-requirements-all"]'); 
    var donor_requirements_other_checkbox = document.querySelector('input[name="donor-requirements-other"]');
    if(donor_requirements_all_checkbox.checked){
        qn11 = {questionId:"qn11", answers:["Registration with government","Organisation leadership (ED, BOD, Other structures)","Promising proposal","Competent staff","Previous experience"]};
    }else{
        qn11 = {questionId:"qn11", answers:checkboxvalues3};
    } 
    if(donor_requirements_other_checkbox.checked){
        var moreRequirement = document.querySelector('#donor-requirements-other').value;
        qn11.answers.push(moreRequirement);
    }
    responses.push(qn11); 
    
    //read question 12
    var checkedRadio12 = document.querySelector('input[name="fair-req"]:checked');
    var fair_req = checkedRadio12 != null ? checkedRadio12.value : '';
    var qn12 = {questionId:"qn12",answers:[fair_req]};
    responses.push(qn12); 
    
    //read question 13
    var checkedRadio13 = document.querySelector('input[name="donor-req-necessary"]:checked');
    var req_necessary = checkedRadio13 != null ? checkedRadio13.value : ''; 
    var necessaryWhy = null;
    if(req_necessary=="No"){ 
        var checkedRadio14 = document.querySelector('input[name="req-necessary-no"]:checked');
        var necessaryno = checkedRadio14 != null ? checkedRadio14.value : ''; 
        necessaryWhy = necessaryno=="Both"?"No: Time consuming, Too restrictive":"No: "+necessaryno;
    }else if(req_necessary=="Yes"){
        var checkedRadio15 = document.querySelector('input[name="req-necessary-yes"]:checked');
        var necessaryyes = checkedRadio15 != null ? checkedRadio15.value : ''; 
        necessaryWhy = necessaryyes=="Both"?"Yes: Improve output quality, Increase funding prospects":"Yes: "+necessaryyes;
    }else{ 
        necessaryWhy=req_necessary; 
    } 
    var qn13 = {questionId:"qn13",answers:[necessaryWhy]}; 
    responses.push(qn13);
    
    //read question 14
    var checkedRadio16 = document.querySelector('input[name="suggest"]:checked');
    var suggestion = checkedRadio16 != null ? checkedRadio16.value : '';  
    var suggestionValues = [];
    if(suggestion=="Both options"){
        suggestionValues = ["More staff","Competent staff"]; 
    }else{
        suggestionValues=[suggestion]; 
    } 
    var qn14 = {questionId:"qn14",answers:suggestionValues}; 
    responses.push(qn14);
    
    organization.responses = responses;
    
    submitNGOForm();
} 






