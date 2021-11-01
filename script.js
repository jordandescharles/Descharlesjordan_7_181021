var allRecipes = [];
var allRecipesFiltered=[];

const main = document.getElementById("listRecipes");

// recupération du JSON
fetch('recipes.json')
    .then((response) => {
        return response.json();
})
    .then((data) => {
        allRecipes = data.recipes;
        displayRecipe(allRecipes) ;    
});

/* affichage Principaldes plats avec Littéraux de gabarits 
*/

function displayRecipe(allRecipes){ 

    for(i=0;i<allRecipes.length; i++){
        var a = allRecipes[i].ingredients;
        main.innerHTML += `
        <article>
            <img src="/img/a.jpg" alt="placeholderimg">
            <div class="titleArticle">
                <h2>${allRecipes[i].name}</h2><span><i class="fa-regular fa-clock"></i> ${allRecipes[i].time} min</span>
            </div>
            <div class="basArticle">               
            <p class="ingredientsArticle" id="${allRecipes[i].id}"></p>
            <p class="recetteArticle">${allRecipes[i].description}</p>
            </div>
        </article>
    ` 
        for(j=0; j<a.length;j++){

            if (a[j].hasOwnProperty("quantity") && a[j].hasOwnProperty("unit")){
                document.getElementById(allRecipes[i].id).innerHTML +=`<strong>${a[j].ingredient}</strong> : ${a[j].quantity} ${a[j].unit}</br> `;
            }
            else if (a[j].hasOwnProperty("unit") == false && a[j].hasOwnProperty("quantity")){
                document.getElementById(allRecipes[i].id).innerHTML +=`<strong>${a[j].ingredient}</strong> : ${a[j].quantity}  </br> `;
            }
            else if (a[j].hasOwnProperty("quantity") == false && a[j].hasOwnProperty("unit") == false){
                document.getElementById(allRecipes[i].id).innerHTML += `<strong>${a[j].ingredient}</strong>  </br> `;
            }
         }
    }    
}

// LISTENER top search bar

var searchTop =document.getElementById("searchTop");
var counter = 0;
var directInput =""; // user input

searchTop.addEventListener("keyup", function(event) {
    
    if (event.keyCode >= 65 && event.keyCode <= 90  ||event.keyCode ==50||event.keyCode ==55 ||event.keyCode ==48   ) { 
        ++ counter; //  incrémente si on appuie sur une lettre uniquement é/è/à compris
    }
    if (event.keyCode == 8 &&  counter <= 3){
        allRecipesFiltered=[];
        main.innerHTML = ``;
        displayRecipe(allRecipes) ; //si on appuie sur backspace et que le compteur est a 1 on affiche toutes les recettes    
    }
    if (event.keyCode == 8){
        --counter// si backspace on décrémente  
        if (counter < 0){ // si trop de backspace valeur min =0
            counter = 0;
        }
    }
    if (counter >= 3){  // valeur lue uniquement si il y a 3 caractères ou + (é/è/à compris)
        directInput = searchTop.value.toLowerCase().replace(/[éêëè]/g,'e').replace(/[àäâ]/g, 'a').replace(/["'"]/g,' ').replace(/["îï"]/g,'i');
        filterTop()

    }  
})

function filterTop(){
    for(i=0;i<allRecipes.length; i++){
        var name= allRecipes[i].name.toLowerCase();
        var desc= allRecipes[i].description.toLowerCase();
        var ingredients= allRecipes[i].ingredients;

        for(j=0;j<ingredients.length;j++){
            var ingred = ingredients[j].ingredient;
            if(name.includes(directInput) || desc.includes(directInput) || ingred.includes(directInput)){
                if(allRecipesFiltered.includes(allRecipes[i]) == false){
                allRecipesFiltered.push(allRecipes[i]);
                }
            } 
        }
    }
    main.innerHTML = ``;
    displayRecipe(allRecipesFiltered);
    allRecipesFiltered=[];
    checkIfEmpty();
}



// CHeck si il y a des recettes:

function checkIfEmpty(){
    if (main.hasChildNodes()== false) {
        document.getElementById("listRecipes").innerHTML = `<p id="error">Aucune recette ne correspond à votre critère... 
        </br>vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>` ;
    }
}