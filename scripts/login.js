// CHECK IF ALREADY LOGGED IN
if (localStorage.getItem("cookie") != null){
    location.pathname = "/main.html";
}

function login(){
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    if (username == "" || password == ""){
        alert("Please fill in all fields"); return;
    }
    document.getElementById("loginbutton").disabled = true;
    document.getElementById("loginbutton").style.cursor = "wait";
    fetch("http://localhost:8080/login/"+username+"/"+password).then(function(data){
        console.log("Logged In");
        data.json().then(function(data){
            localStorage.setItem("cookie", data["cookie"]);
            console.log(data["cookie"]);
            location.pathname = "/main.html";
        });
    })
}