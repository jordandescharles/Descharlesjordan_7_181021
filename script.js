var allRecipes = [];
var allRecipesFiltered=[];
var IngredTable = [];
var AppTable  = [];
var UstTable = [];
var UstArray = [];
var searchValue;
var filterValue= [];
var all = []; ;

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
    displayRecipe --  MAP pour afficher les elements de pageDesign
        pageDesign -- renvoie la mise en page d'un element "article"
        ingredientsList -- sert a affficher les ingrédients
        listIngre -- envoie la mise en page de chaque ingrédient a ingredientsList
*/
function displayRecipe(recipes){ 
    recipes.forEach(function(recipe){
        var a =recipe.ingredients;
        searchApp(recipe.appliance);
        CreateUstList(recipe.ustensils)
        main.innerHTML += `
        <article>
            <img src="/img/a.jpg" alt="placeholderimg">
            <div class="titleArticle">
                <h2>${recipe.name}</h2><span><i class="fa-regular fa-clock"></i> ${recipe.time} min</span>
            </div>
            <div class="basArticle">               
            <p class="ingredientsArticle" id="${recipe.id}"></p>
            <p class="recetteArticle">${recipe.description}</p>
            </div>
        </article>
    ` 
        a.forEach(function(ingre){
            if (ingre.hasOwnProperty("quantity") && ingre.hasOwnProperty("unit")){
                document.getElementById(recipe.id).innerHTML +=`<strong>${ingre.ingredient}</strong> : ${ingre.quantity} ${ingre.unit}</br> `;
                searchIngred (ingre.ingredient);
            }
            else if (ingre.hasOwnProperty("unit") == false && ingre.hasOwnProperty("quantity")){
                document.getElementById(recipe.id).innerHTML +=`<strong>${ingre.ingredient}</strong> : ${ingre.quantity}  </br> `
                searchIngred (ingre.ingredient);;
            }
            else if (ingre.hasOwnProperty("quantity") == false && ingre.hasOwnProperty("unit") == false){
                document.getElementById(recipe.id).innerHTML += `<strong>${ingre.ingredient}</strong>  </br> `;
                searchIngred (ingre.ingredient);
            }
        });
    });
} 

// LISTENER top search bar

var searchTop =document.getElementById("searchTop");
var counter = 0;
var directInput =""; // user input

searchTop.addEventListener("keyup", function(event) {
    
    if (event.keyCode >= 65 && event.keyCode <= 90  ||event.keyCode ==50||event.keyCode ==55 ||event.keyCode ==48   ) { 
        ++ counter; } //incrémente si on appuie sur une lettre uniquement é/è/à compris
    if (event.keyCode == 8 &&  counter <= 3){
        allRecipesFiltered=[];
        main.innerHTML = ``;
        displayRecipe(allRecipes) ; } //si on appuie sur backspace et que le compteur est a 1 on affiche toutes les recettes    
    if (event.keyCode == 8){
        --counter// si backspace on décrémente 
        searchValue=""; 
        if (counter < 0){ 
            counter = 0;
        } // empeche de passer counter en negatif 
    }
    if (counter >= 3){  // valeur lue uniquement si il y a 3 caractères ou + (é/è/à compris)
        directInput = searchTop.value.toLowerCase().replace(/[éêëè]/g,'e').replace(/[àäâ]/g, 'a').replace(/["'"]/g,' ').replace(/["îï"]/g,'i');
        searchValue=directInput;
        IngredTable=[];
        AppTable=[];
        UstArray=[];
        UstTable=[];
        filterTop(directInput);
    }  
})



function filterTop(a){
    allRecipes.forEach(recette => {
        var name= recette.name.toLowerCase();
        var desc= recette.description.toLowerCase();
        var ingredients= recette.ingredients;

        if(name.includes(a) || desc.includes(a)){
            if(allRecipesFiltered.includes(recette) == false){
                allRecipesFiltered.push(recette);
                }
            }       
        ingredients.forEach(ingred =>{   
            var ingredient = ingred.ingredient        
            if(ingredient.includes(a)){
                if(allRecipesFiltered.includes(recette) == false){
                    allRecipesFiltered.push(recette);
                    }
            } 
        
        });
    });
    main.innerHTML = ``;
    displayRecipe(allRecipesFiltered);
    checkIfEmpty();
    console.log(test)

} 



function checkIfEmpty(){
    if (main.hasChildNodes()== false) {
        document.getElementById("listRecipes").innerHTML = `<p id="error">Aucune recette ne correspond à votre critère... 
        </br>vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>` ;
    }
}
/* SEARCH ingredients - couleur associée => Blue
    searchIngred a comme parametre l'ingrédient envoyé par listIngre au dessus;
    pour chaque ingredient on check si il est dans IngredTable si non on le push dedans;
    ensuite on trie par ordre alpha;
*/

// declaration des const utiles uniquement ici
const formBlue = document.getElementById("formBlue");
const btnDown = document.getElementById("buttonDown");
const blue = document.getElementById("blue");

