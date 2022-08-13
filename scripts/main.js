fetch("http://localhost:8080/fields/"+localStorage.getItem("cookie")).then(function(data){
    data.text().then(function(data){
        console.log(data);
        try{
            data = JSON.parse(data);
        }catch{
            alert(data);
            location.pathname = "/index.html";
            localStorage.removeItem("cookie");
            return;
        }
        var fields = document.getElementById("fields");
        fields.innerHTML = "";
        data = data["fields"];
        var sum = 0;
        for (var i = 0; i < data.length; i++){
            var field_div = document.createElement("button");
            var field_amnt = document.createElement("div");
            field_amnt.className = "fields_amnt";
            field_div.className = "field";
            field_div.innerHTML = "Fach "+ (i+1);
            if (data[i] === 0){
                field_div.setAttribute( "onClick", 'javascript: alert("Dieses Fach ist leer");' );
            }
            else{
                field_div.setAttribute( "onClick", "javascript: load_themes("+(i+1)+");" );
            }
            
            field_amnt.innerHTML = data[i];
            sum += data[i];
            fields.appendChild(field_div);
            fields.appendChild(field_amnt);
        }
        // POLISH FIELDS SET SIZE
        var fields_amnt = document.getElementsByClassName("fields_amnt");
        for (var i = 0; i < fields_amnt.length; i++){
            var prog = fields_amnt[i].innerHTML / sum * 100;
            fields_amnt[i].style.backgroundImage = "linear-gradient(to right, red , transparent "+prog+"%)";
        }
    })
})

function load_themes(field){
    console.log(field);
    document.getElementById("fields").innerHTML = "";
    fetch("http://localhost:8080/kartei/"+localStorage.getItem("cookie")+"/"+field).then(function(data){
        data.text().then(function(data){
            console.log(data);
            try{
                data = JSON.parse(data)["themes"];
            }catch{
                alert(data);
                location.pathname = "/index.html";
                localStorage.removeItem("cookie");
                return;
            }
            var themes = document.getElementById("fields");
            for (var i = 0; i < data.length; i++){
                var field_div = document.createElement("button");
                var field_amnt = document.createElement("div");
                field_amnt.className = "fields_amnt";
                field_div.className = "field";
                field_div.innerHTML = data[i]["name"];
                if (data[i] === 0){
                    field_div.setAttribute( "onClick", 'javascript: alert("Dieses Fach ist leer");' );
                }
                else{
                    field_div.setAttribute( "onClick", "javascript: load_cards('"+data[i]["id"]+"', "+field+");" );
                }
                
                field_amnt.innerHTML = data[i]["amount"];
                themes.appendChild(field_div);
                themes.appendChild(field_amnt);
            }
            var back = document.createElement("button");
            back.setAttribute( "onClick", 'javascript: location.pathname = "/main.html";' );
            back.innerHTML = "Zurück"
            themes.appendChild(back);
    })});
}

function load_cards(card, field){
    console.log(field);
    document.getElementById("fields").innerHTML = "";
    fetch("http://localhost:8080/kartei/"+localStorage.getItem("cookie")+"/"+field+"/"+card).then(function(data){
        data.text().then(function(data){
            console.log(data);
            try{
                data = JSON.parse(data)["themes"];
            }catch{
                alert(data);
                location.pathname = "/index.html";
                localStorage.removeItem("cookie");
                return;
            }
            var themes = document.getElementById("fields");
            for (var i = 0; i < data.length; i++){
                var field_div = document.createElement("button");
                var field_amnt = document.createElement("div");
                field_amnt.className = "fields_amnt";
                field_div.className = "field";
                field_div.innerHTML = data[i]["name"];
                if (data[i] === 0){
                    field_div.setAttribute( "onClick", 'javascript: alert("Dieses Fach ist leer");' );
                }
                else{
                    field_div.setAttribute( "onClick", 'javascript: location.pathname = "/learn.html/'+card+'";' );
                }
                
                field_amnt.innerHTML = data[i]["amount"];
                themes.appendChild(field_div);
                themes.appendChild(field_amnt);
            }
            var back = document.createElement("button");
            back.setAttribute( "onClick", 'javascript: location.pathname = "/main.html";' );
            back.innerHTML = "Zurück"
            themes.appendChild(back);
    })});
}

function logout(){
    localStorage.removeItem("cookie");
    location.pathname = "/index.html";
}