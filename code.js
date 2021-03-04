const url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=7b8b12f410324e6fb252b8854b17ab36&instructionsRequired=true&addRecipeInformation=true';
let button= document.querySelector('#button')
let inputValue= document.querySelector('#inputValue');
let Main=document.querySelector('.theMain_forRecept');
let Main2=document.querySelector('.theMain_forRecept2');
const splitter = "All things considered, we decided this recipe deserves a spoonacular score of 92%. This score is excellent. Try Pastan and Tuna Salad (Ensalada de Pasta y Atún), Tuna Pasta, and Tuna Pasta for similar recipes."

let intolerances = [];
let diet = "";
let meal = "";

button.onclick = function(){
    search()
}

function getQuery(){
    if(inputValue.value.length > 0) return compileQuery(url, "query", inputValue.value);
    else return url;
}


function compileQuery(url, type, text){
    return `${url}&${type}=${text}`;
}


async function search(){

    let query = getQuery();
    let response;
    //Adds a csv to url
    if(intolerances.length > 0) query = compileQuery(query, "intolerances", intolerances.toString());

    if(diet != "") query = compileQuery(query, "diet", diet);
    
    if(meal != "") query = compileQuery(query, "type", meal);

    try{
        response = await fetch(query);
    }
    catch{
        alert("something went wrong");
    }

 

    if(response.ok){
            const jsonRespone = await response.json();
            Main.innerHTML = "";

        if(jsonRespone.results.length > 0){
            addResults(jsonRespone);
             }
             else{
                 alert("We couldn't find " + inputValue.value + " in our database");
             }
        }
}

function replaceWords(word){
    let replacement = word;
    
    if(replacement.includes("To use up")){
        let index = replacement.indexOf("To use up");
        replacement = replacement.slice(0, index);
    }
    
    if(replacement.includes("All")){
        let index = replacement.indexOf("All");
        replacement = replacement.slice(0, index);
    }
    
    if(replacement.includes("With a spoonacular"))
    {
        let index = replacement.indexOf("With a spoonacular");
        replacement = replacement.slice(0, index);
    }

    if(replacement.includes("Overall, this recipe")){
        let index = replacement.indexOf("Overall, this recipe");
        replacement = replacement.slice(0, index);
    }
    return replacement;
}

function addResults(jsonRespone){
    for (let foodObj = 0; foodObj < jsonRespone.results.length; foodObj++) {

        let descriptionText = replaceWords(jsonRespone.results[foodObj].summary);
        let titel = jsonRespone.results[foodObj]["title"];
        let img=jsonRespone.results[foodObj]["image"];
        let id=jsonRespone.results[foodObj]["id"];
  
       
        let forstaDivForAllaRecept = document.createElement("div");
        forstaDivForAllaRecept.className = "row m-3 recipe";
        forstaDivForAllaRecept.id="recipes"
  
        let descriptionAndButton = document.createElement("div");
        descriptionAndButton.className = "col-lg-8 col-md-12 col-sm-12 row p-3 flex-column"
        let receptTitel = document.createElement("h3");
        receptTitel.className = "col-12 text-center"
        let receptImg= document.createElement("img");
        receptImg.className = "col-lg-4 col-md-6 col-sm-12 m-auto recipeImg"
        let showMore= document.createElement("button");
        showMore.className = "col-12 m-auto"
        let description = document.createElement("p");
        description.className = "col-12";
        
        
        description.innerHTML = descriptionText;
        receptTitel.id = "Titel";
        receptTitel.innerHTML = titel;
        receptImg.setAttribute("src", img);
        showMore.id= id;
        showMore.innerHTML="Show ingredients for this recipe"

        descriptionAndButton.append(description, showMore);
        Main.appendChild(forstaDivForAllaRecept);
        forstaDivForAllaRecept.appendChild(receptTitel);
        forstaDivForAllaRecept.appendChild(receptImg);
        forstaDivForAllaRecept.appendChild(showMore);

        getApiForIngredients(id)
   
       }

};

 function getApiForIngredients(id){
   let getrecipeById= document.getElementById(id);
   getrecipeById.addEventListener("click", function () {

    let callURL = id + "/analyzedInstructions?stepBreakdown=true";
   
    callIngredientApi(callURL);

     }
   )
};
  
