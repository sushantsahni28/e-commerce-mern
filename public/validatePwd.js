var password = document.getElementById("password")
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
var splchar = document.getElementById("splchar");
var message = document.getElementById("message")
var confirmPwd = document.getElementById("confirm")
var matchmsg = document.getElementById("match-pass")
var submitBtn = document.getElementById("submit")
var spinner = document.getElementById("spinner") 

function validateMyForm(){
    var matchPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$"
    if(!password.value.match(matchPattern)) {  
        alert("Please match password pattern.")
        return false;
    }
    else if(password.value != confirmPwd.value){
        alert("Passwords don't match.")
        return false;
    }
    else{
        spinner.classList.remove("d-none")
        return true;
    }
}

password.onfocus = function() {
  message.style.display = "block";
  matchmsg.style.display = "none";
}
password.onblur = function() {
  message.style.display = "none";
}

confirmPwd.onfocus = function() {
  matchmsg.style.display = "block";
  message.style.display = "none";
}
confirmPwd.onblur = function() {
  matchmsg.style.display = "none";
}

password.addEventListener("keyup", function(){
    var lowerCaseLetters = /[a-z]/g;
    if(password.value.match(lowerCaseLetters)) {  
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }
    
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if(password.value.match(upperCaseLetters)) {  
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if(password.value.match(numbers)) {  
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }
    
    var splchars = "[!@#$%^&*]";
    if(password.value.match(splchars)) {  
        splchar.classList.remove("invalid");
        splchar.classList.add("valid");
    } else {
        splchar.classList.remove("valid");
        splchar.classList.add("invalid");
    }
    // Validate length
    if(password.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }
})

confirmPwd.addEventListener("keyup", function(){
    if(confirmPwd.value === password.value){
        matchmsg.style.display = "none";
    }else{
       matchmsg.style.display = "block"; 
    }
})