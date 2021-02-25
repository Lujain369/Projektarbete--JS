let url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=cdd151db1b734bc2bb7f450c90fc89ba&query=';
let button= document.querySelector('#button')
let inputValue= document.querySelector('#inputValue');
let Main=document.querySelector('.theMain')

button.onclick = function(){
    search()
}

function getQuery(){
    return url + inputValue.value;
}

function compileQuery(url, type, text){
    return `${url}&${type}=${text}`;
}

async function search(){
    let värdet= inputValue.value;

    let query = getQuery();
    let respone = await fetch(query);
    if(respone.ok){
        const jsonRespone = await respone.json();
        console.log(jsonRespone);

        let forstaDivForAllaRecept= document.createElement("div");
        forstaDivForAllaRecept.className = "forstaDivForAllaRecept";

     
      Main.appendChild(forstaDivForAllaRecept);

    }
    else if(respone.error){
        alert("Failed");
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



