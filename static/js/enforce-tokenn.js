var respondentemail = document.querySelector("#hidden-email-box").textContent; 

console.log("respondentemail = "+respondentemail); 
function enforceToken(id, serverport){
    var targetElementId = id;
    if(targetElementId=="proceed-as-regulator"){
        var tokenx = prompt("Please enter regulator access token: \nHint: Get the token from the email you received from the researcher.");
        if(tokenx=="657267"){
            document.getElementById(id).querySelector("a").setAttribute("href","/static/regulator.html?pt="+serverport+"&em="+respondentemail).click();
        }else if(tokenx!="" && tokenx!=null){
            alert("Incorrect access token! Please enter again.");
        }
    }else if(targetElementId=="proceed-as-donor"){
        var tokenx = prompt("Please enter donor access token: \nHint: Get the token from the email you received from the researcher.");
        if(tokenx=="6e676f"){
            document.getElementById(id).querySelector("a").setAttribute("href","/static/donor.html?pt="+serverport+"&em="+respondentemail).click();
        }else if(tokenx!="" && tokenx!=null){
            alert("Incorrect access token! Please enter again.");
        }
    }else if(targetElementId=="proceed-as-ngo"){
        var tokenx = prompt("Please enter ngo access token: \nHint: Get the token from the email you received from the researcher.");
        if(tokenx=="646f6e"){
            document.getElementById(id).querySelector("a").setAttribute("href","/static/ngo.html?pt="+serverport+"&em="+respondentemail).click();
        }else if(tokenx!="" && tokenx!=null){
            alert("Incorrect access token! Please enter again.");
        } 
    }
}
