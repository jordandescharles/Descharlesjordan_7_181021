let allRecipes = [];
let allRecipesFiltered=[];
let IngredTable = [];
let AppTable  = [];
let UstTable = [];
let UstArray = [];
let searchValue;
let filterValue= [];
let all = []; ;
let searchTop =document.getElementById("searchTop");
let counter = 0;
let counterFilter = 0;
let directInput =""; 
let inputFilter ="";
let tagRecipe =[];
const main = document.getElementById("listRecipes");
const formBlue = "formBlue";
const btnDownBlue = "buttonDownBlue";
const blue = "blue";
const formGreen = "formGreen";
const btnDownGreen = "buttonDownGreen";
const green = "green";
const formRed = "formRed";
const btnDownRed = "buttonDownRed";
const red = "red";

fetch('recipes.json')
    .then((response) => {
        return response.json();
})
    .then((data) => {
        allRecipes = data.recipes;
        displayRecipe(allRecipes) ;
});
function displayRecipe(recipes){ 
    IngredTable=[]; AppTable=[]; UstArray=[]; UstTable=[];
    main.innerHTML =``; // vide l'affichage précédent
    recipes.forEach(function(recipe){
        search(recipe.appliance,"appliance");
        CreateUstList(recipe.ustensils)
        main.innerHTML += `
        <article>
            <img src="/img/grey.jpg" alt="placeholderimg">
            <div class="titleArticle">
                <h2>${recipe.name}</h2><span><i class="fa-regular fa-clock"></i> ${recipe.time} min</span>
            </div>
            <div class="basArticle">               
            <p class="ingredientsArticle" id="${recipe.id}"></p>
            <p class="recetteArticle">${recipe.description}</p>
            </div>
        </article>`    
        // permet de verifier si les ingrédients ont une quantité et une unité puis les affiches
        let a = recipe.ingredients;
        a.forEach(function(ingre){
            if (ingre.hasOwnProperty("quantity") && ingre.hasOwnProperty("unit")){
                document.getElementById(recipe.id).innerHTML +=`<strong>${ingre.ingredient}</strong> : ${ingre.quantity} ${ingre.unit}</br> `;
                search (ingre.ingredient,"ingredient"); 
            }
            else if (ingre.hasOwnProperty("unit") == false && ingre.hasOwnProperty("quantity")){
                document.getElementById(recipe.id).innerHTML +=`<strong>${ingre.ingredient}</strong> : ${ingre.quantity}  </br> `
                search (ingre.ingredient,"ingredient");
            }
            else if (ingre.hasOwnProperty("quantity") == false && ingre.hasOwnProperty("unit") == false){
                document.getElementById(recipe.id).innerHTML += `<strong>${ingre.ingredient}</strong>  </br> `;
                search (ingre.ingredient,"ingredient");
            }
        });
    }); 
} 
    //////// Fonction d'ecoute de la saisie de la recherche principale
searchTop.addEventListener("keyup", function(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90  || event.keyCode ==50 || event.keyCode ==55 || event.keyCode==48){ 
        ++ counter; } 

    if (counter <= 3){
        main.innerHTML = ``;
        allRecipesFiltered=[];
        if(filterValue.length == false){
            displayRecipe(allRecipes)
        } 
        else {
            displayRecipe(tagRecipe)
        }

    } 

    if (event.keyCode == 8){ //8 = backspace
        --counter
        if (counter < 0){ 
            counter = 0;
        } 
    }
    if (counter >= 3){  // valeur lue uniquement si il y a 3 caractères ou + (é/è/à compris)
            directInput = searchTop.value.toLowerCase().replace(/[éêëè]/g,'e').replace(/[àäâ]/g, 'a').replace(/["'"]/g,' ').replace(/["îï"]/g,'i');
            searchValue=directInput;
           // on vide les arrays car ils ne correspondent plus à la recherche ils seront remplis au display des recetes filtrées 
            IngredTable=[]; AppTable=[]; UstArray=[]; UstTable=[];allRecipesFiltered=[];
        if(tagRecipe.length == false){
            filterTop(directInput,allRecipes);
        } 
        else {
            filterTop(directInput,tagRecipe);
        }
    }  
})
 // Fonction de filtre suite a la saisie
