let url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=cdd151db1b734bc2bb7f450c90fc89ba&query=';

document.getElementById("search").onclick = function(){
    search()
}

function getQuery(){
    return url + document.getElementById("inputValue").value;
}

function compileQuery(url, type, text){
    return `${url}&${type}=${text}`;
}

async function search(){
    let query = getQuery();
    let respone = await fetch(query);
    if(respone.ok){
        const jsonRespone = await respone.json();
        console.log(jsonRespone);
    }
    else if(respone.error){
        alert("Failed");
    }
}