function callIngredientApi(callURL){
  fetch("https://api.spoonacular.com/recipes/"+callURL+"&apiKey=7b8b12f410324e6fb252b8854b17ab36")
     .then(jsonRespone=>jsonRespone.json())
     .then((data)=>{
       console.log(data);
       ShowIngredients(data)
     });
     

}

 function ShowIngredients(jsonRespone) {
   remove();
    let instructions = [];
    
    let mainIngredientDiv2= document.createElement("div");
    let ingredientsDiv = document.createElement("div");
    let howToMake = document.createElement("div");

    
    mainIngredientDiv2.id = "mainIngredientDiv2";
    ingredientsDiv.id = "ingredients";
    howToMake.id = "howToMake_Div";

    let H2 = document.createElement("h2");
    let H3 = document.createElement("h3");
    H2.innerHTML = "How to make";
    H3.innerHTML = "Ingredients";

    mainIngredientDiv2.appendChild(ingredientsDiv);
    mainIngredientDiv2.appendChild(howToMake);
    
    ingredientsDiv.appendChild(H3); 
    howToMake.appendChild(H2); 
    Main.appendChild(mainIngredientDiv2);
    

  for (let index = 0; index < jsonRespone.length; index++) {
    for (let i = 0; i <jsonRespone[index].steps.length; i++) {

         for (let j = 0; j < jsonRespone[index].steps[i].ingredients.length; j++) {

            let Ingredients = [];

           Ingredients[j] = jsonRespone[index].steps[i].ingredients[j].name;
           console.log(Ingredients[j]);
           let ingredients = document.createElement("h5");
           ingredients.innerHTML = Ingredients[j];
            ingredientsDiv.appendChild(ingredients);
         }

         instructions[i] = {
            Instruction: jsonRespone[index].steps[i].step,
            Number: jsonRespone[index].steps[i].number,
          };
          console.log(instructions[i].Number + instructions[i].Instruction);
          let recipeDiv = document.createElement("div");

      let instructionNumber = document.createElement("h5");

      let instructionStep = document.createElement("p");
      let mainIngredientDiv2 = document.querySelector("#howToMake_Div")

      recipeDiv.id = "recipediv";
      instructionNumber.innerHTML = instructions[i].Number;
      instructionNumber.style = "margin-right : 15px;";

      instructionStep.innerHTML = instructions[i].Instruction;

      recipeDiv.appendChild(instructionNumber);
      recipeDiv.appendChild(instructionStep);

      mainIngredientDiv2.appendChild(recipeDiv);
    
    }
  }
     
 }
 function remove(){
   let removeDiv= document.querySelectorAll("#recipes");
   for(let index=0;index<removeDiv.length;index++){

     removeDiv[index].remove();
   }

   let removeDiv3 = document.querySelectorAll("#mainIngredientDiv2");
   for (let index = 0; index < removeDiv3.length; index++) {
     removeDiv3[index].remove();
   }

   let removeDiv4 = document.querySelectorAll("#ingredients")
   for (let index = 0; index < removeDiv4.length; index++) {
     removeDiv4[index].remove();
   }
   let removeDiv5 = document.querySelectorAll("#howToMake_Div")
   for (let index = 0; index < removeDiv5.length; index++) {
     removeDiv5[index].remove();
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
        let $box = $(this);
        if ($box.is(":checked")) {
            if(this.name == "diet") diet = this.value;
            if(this.name == "meal") meal = this.value;
            let group = "input:checkbox[name='" + $box.attr("name") + "']";
            $(group).prop("checked", false);
            $box.prop("checked", true);
        } 
        else {
          $box.prop("checked", false);
          if(this.name == "diet") diet = "";
          if(this.name == "meal") meal = "";
        }
      });
})

search();