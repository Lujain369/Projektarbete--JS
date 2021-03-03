let url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=cdd151db1b734bc2bb7f450c90fc89ba';
let button= document.querySelector('#button')
let inputValue= document.querySelector('#inputValue');
let Main=document.querySelector('.theMain_forRecept');
let intolerances = [];
let diet = "";
let meal = "";

button.onclick = function(){
    search()
}

function getQuery(){
    if(inputValue.value.length > 0) return compileQuery(url, "query", inputValue.value);
    else return url
}


function compileQuery(url, type, text){
    return `${url}&${type}=${text}`;
}

async function search(){

    let query = getQuery();
    
    //Adds a csv to url
    if(intolerances.length > 0) query = compileQuery(query, "intolerances", intolerances.toString());

    if(diet != "") query = compileQuery(query, "diet", diet);
    
    if(meal != "") query = compileQuery(query, "type", meal);

    let cookieResult = getCookie(query);

    let response;
    try{
        if(cookieResult == "")  response = await fetch(query);
        else response = cookieResult;
    }
    catch{
        alert("something went wrong");
    }
    
    if(response.ok){
            const jsonRespone = await response.json();
            createCookie(query, jsonRespone);
            Main.innerHTML = "";

        if(jsonRespone.results.length > 0){
            addResults(jsonRespone);
             }
             else{
                 alert("We couldn't find " + inputValue.value + " in our database");
             }
        }
    else if(response != ""){
        const jsonRespone = JSON.parse(response);
        Main.innerHTML = "";
        addResults(jsonRespone);
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function createCookie(url, list){
    document.cookie = `${url}=${JSON.stringify(list)}`;
    console.log(document.cookie);
}


function addResults(jsonRespone){
    for (let foodObj = 0; foodObj < jsonRespone.results.length; foodObj++) {

        let titel = jsonRespone.results[foodObj]["title"];
        let img=jsonRespone.results[foodObj]["image"];
  
       
        let forstaDivForAllaRecept = document.createElement("div");
        forstaDivForAllaRecept.className = "forstaDivForAllaRecept";
  
        let receptTitel = document.createElement("h3");
        let receptImg= document.createElement("img");
        let showMore= document.createElement("button");
        
  
        receptTitel.id = "Titel";
        receptTitel.innerHTML = titel;
        receptImg.setAttribute("src", img);
        showMore.id="showMore_btn"
        showMore.innerHTML="Show ingredients for this recipe"
  
        Main.appendChild(forstaDivForAllaRecept);
        forstaDivForAllaRecept.appendChild(receptTitel);
        forstaDivForAllaRecept.appendChild(receptImg);
        forstaDivForAllaRecept.appendChild(showMore);
  
       }
}


$(function(){


    $('.items').click(function(){
        const value = $(this.parentElement.childNodes[1]).css("border-radius");
            if(value == "20px") $(this.parentElement.childNodes[1]).css("border-radius", "20px 20px 0px 0px");
            else $(this.parentElement.childNodes[1]).css("border-radius", "20px");
        $("ul", this.parentElement).slideToggle(100);
    })

    $('#Intolerance').on('click', 'input', function(){
        if(!this.checked){
            const index = intolerances.indexOf(this.value);
            intolerances.splice(index, 1);
        }
        else intolerances.push(this.value);
    })

    $("input:checkbox").on('click', function() {
        var $box = $(this);
        if ($box.is(":checked")) {
            if(this.name == "diet") diet = this.value;
            if(this.name == "meal") meal = this.value;
          var group = "input:checkbox[name='" + $box.attr("name") + "']";
          $(group).prop("checked", false);
          $box.prop("checked", true);
        } else {
          $box.prop("checked", false);
          if(this.name == "diet") diet = "";
          if(this.name == "meal") meal = "";
        }
      });
})

//todo Add random search when entering page