var allRecipes = [];
var IngredTable = [];
var AppTable  = [];
var UstTable = [];
var UstArray = [];

fetch('recipes.json')
    .then((response) => {
        return response.json();
})
    .then((data) => {
        allRecipes = data.recipes;
        displayRecipe(allRecipes)      
});

function displayRecipe(allRecipes){ 
    document.getElementById("listRecipes").innerHTML = `${allRecipes.map(function (recipes){
        return pageDesign(recipes)
    }).join('')}`
}

// affichage des plats avec Littéraux de gabarits 
function pageDesign(recipes){
     searchApp(recipes.appliance);
     CreateUstList(recipes.ustensils);
    
    return `<article>
       <img src="/img/a.jpg" alt="placeholderimg">
       <div class="titleArticle">
           <h2>${recipes.name}</h2><span><i class="fa-regular fa-clock"></i> ${recipes.time} min</span>
           </div>
           <div class="basArticle">
               <p class="ingredientsArticle">
               ${ingredientsList(recipes.ingredients)}
               </p>
               <p class="recetteArticle">  ${recipes.description}</p>
       </div>
   </article>
   ` } 
   function ingredientsList(a){
       return `${a.map(listIngre).join('')}`
   } 
   function listIngre(a){
    if (a.hasOwnProperty("quantity") && a.hasOwnProperty("unit")){
        searchIngred (a.ingredient);
       return `<strong>${a.ingredient}</strong> : ${a.quantity} ${a.unit}  </br> `
    }
    else if (a.hasOwnProperty("unit") == false && a.hasOwnProperty("quantity")){
        searchIngred (a.ingredient);
        return `<strong>${a.ingredient}</strong> : ${a.quantity}  </br> `
    }
    else if (a.hasOwnProperty("quantity") == false && a.hasOwnProperty("unit") == false){
        searchIngred (a.ingredient);
        return `<strong>${a.ingredient}</strong>  </br> `
    }
   }

// SEARCH ingredients /////////////////////////////////////////////////////////////////////////////////////////////////////////

function searchIngred (ingred){
    var a =ingred;
    var lower= a.toLowerCase().replace(/[éêëè]/g,'e').replace(/[àäâ]/g, 'a').replace(/["'"]/g,' ').replace(/["îï"]/g,'i');
    if(IngredTable.includes(lower)==false){
        IngredTable.push(lower);
    }
    IngredTable.sort();
}

//////////////////////////////////////////////////////////////////////////
  function displayIngre(){
    document.getElementById("formBlue").classList.remove('miniform');
    document.getElementById("formBlue").classList.add('maxiform');
    document.getElementById("buttonDown").innerHTML = `<i class="fa-solid fa-angle-up"  onclick="CloseIngre()"></i>`;
    document.getElementById("blue").innerHTML = `${IngredTable.map(function (listIngredients){
        return listDesign(listIngredients)
    }).join('')}` 
  }
  function listDesign(a){
    return `
   <li>${a}</li>
   ` } 

function CloseIngre(){ 
   document.getElementById("formBlue").classList.remove('maxiform');
   document.getElementById("formBlue").classList.add('miniform');
   document.getElementById("buttonDown").innerHTML = `<i class="fa-solid fa-angle-down"  onclick="displayIngre()"></i>`;
   document.getElementById("blue").innerHTML = ``;
} 


// SEARCH Appareil /////////////////////////////////////////////////////////////////////////////////////////////////////////

function searchApp(app){
    var a = app ;
    var lower= a.toLowerCase().replace(/[éêëè]/g,'e').replace(/[àäâ]/g, 'a').replace(/["'"]/g,' ').replace(/["îï"]/g,'i');
    if(AppTable.includes(lower)==false){
        AppTable.push(lower);
    }
    AppTable.sort();
}
//////////////////////////////////////////////////////////////////////////
function displayApp(){
    document.getElementById("formGreen").classList.remove('miniform');
    document.getElementById("formGreen").classList.add('maxiform');
    document.getElementById("buttonDownGreen").innerHTML = `<i class="fa-solid fa-angle-up"  onclick="CloseApp()"></i>`;
    document.getElementById("green").innerHTML = `${AppTable.map(function (listApp){
        return listDesign(listApp)
    }).join('')}` 
  }
  function listDesign(a){
    return `
   <li>${a}</li>
   ` } 

function CloseApp(){ 
   document.getElementById("formGreen").classList.remove('maxiform');
   document.getElementById("formGreen").classList.add('miniform');
   document.getElementById("buttonDownGreen").innerHTML = `<i class="fa-solid fa-angle-down"  onclick="displayApp()"></i>`;
   document.getElementById("green").innerHTML = ``;
} 

// SEARCH Ustensiles /////////////////////////////////////////////////////////////////////////////////////////////////////////
function  CreateUstList(ust){
   UstArray.push(ust) // recup un array avec tous les arrays
}
function searchUst(){ 
    for(i=0; i<UstArray.lenght ; i++){
        for(j=0; j<UstArray[i].lenght ; j++){
            UstTable.push(UstArray[i][j]);
        }
    }
    console.log(UstTable)
    var a = UstTable ;
    var lower= a.toLowerCase().replace(/[éêëè]/g,'e').replace(/[àäâ]/g, 'a').replace(/["'"]/g,' ').replace(/["îï"]/g,'i');
    if(UstTable.includes(lower)==false){
        UstTable.push(lower);
    }
    UstTable.sort();
}
//////////////////////////////////////////////////////////////////////////
function displayUst(){
    document.getElementById("formRed").classList.remove('miniform');
    document.getElementById("formRed").classList.add('maxiform');
    document.getElementById("buttonDownRed").innerHTML = `<i class="fa-solid fa-angle-up"  onclick="CloseUst()"></i>`;
    document.getElementById("red").innerHTML = `${UstTable.map(function (listUst){
        return listDesign(listUst)
    }).join('')}` 
  }
  function listDesign(a){
    return `
   <li>${a}</li>
   ` } 

function CloseUst(){ 
   document.getElementById("formRed").classList.remove('maxiform');
   document.getElementById("formRed").classList.add('miniform');
   document.getElementById("buttonDownRed").innerHTML = `<i class="fa-solid fa-angle-down"  onclick="displayUst()"></i>`;
   document.getElementById("red").innerHTML = ``;
} 