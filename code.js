let url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=cdd151db1b734bc2bb7f450c90fc89ba&query=';
let button= document.querySelector('#button')
let inputValue= document.querySelector('#inputValue');
let Main=document.querySelector('.theMain_forRecept')

button.onclick = function(){
    search()
}

function getQuery(){
    if(inputValue.value.length > 0)
    return url + inputValue.value;
    else{
        alert("Must search for something");
    }
}

function compileQuery(url, type, text){
    return `${url}&${type}=${text}`;
}

async function search(){

    let query = getQuery();
    let response;
    try{
        response = await fetch(query);
    }
    catch{
        alert("something went wrong");
    }
    
    if(response.ok){
            const jsonRespone = await response.json();
            console.log(jsonRespone.results.length);

        if(jsonRespone.results.length > 0){
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
             else{
                 alert("We couldn't find " + inputValue.value + " in our database");
             }
        }
}




$(function(){
    $('.items').click(function(){
        const value = $(this.parentElement.childNodes[1]).css("border-radius");
            if(value == "20px") $(this.parentElement.childNodes[1]).css("border-radius", "20px 20px 0px 0px");
            else $(this.parentElement.childNodes[1]).css("border-radius", "20px");
        $("ul", this.parentElement).slideToggle(100);
    })
})



