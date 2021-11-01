var allRecipes = [];
var IngredTable = [];
var AppTable  = [];
var UstTable = [];
var UstArray = [];

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
                searchIngred (a[j].ingredient);
                document.getElementById(allRecipes[i].id).innerHTML +=`<strong>${a[j].ingredient}</strong> : ${a[j].quantity} ${a[j].unit}</br> `;
            }
            else if (a[j].hasOwnProperty("unit") == false && a[j].hasOwnProperty("quantity")){
                searchIngred (a[j].ingredient);
                document.getElementById(allRecipes[i].id).innerHTML +=`<strong>${a[j].ingredient}</strong> : ${a[j].quantity}  </br> `;
            }
            else if (a[j].hasOwnProperty("quantity") == false && a[j].hasOwnProperty("unit") == false){
                searchIngred (a[j].ingredient);
                document.getElementById(allRecipes[i].id).innerHTML += `<strong>${a[j].ingredient}</strong>  </br> `;
            }
         }
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
    return `<li id="${a}List" onclick="filterTag( '${a}','blue')">${a} </li>` }  // on passe le nom et la couleur de fond en parametre

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
    return `<li id="${a}List" onclick="filterTag( '${a}','green')">${a} </li>` }  

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
    for(var i = 0; i < UstArray.length; i++) {
        for(var j = 0; j < UstArray[i].length; j++) {
            var lower= UstArray[i][j].toLowerCase().replace(/[éêëè]/g,'e').replace(/[àäâ]/g, 'a').replace(/["'"]/g,' ').replace(/["îï"]/g,'i');
            if(UstTable.includes(lower)==false){
                UstTable.push(lower);
            }
        }
    }  
    UstTable.sort();
}
// fonction pour utiliser la recherche top combinée au ustensils
function displayUstTOP(app){
    var a = app ;
    var lower= a.toLowerCase().replace(/[éêëè]/g,'e').replace(/[àäâ]/g, 'a').replace(/["'"]/g,' ').replace(/["îï"]/g,'i');
    if(UstTable.includes(lower)==false){
        UstTable.push(lower);}
    UstTable.sort();
}
 
function displayUst(){
    formRed.classList.remove('miniform');
    formRed.classList.add('maxiform');
    btnDownRed.innerHTML = `<i class="fa-solid fa-angle-up"  onclick="CloseUst()"></i>`;
    red.innerHTML = `${UstTable.map(function (listUst){
        return listDesignRed(listUst)
    }).join('')}` 
  }
  function listDesignRed(a){
 return `<li id="${a}List" onclick="filterTag( '${a}','red')">${a} </li>` }  

function CloseUst(){ 
   formRed.classList.remove('maxiform');
   formRed.classList.add('miniform');
   btnDownRed.innerHTML = `<i class="fa-solid fa-angle-down"  onclick="displayUst()"></i>`;
   red.innerHTML = ``;
} 

/* LISTENER top search bar

*/
var searchTop =document.getElementById("searchTop");
var counter = 0;
var directInput =""; // user input

searchTop.addEventListener("keyup", function(event) {
    
    if (event.keyCode >= 65 && event.keyCode <= 90  ||event.keyCode ==50||event.keyCode ==55 ||event.keyCode ==48   ) { 
        ++ counter; //  incrémente si on appuie sur une lettre uniquement é/è/à compris
    }
    if (event.keyCode == 8 && counter == 1){
        displayRecipe(allRecipes) ; //si on appuie sur backspace et que le compteur est a 1 on affiche toutes les recettes
        
    }
    if (event.keyCode == 8){
        --counter// si backspace on décrémente  
        if (counter < 0){ // si trop de backspace valeur min =0
            counter = 0;
        }
    }
       if (counter >= 3){
         directInput = searchTop.value.toLowerCase().replace(/[éêëè]/g,'e').replace(/[àäâ]/g, 'a').replace(/["'"]/g,' ').replace(/["îï"]/g,'i');
       // valeur lue uniquement si il y a 3 caractères ou + (é/è/à compris)
        filterTop() // lance le filtre a chaque saisie de 3 ou + caracteres
       }  
})


function filterTop(){
    IngredTable=[];// on vide l'array des ingrédients pour afficher la recherche
    AppTable=[]; 
    UstTable=[];

    main.innerHTML = `${allRecipes.map(function (recipeFilterTop){
        return pageDesignFiltered(recipeFilterTop)
    }).join('')}`

    checkIfEmpty(); // verifie si on a un résultat
}

function pageDesignFiltered(r){ 
    // explication nomenclature : reci pour recipe et Desc pour description
    // Lower case pour faciliter la recherche  
    var a =[]; 
    var b=[]; 
    var reciDesc = r.description.toLowerCase();
    var reciName = r.name.toLowerCase();
    // on map le resultat d'ingredients pour recuperer tout dans 1 array + lowercase + join
    var reciIngre = r.ingredients;
    var reciUst = r.ustensils;
    
    for(i=0; i<reciIngre.length; i++){
        a.push(r.ingredients[i].ingredient)
    } 
    for(i=0; i<reciUst.length; i++){
        b.push(reciUst[i])
    } 
    var reciIngre = a.map(e => e.toLocaleLowerCase()).join(' ');
    // si la rechercher est inclue dans le nom les ingredients ou la description
    if(reciName.includes(directInput) || reciIngre.includes(directInput) || reciDesc.includes(directInput) ){

        // boucle qui permet de mettre a jour le filtre ingredient a la saisie
        for(i=0; i<a.length ; i++){
            searchIngred(a[i]);
        }
         // permet de mettre a jour le filtre Appareil a la saisie
            searchApp(r.appliance);
         // boucle qui permet de mettre a jour le filtre ingredient a la saisie
         for(i=0; i<b.length ; i++){
            displayUstTOP(b[i]);
        }         
    //searchApp(AppTable);
    //CreateUstList(UstTable);
    return `
        <article>
            <img src="/img/a.jpg" alt="placeholderimg">
            <div class="titleArticle">
                <h2>${r.name}</h2><span><i class="fa-regular fa-clock"></i> ${r.time} min</span>
            </div>
            <div class="basArticle">
               <p class="ingredientsArticle">${ingredientsList(r.ingredients)}</p>
               <p class="recetteArticle">${r.description}</p>
            </div>
        </article>
    ` }
   
} 
//// filter Tags


function filterTag(tag, color){ 
    var tagList = document.getElementById(tag+'List');
    tagList.removeAttribute("onclick");
    tagList.classList.add("disabled");
    document.getElementById("tags").innerHTML += `<span class="tagSelected ${color}" id="${tag}">${tag}<i class="fa-regular fa-circle-xmark" onclick="closeFilterTag('${tag}','${color}')"></i></span>`;
}
function closeFilterTag(tag, color){
    var tagList = document.getElementById(tag+'List');
    document.getElementById(tag).remove();
    tagList.classList.remove("disabled");
    tagList.setAttribute('onclick','filterTag("'+tag+'","'+color+'")'); 
}

// CHeck si il y a des recettes:

function checkIfEmpty(){
    if (main.hasChildNodes()== false) {
        document.getElementById("listRecipes").innerHTML = `<p id="error">Aucune recette ne correspond à votre critère... 
        </br>vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>` ;
    }
}