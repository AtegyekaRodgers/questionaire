 //---------------------------------------------
 var state = {
    ngo: {
        token:"646f6e6f727365726574746f6b656e",
        questions:{
            qn1:{questionId:"qn1", qnlabel:"1", qnstatement:"Personal information:", iskey:false},
            qn1_a:{questionId:"qn1_a", qnlabel:"a)", qnstatement:"Name", iskey:true},
            qn1_b:{questionId:"qn1_b", qnlabel:"b)", qnstatement:"Gender", iskey:true},
            qn1_c:{questionId:"qn1_c", qnlabel:"c)", qnstatement:"Title", iskey:true},
            qn1_d:{questionId:"qn1_d", qnlabel:"d)", qnstatement:"E-mail", iskey:true}, 
            qn2:{questionId:"qn2", qnlabel:"2", qnstatement:"Specify the organisation’s operating status, as below:", iskey:false},
            qn2_a:{questionId:"qn2_a", qnlabel:"b", qnstatement:"Permit Number:", iskey:true},
            qn3:{questionId:"qn3", qnlabel:"3", qnstatement:"Physical address", iskey:true}, 
            qn3_b:{questionId:"qn3_b", qnlabel:"b", qnstatement:"District:", iskey:true}, 
            qn4:{questionId:"qn4", qnlabel:"4", qnstatement:"How long has the organisation operated in Uganda?:", iskey:false}, 
            qn5:{questionId:"qn5", qnlabel:"5", qnstatement:"How many Ugandans are employed by your organisation country wide? Give number :", iskey:false},
            qn6:{questionId:"qn6", qnlabel:"6", qnstatement:"What calibre of staff does your organisation have to ensure compliance with donor reporting requirements? (Can pick multiple options)", iskey:false},
            qn6_a:{questionId:"qn6_a", qnlabel:"a", qnstatement:"Up to Diploma", iskey:true},
            qn6_b:{questionId:"qn6_b", qnlabel:"b", qnstatement:"First Degree", iskey:true},
            qn6_c:{questionId:"qn6_c", qnlabel:"v", qnstatement:"First Degree +prof certification", iskey:true},
            qn6_d:{questionId:"qn6_d", qnlabel:"d", qnstatement:"Second Degree", iskey:true},
            qn6_e:{questionId:"qn6_e", qnlabel:"e", qnstatement:"Second Degree+", iskey:true}, 
            qn7:{questionId:"qn7", qnlabel:"7", qnstatement:"Do you think documenting transactions supports complying with donor reporting requirements?", iskey:false},
            qn8:{questionId:"qn8", qnlabel:"8", qnstatement:"Do you share your donor reports with other stakeholders like beneficiaries, government, etc?", iskey:false},   
            qn9:{questionId:"qn9", qnlabel:"9", qnstatement:"Using the expenditure model, how effective has your programme been in the last 5 years", iskey:false},   
            qn10:{questionId:"qn10", qnlabel:"10", qnstatement:"Do you consult your beneficiaries prior to designing programmes for their benefit?", iskey:false},   
            qn11:{questionId:"qn11", qnlabel:"11", qnstatement:"What do your donors typically require you of in order to give projects’ funding?", iskey:false},  
            qn12:{questionId:"qn12", qnlabel:"12", qnstatement:"Do you feel the donor reporting requirements are fair and therefore achievable by your staff?", iskey:false},
            qn13:{questionId:"qn13", qnlabel:"13", qnstatement:"Do you think donor reporting requirements are necessary?", iskey:false},   
            qn14:{questionId:"qn14", qnlabel:"14", qnstatement:"What do you suggest could facilitate NGOs more to comply with the donor reporting requirements?", iskey:false},
        }
   },
       
   donor: {
        token:"6e676f7365726574746f6b656e",
        questions:{
            qn1:{questionId:"qn1", qnlabel:"1", qnstatement:"Personal information:", iskey:false},
            qn1_a:{questionId:"qn1_a", qnlabel:"a)", qnstatement:"Name", iskey:true},
            qn1_b:{questionId:"qn1_b", qnlabel:"b)", qnstatement:"Gender", iskey:true},
            qn1_c:{questionId:"qn1_c", qnlabel:"c)", qnstatement:"Title", iskey:true},
            qn1_d:{questionId:"qn1_d", qnlabel:"d)", qnstatement:"E-mail", iskey:true},
            qn2:{questionId:"qn2", qnlabel:"2", qnstatement:"Please specify your agency’s operating status, as below:", iskey:false},
            qn2_a_i:{questionId:"qn2_a_i", qnlabel:"a)", qnstatement:"Physical address:", iskey:true},
            qn2_a_ii:{questionId:"qn2_a_ii", qnlabel:"", qnstatement:"District:", iskey:true},
            qn2_b:{questionId:"qn2_b", qnlabel:"b", qnstatement:"Permit No:", iskey:true},
            qn3:{questionId:"qn3", qnlabel:"3", qnstatement:"How long has the agency operated in Uganda? (years)", iskey:false},
            qn4:{questionId:"qn4", qnlabel:"4", qnstatement:"How many Ugandans are employed by the agency country wide? Give the number:", iskey:false},
            qn5:{questionId:"qn5", qnlabel:"5", qnstatement:"Are there some NGOs/IPs that your agency funds in Uganda?", iskey:false},
            qn6:{questionId:"qn6", qnlabel:"6", qnstatement:"Using the budget model, how has been the flow of your funding to Ugandan IPs in the last 5 years?", iskey:false},
            qn7:{questionId:"qn7", qnlabel:"7", qnstatement:"Do you think NGOs/IPs registration with government, in some ways, affect their compliance with your grant reporting requirements? ", iskey:false},   
            qn8:{questionId:"qn8", qnlabel:"8", qnstatement:"On a scale of 1-5, how would you rate the integrity of your Ugandan Partners in complying with the reporting requirements?", iskey:false},   
            qn9:{questionId:"qn9", qnlabel:"9", qnstatement:"Do you think prior beneficiary consultations & pubic access to NGO reports enhance compliance with your grant reporting requirements?", iskey:false},   
            qn10:{questionId:"qn10", qnlabel:"10", qnstatement:"On a scale of 1-5, how would you rate the culture of transaction documentation by your IPs in Uganda as required by both the donors & government?", iskey:false},  
            qn11:{questionId:"qn11", qnlabel:"11", qnstatement:"How do you communicate your reporting requirements to the NGOs’ staff? (Can pick as many)", iskey:false},
            qn12:{questionId:"qn12", qnlabel:"12", qnstatement:"What support does your agency give to the IPs to ensure that program and financial reports are submitted per the set standards? (Can pick multiple options)", iskey:false},   
            qn13:{questionId:"qn13", qnlabel:"13", qnstatement:"How often does your agency carry out the chosen activity (ies) above?", iskey:true},
            qn14:{questionId:"qn14", qnlabel:"14", qnstatement:"What is your impression about the quality of reports submitted by the IPs in terms of completeness, accuracy and timeliness? (Can pick multiple options)", iskey:false},
             qn14_a:{questionId:"qn14_a", qnlabel:"a)", qnstatement:"Compliant (Specify number of IPs)", iskey:true},
             qn14_b:{questionId:"qn14_b", qnlabel:"b)", qnstatement:"Partially compliant (Specify number of IPs) ", iskey:true},
             qn14_c:{questionId:"qn14_c", qnlabel:"c)", qnstatement:"Non-compliant (Specify number of IPs) ", iskey:true},
             qn14_d:{questionId:"qn14_d", qnlabel:"d)", qnstatement:"Unclassified (Specify number of IPs)", iskey:true},
            qn15:{questionId:"qn15", qnlabel:"15", qnstatement:"Using an audit model, what opinions have been common amongst your IPs in the last 5 years?", iskey:false},
             qn15_a:{questionId:"qn15_a", qnlabel:"a)", qnstatement:"Unqualified (Specify number of IPs)", iskey:true},
             qn15_b:{questionId:"qn15_b", qnlabel:"b)", qnstatement:"Qualified (Specify number of IPs) ", iskey:true},
             qn15_c:{questionId:"qn15_c", qnlabel:"c)", qnstatement:"Disclaimer (Specify number of IPs)", iskey:true}, 
            qn16:{questionId:"qn16", qnlabel:"16", qnstatement:"What issues have been emphasized in the last 5 annual audits? Tick as appropriate", iskey:false},
            qn17:{questionId:"qn17", qnlabel:"17", qnstatement:"What are your suggestions in overcoming the challenges for non-compliance? Outline", iskey:false}
        }
    },
    regulator: {
        token:"6572676f7365726574746f6b656e",
        questions:{
            qn1:{questionId:"qn1", qnlabel:"1", qnstatement:"Personal information:", iskey:false},
            qn1_a:{questionId:"qn1_a", qnlabel:"a)", qnstatement:"Name", iskey:true},
            qn1_b:{questionId:"qn1_b", qnlabel:"b)", qnstatement:"Gender", iskey:true},
            qn1_c:{questionId:"qn1_c", qnlabel:"c)", qnstatement:"Title", iskey:true},
            qn1_d:{questionId:"qn1_d", qnlabel:"d)", qnstatement:"Agency Name", iskey:true},
            qn2:{questionId:"qn2", qnlabel:"2", qnstatement:"Please specify your agency’s operating status, as below:", iskey:false},
            qn2_a_i:{questionId:"qn2_a", qnlabel:"a)", qnstatement:"Physical address:", iskey:true},
            qn2_a_ii:{questionId:"qn2_b", qnlabel:"", qnstatement:"District:", iskey:true},
            qn2_b:{questionId:"qn2_c", qnlabel:"b", qnstatement:"Permit No:", iskey:true},
            qn3:{questionId:"qn3", qnlabel:"3", qnstatement:"How long has the agency operated in Uganda? (years)", iskey:false},
            qn4:{questionId:"qn4", qnlabel:"4", qnstatement:"How many Ugandans do you think are employed by the NGO sector country wide? Give the number:", iskey:false},
            qn5:{questionId:"qn5", qnlabel:"5", qnstatement:"Do you think prior stakeholder consultations & pubic access to NGO reports might further enhance compliance with grants reporting requirements?", iskey:false},
            qn6:{questionId:"qn6", qnlabel:"6", qnstatement:"How would you as a regulator ensure prior stakeholder consultations & pubic access to NGO reports?", iskey:false},
            qn7:{questionId:"qn7", qnlabel:"7", qnstatement:"On a scale of 1-5, how are Non-Governmental Organisations in Uganda responsive to calls to submit their quarterly financial reports?", iskey:false},
            qn8:{questionId:"qn8", qnlabel:"8", qnstatement:"Do you feel donor reporting requirements are fairly simple and therefore achievable by the NGOs?", iskey:false},
            qn9:{questionId:"qn9", qnlabel:"9", qnstatement:"What do you suggest could motivate NGOs more to comply with government reporting requirements?", iskey:false}
        }
    }
 }
 //---------------------------------------------
 
 function runPreview(ORGTYP){ 
    console.log("runPreview running, ORGTYP="+ORGTYP);
    var htmlCompnent = '<div style="min-height:100px; border:1px solid lightgray; width:100%; margin:0; padding:3px;">';
    var orgName = organization.orgname+' ('+ORGTYP+')';
    htmlCompnent += '<h3>'+orgName+'</h3>';
    var aboutOrg = organization.about;
    htmlCompnent += '<h3>'+aboutOrg+'</h3><br/>Respondents:<ul>';
    organization.respondents.forEach(function(respondent){
        htmlCompnent += '<li>'+respondent.name+', '+respondent.gender+', '+respondent.title+', '+respondent.email+'</li>';
    });
    htmlCompnent += '</ul>'
    organization.responses.forEach(function(response){
        console.log(">>>>state["+ORGTYP+"].questions["+response.questionId+"]="+JSON.stringify(state[ORGTYP].questions[response.questionId]));
        if(JSON.stringify(state[ORGTYP].questions[response.questionId])){
        htmlCompnent += '<div"><span style="color:gray">'+(!state[ORGTYP].questions[response.questionId].questionId.includes("_")?'<hr/>'+state[ORGTYP].questions[response.questionId].qnlabel+'.':' ')+' '+state[ORGTYP].questions[response.questionId].qnstatement+'</span>';
            if(!state[ORGTYP].questions[response.questionId].iskey){
                htmlCompnent += '<ul>';
                response.answers.forEach(function(ans){
                    htmlCompnent += '<li>'+ans+'</li>';
                });
                htmlCompnent += '</ul>';
             }else{
                htmlCompnent += ': ';
                response.answers.forEach(function(ans){
                    htmlCompnent += ans+', ';
                });
             }
         }
        htmlCompnent += '</div>';
    });
    htmlCompnent += '</div><br/><br/><br/>';
    var newDiv = document.createElement('div');
    newDiv.innerHTML = htmlCompnent;
    let targetDiv = document.querySelector("#preview-doc-div");
    targetDiv.innerHTML = '';
    targetDiv.appendChild(newDiv);
   } 
    //-------------
   const openNav = (ORGTYP) => {
      let sidepano = document.getElementById("mySidepanel");
      sidepano.style.width = "80%";
      sidepano.style.marginLeft = "10%";
      sidepano.style.boxShadow = "0 0 0 100vw rgb(0,0,0,0.1)";
      let headertable = document.querySelector("#preview-doc-table");
      headertable.innerHTML = document.querySelector("#topLogosTable").innerHTML;
      headertable.style.margin = "1% 2% 0 2%";
      headertable.style.width = "96%";
      runPreview(ORGTYP);
    }

    const closeNav = () => {
      let sidepano = document.getElementById("mySidepanel");
      sidepano.style.width = "0";
      sidepano.style.marginLeft = "0";
      sidepano.style.boxShadow = "0 0 0 0 transparent";
    }
    
    
    
    