function filterTop(a,b){
    b.forEach(recette => {
        let ingredInclude = false;
        let nameDescInclude = false;
        let name= recette.name.toLowerCase();
        let desc= recette.description.toLowerCase();
        let ingredients= recette.ingredients;

        ingredients.forEach(ingred =>{   
            let ingredient = ingred.ingredient.toLowerCase();  
            if(ingredient.includes(a)){
                ingredInclude = true ;
            } 
        });
        
        if(name.includes(a) || desc.includes(a)){
                nameDescInclude = true;
        }  

        if (nameDescInclude == true || ingredInclude == true){
            if(allRecipesFiltered.includes(recette) == false){
                 allRecipesFiltered.push(recette);
            }
        }        
    });
    main.innerHTML = ``;
    displayRecipe(allRecipesFiltered);
    checkIfEmpty(); 
} 
    
function checkIfEmpty(){
    if (main.hasChildNodes()== false) {
        document.getElementById("listRecipes").innerHTML = `<p id="error">Aucune recette ne correspond à votre critère... 
        </br>vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>` ;
    }
}
    //////// fonction qui cherche tous les tags ingredient ou appareils pour les mettre en array
function search(a,source){
    let lower= a.toLowerCase().replace(/[éêëè]/g,'e').replace(/[àäâ]/g, 'a').replace(/["'"]/g,' ').replace(/["îï"]/g,'i');
    if(source == "ingredient"){
        if(IngredTable.includes(lower)==false){
            IngredTable.push(lower);
    }}
    if(source == "appliance"){
        if(AppTable.includes(lower)==false){
            AppTable.push(lower);
    }}  
}
    // fonction qui cherche tous les tags ustensiles pour les mettre en array
function  CreateUstList(ust){
    UstArray.push(ust) 
    searchUst();
}
function searchUst(){ 
    UstArray.forEach(function(a){
        a.forEach(function(b){
            let lower= b.toLowerCase().replace(/[éêëè]/g,'e').replace(/[àäâ]/g, 'a').replace(/["'"]/g,' ').replace(/["îï"]/g,'i');
            if(UstTable.includes(lower)==false){
                 UstTable.push(lower);
             }
         });
     });    
 }
    //////// fonction qui map les tag de chaque catégories au clic sur la fleche vers le bas
function display(formColor,btn,color){
    document.getElementById(formColor).classList.remove('miniform');
    document.getElementById(formColor).classList.add('maxiform');
    document.getElementById(btn).innerHTML = `<i class="fa-solid fa-angle-up"  onclick="closeTagList('${formColor}','${btn}','${color}')"></i>`;

    if(color == "blue"){ 
        IngredTable.sort();
        document.getElementById(color).innerHTML = `${IngredTable.map(function (listIngredients){
            return listDesign(listIngredients,color) }).join('')}` 
    }
    if(color == "green"){
        AppTable.sort();
        document.getElementById(color).innerHTML = `${AppTable.map(function(listApp){
            return listDesign(listApp ,color);}).join('')}` 
    }
    if(color == "red"){ 
        UstTable.sort();
        document.getElementById(color).innerHTML = `${UstTable.map(function (listUst){
            return listDesign(listUst,color)}).join('')}` 
    }
}
function listDesign(a,color){
    if(color == "blue"){ return `<li id="${a}List" onclick="filterTag( '${a}','blue');addFilter('${a}') ; closeTagList('formBlue','buttonDownBlue','blue'); cleanTagInput('blue')">${a} </li>`}  
    if(color == "green"){return `<li id="${a}List" onclick="filterTag( '${a}','green');addFilter('${a}') ; closeTagList('formGreen','buttonDownGreen','green');cleanTagInput('green')">${a} </li>` }  
    if(color == "red"){  return `<li id="${a}List" onclick="filterTag( '${a}','red');addFilter('${a}');closeTagList('formRed','buttonDownRed','red');cleanTagInput('red')">${a} </li>`  }  
}
function closeTagList(formColor,btn,color){ 
    document.getElementById(formColor).classList.remove('maxiform');
    document.getElementById(formColor).classList.add('miniform');
    document.getElementById(btn).innerHTML = `<i class="fa-solid fa-angle-down"  onclick="display('${formColor}','${btn}','${color}')"></i>`;
    document.getElementById(color).innerHTML = ``;
} 
function filterTag(tag, color){ 
    let tagList = document.getElementById(tag+'List');
    tagList.removeAttribute("onclick");
    tagList.classList.add("disabled");
    document.getElementById("tags").innerHTML += `<span class="tagSelected ${color}" id="${tag}">${tag}<i class="fa-regular fa-circle-xmark" onclick="closeFilterTag('${tag}','${color}'); removeFilter('${tag}')"></i></span>`;
}
function closeFilterTag(tag, color){
    let tagList = document.getElementById(tag+'List');
    document.getElementById(tag).remove();
    if(tagList != null){
        tagList.classList.remove("disabled");
        tagList.setAttribute('onclick','filterTag("'+tag+'","'+color+'")'); 
    }
}
    // fonctions qui ajoutent ou retire un tag du tableau de filtre
