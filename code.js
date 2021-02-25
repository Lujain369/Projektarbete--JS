let url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=cdd151db1b734bc2bb7f450c90fc89ba&query=';
let button= document.querySelector('#search')
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

        let förstaDivFörAllaRecept= document.createElement("div");
        förstaDivFörAllaRecept.className = "förstaDivFörAllaRecept";


      let allaRecept= document.createElement("div");
      allaRecept.className = "allaRecept";

      let rubrikFörInput = document.createElement("h1");
      rubrikFörInput.id = "rubrikFörInput";
      rubrikFörInput.innerHTML = "'"+värdet+"'";

      allaRecept.appendChild(rubrikFörInput);
      förstaDivFörAllaRecept.appendChild(allaRecept);
      Main.appendChild(förstaDivFörAllaRecept);

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