function searchIngred (ingred){
    var a =ingred;
    var lower= a.toLowerCase().replace(/[éêëè]/g,'e').replace(/[àäâ]/g, 'a').replace(/["'"]/g,' ').replace(/["îï"]/g,'i');
    if(IngredTable.includes(lower)==false){
        IngredTable.push(lower);
    }
    IngredTable.sort();
}

function displayIngre(){
    formBlue.classList.remove('miniform'); // remove la classe pour l'affichage du champs de recherche bleu
    formBlue.classList.add('maxiform'); // ajoute la classe pour l'affichage correct de la liste
    btnDown.innerHTML = `<i class="fa-solid fa-angle-up"  onclick="CloseIngre()"></i>`;// remplacement de la fleche pour fermer la liste
    blue.innerHTML = `${IngredTable.map(function (listIngredients){
        return listDesignBlue(listIngredients) // Map tous les liens de la liste d'ingrédients
    }).join('')}`     
  }
 
function listDesignBlue(a){
    return `<li id="${a}List" onclick="filterTag( '${a}','blue');addFilter('${a}');">${a} </li>` }  // on passe le nom et la couleur de fond en parametre

function CloseIngre(){  // inverse de displayIngre
    formBlue.classList.remove('maxiform');
    formBlue.classList.add('miniform');
    btnDown.innerHTML = `<i class="fa-solid fa-angle-down"  onclick="displayIngre()"></i>`;// on remet le lien comme il été en etat initial
    blue.innerHTML = ``;
} 


// SEARCH Appareil - couleur associée => Green  
//idem blue

const formGreen = document.getElementById("formGreen");
const btnDownGreen = document.getElementById("buttonDownGreen");
const green = document.getElementById("green");

function searchApp(app){
    var a = app ;
    var lower= a.toLowerCase().replace(/[éêëè]/g,'e').replace(/[àäâ]/g, 'a').replace(/["'"]/g,' ').replace(/["îï"]/g,'i');
    if(AppTable.includes(lower)==false){
        AppTable.push(lower);}
    AppTable.sort();
}

function displayApp(){
    formGreen.classList.remove('miniform');
    formGreen.classList.add('maxiform');
    btnDownGreen.innerHTML = `<i class="fa-solid fa-angle-up"  onclick="CloseApp()"></i>`;
    green.innerHTML = `${AppTable.map(function(listApp){
        return listDesignGreen(listApp);
    }).join('')}` 
  }
function listDesignGreen(a){
    return `<li id="${a}List" onclick="filterTag( '${a}','green');addFilter('${a}')">${a} </li>` }  

function CloseApp(){ 
    formGreen.classList.remove('maxiform');
    formGreen.classList.add('miniform');
    btnDownGreen.innerHTML = `<i class="fa-solid fa-angle-down"  onclick="displayApp()"></i>`;
    green.innerHTML = ``;
} 

// SEARCH Ustensiles couleur associée => Red
//idem blue

const formRed = document.getElementById("formRed");
const btnDownRed = document.getElementById("buttonDownRed");
const red = document.getElementById("red");

function  CreateUstList(ust){
   UstArray.push(ust) // recup un array avec tous les arrays
}

function searchUst(){  // fonction qui met tous les ustensiles dans 1 seul array UstTable
    UstArray.forEach(function(a){
        a.forEach(function(b){
            var lower= b.toLowerCase().replace(/[éêëè]/g,'e').replace(/[àäâ]/g, 'a').replace(/["'"]/g,' ').replace(/["îï"]/g,'i');
            if(UstTable.includes(lower)==false){
                UstTable.push(lower);
            }
        });
    });  
    UstTable.sort();
}

function displayUst(){
    searchUst()
    formRed.classList.remove('miniform');
    formRed.classList.add('maxiform');
    btnDownRed.innerHTML = `<i class="fa-solid fa-angle-up"  onclick="CloseUst()"></i>`;
    red.innerHTML = `${UstTable.map(function (listUst){
        return listDesignRed(listUst)
    }).join('')}` 
  }
  function listDesignRed(a){
 return `<li id="${a}List" onclick="filterTag( '${a}','red') ;addFilter('${a}')">${a} </li>` }  

function CloseUst(){ 
   formRed.classList.remove('maxiform');
   formRed.classList.add('miniform');
   btnDownRed.innerHTML = `<i class="fa-solid fa-angle-down"  onclick="displayUst()"></i>`;
   red.innerHTML = ``;
} 

//// filter Tags

function filterTag(tag, color){ 
    var tagList = document.getElementById(tag+'List');
    tagList.removeAttribute("onclick");
    tagList.classList.add("disabled");
    document.getElementById("tags").innerHTML += `<span class="tagSelected ${color}" id="${tag}">${tag}<i class="fa-regular fa-circle-xmark" onclick="closeFilterTag('${tag}','${color}'); removeFilter('${tag}')"></i></span>`;
}
function closeFilterTag(tag, color){
    var tagList = document.getElementById(tag+'List');
    document.getElementById(tag).remove();
    if(tagList != null){
        tagList.classList.remove("disabled");
        tagList.setAttribute('onclick','filterTag("'+tag+'","'+color+'")'); 
    }
}

function addFilter(id){
    filterValue.push(id);
}
function removeFilter(id){
    filterValue.pop(id);
}