function addFilter(id){
    filterValue.push(id);
    if(counter>=3){ tagCheck(allRecipesFiltered) }
    else if(counter<3){ tagCheck(allRecipes) }
}
function removeFilter(id){
    filterValue.pop(id);
     if(counter>=3){ tagCheck(allRecipesFiltered) }
     if(counter<3){ tagCheck(allRecipes) }
    
}
function tagCheck(a){
    tagRecipe=[];
    let valueChecker = (array,tags) => tags.every(e => array.includes(e));     // fonction qui compare les arrays
    a.forEach(recipe => { 
        let filterlistRecipe=[] ;
        let ingredients = recipe.ingredients;
        let appliance = recipe.appliance;
        let ustensils= recipe.ustensils;
        // permet de mettre tous les ingredients ustensiles et appareils de la recette en un array pour comparer
        ingredients.forEach(e => { 
            e = e.ingredient.toLowerCase().replace(/[éêëè]/g,'e').replace(/[àäâ]/g, 'a').replace(/["'"]/g,' ').replace(/["îï"]/g,'i');
            filterlistRecipe.push(e)}
        );
        ustensils.forEach(e => { 
            e = e.toLowerCase().replace(/[éêëè]/g,'e').replace(/[àäâ]/g, 'a').replace(/["'"]/g,' ').replace(/["îï"]/g,'i');
            filterlistRecipe.push(e)}
            );    
        filterlistRecipe.push(appliance.toLowerCase().replace(/[éêëè]/g,'e').replace(/[àäâ]/g, 'a').replace(/["'"]/g,' ').replace(/["îï"]/g,'i'));
        if (valueChecker(filterlistRecipe,filterValue)) {
            tagRecipe.push(recipe)} 
    }); 
    displayRecipe(tagRecipe);
    checkIfEmpty();
} 
function checkfiltreColor(color){
    let a;
    if(color = "blue" ){ 
        a = document.getElementById("searchBlue");
        b = IngredTable;
        listernerFiltre (a,b,formBlue,btnDownBlue,blue);
    }
    if(color = "green" ){ 
        a = document.getElementById("searchGreen");
        b = AppTable;
        listernerFiltre (a,b,formGreen,btnDownGreen,green);
    }
    if(color = "red" ){   
        a = document.getElementById("searchRed");
        b = UstTable;
        listernerFiltre (a,b,formRed,btnDownRed,red);
    }  
}
//////// Fonction d'ecoute de la saisie de la recherche secondaire (tags)
function listernerFiltre (source,table,formColor,btn,color) {
    source.addEventListener("keyup", function(event) {
       
        if (event.keyCode >= 65 && event.keyCode <= 90  || event.keyCode ==50 || event.keyCode ==55 || event.keyCode==48 ){ 
            ++ counterFilter; 
        }  
        if (event.keyCode == 8){
            -- counterFilter ; 
            threeLetterFilter(table,formColor,btn,color) ;    
        }
         if (counterFilter <= 0)  {
                counterFilter = 0;
                inputFilter ='';
            }
        if (counterFilter >= 0){  
            inputFilter = source.value.toLowerCase().replace(/[éêëè]/g,'e').replace(/[àäâ]/g, 'a').replace(/["'"]/g,' ').replace(/["îï"]/g,'i');
            threeLetterFilter(table,formColor,btn,color)   
        } 
    }) 
}
function threeLetterFilter(table,formColor,btn,color){
    let tampon = [];
    table.forEach(e => {
        if(e.includes(inputFilter)){
            tampon.push(e);
        };
    });
    if (color == "blue"){ IngredTable = tampon;};
    if (color == "green"){ AppTable = tampon;};
    if (color == "red"){ UstTable = tampon; };
    display(formColor,btn,color);
}
function cleanTagInput(color){
    if(color = "blue" ){ 
        document.getElementById("searchBlue").value = "";
    }
    if(color = "green" ){ 
        a = document.getElementById("searchGreen").value = "";
    }
    if(color = "red" ){   
        a = document.getElementById("searchRed").value = "";
    }  
}