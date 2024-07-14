// side nav bar ----------------------------------------------- Done
// search by meal name , first letter ------------------------- Done
// categories -- display categories then meals ---------------- Done     
// area -- display area then meals  --------------------------- Done
// ingredients -- display ingredients then meals -------------- Done
// contact us -- sign up form --------------------------------- Done
// display meals  --------------------------------------------- Done
// display meal details --------------------------------------- Done
// loading ----------------------------------------------------  X                                        
// auto close ------------------------------------------------- Done
// Li animation -----------------------------------------------  X 

let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");

$(document).ready(() => {
    searchByName("");
})

$('.optionsIcon').click(function(){
    let sideWidth = $('.optionsSide').outerWidth()
    let optionsLeft = $('.options').offset().left;
    if(optionsLeft === 0){
    $('.options').css({left:`-${sideWidth}px`,transition:'left 1s'})
    
    $(".optionsIcon").addClass("fa-align-justify");
    $(".optionsIcon").removeClass("fa-x");
    
    }else{
      $('.options').css({left:`0px`,transition:'left 1s'})

      $(".optionsIcon").addClass("fa-x");
      $(".optionsIcon").removeClass("fa-align-justify");

    }
    });

    function autoClose(){
        let sideWidth = $('.optionsSide').outerWidth()
        $('.options').css({left:`-${sideWidth}px`,transition:'left 1s'})
    
        $(".optionsIcon").addClass("fa-align-justify");
        $(".optionsIcon").removeClass("fa-x");
    }

    function displayMeals(index) {
        let box = "";
        for (let i = 0; i < index.length; i++) {
            box += `
            <div class="col-md-3">
                    <div onclick="getMealDetails('${index[i].idMeal}')" class="card">
                        <img class="w-100 rounded-2" src="${index[i].strMealThumb}">
                        <div class="layer d-flex flex-column align-items-center justify-content-center text-black p-2">
                            <h3>${index[i].strMeal}</h3>
                        </div>
                    </div>
            </div>
            `
        }
        rowData.innerHTML = box
    }

    async function getCategories() {
        rowData.innerHTML = "";
        searchContainer.innerHTML = "";

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        response = await response.json()

        displayCategories(response.categories)
    }

    function displayCategories(index){
        let box='';
        for(let i=0;i<index.length;i++){
            box +=`
            <div class="col-md-3">
            <div  onclick="getCategoryMeals('${index[i].strCategory}')" class="card bg-black">
                <img src="${index[i].strCategoryThumb}" class="w-100 rounded-2" alt="..."/>
                <div class="layer d-flex flex-column justify-content-center align-items-center" >
                    <h2 class="fw-bold">${index[i].strCategory}</h2>
                    <p class="text-center">${index[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
            </div>
            </div>
            `
        }
        rowData.innerHTML = box;

    }

    async function getArea() {
        rowData.innerHTML = "";
        searchContainer.innerHTML = "";

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        response = await response.json()
        
        displayArea(response.meals)
    }
    
    function displayArea(index) {
        let box = "";
    
        for (let i = 0; i < index.length; i++) {
            box += `
            <div class="col-md-3">
                    <div onclick="getAreaMeals('${index[i].strArea}')" class="border border-warning-subtle rounded-2 py-4 text-center text-warning">
                            <i class="fa-solid fa-house-laptop fs-1"></i>
                            <h5>${index[i].strArea}</h5>
                    </div>
            </div>
            `
        }
    
        rowData.innerHTML = box;
    }

    async function getIngredients() {

        rowData.innerHTML = "";
        searchContainer.innerHTML = "";

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        response = await response.json()
        
        displayIngredients(response.meals.slice(0, 20))
    }
    
    function displayIngredients(index) {
        let box = "";
    
        for (let i = 0; i < index.length; i++) {
            box += `
            <div class="col-md-3">
                    <div onclick="getIngredientsMeals('${index[i].strIngredient}')" class="border border-warning-subtle rounded-2 text-center text-warning p-2">
                            <i class="fa-solid fa-drumstick-bite fa-4x text-secondary py-2 "></i>
                            <h3>${index[i].strIngredient}</h3>
                            <p class="text-secondary">${index[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
            </div>
            `
        }
    
        rowData.innerHTML = box
    }

    async function getCategoryMeals(category) {
        rowData.innerHTML = "";
    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        response = await response.json()
    
        displayMeals(response.meals.slice(0, 20))    
    }

    async function getAreaMeals(area) {
        rowData.innerHTML = ""
    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
        response = await response.json()
    
    
        displayMeals(response.meals.slice(0, 20))
    }

    async function getIngredientsMeals(ingredients) {
        rowData.innerHTML = ""
        
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
        response = await response.json()
    
        displayMeals(response.meals.slice(0, 20))
    }

    async function getMealDetails(mealID) {
        rowData.innerHTML = ""
    
        searchContainer.innerHTML = "";
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
        respone = await respone.json();
    
        displayMealDetails(respone.meals[0])
    }

    function displayMealDetails(meal) {
    
        searchContainer.innerHTML = "";
    
        let ingredients = ``
    
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
            }
        }
    
        let tags = meal.strTags?.split(",")
        if (!tags) tags = []
    
        let tagsStr = ''
        for (let i = 0; i < tags.length; i++) {
            tagsStr += `
            <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
        }

    
        let box = `
        <div class="col-md-4">
                    <img class="w-100 rounded-2 p-2" src="${meal.strMealThumb}"
                        alt="">
                        <h2 class="text-white p-2">${meal.strMeal}</h2>
                </div>
                <div class="col-md-8 px-1">
                    <h2 class="text-info">Instructions</h2>
                    <p class="text-secondary">${meal.strInstructions}</p>
                    <h4 class="text-white"><span class="fw-bold text-info">Area : </span>${meal.strArea}</h4>
                    <h4 class="text-white"><span class="fw-bold text-info">Category : </span>${meal.strCategory}</h4>
                    <h4 class="fw-bold text-info">Recipes :</h4>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${ingredients}
                    </ul>
    
                    <h4 class="fw-bold text-info">Tags :</h4>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${tagsStr}
                    </ul>
    
                    <a target="_blank" href="${meal.strSource}" class="btn btn-success mx-2">Source</a>
                    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>`
    
        rowData.innerHTML = box
    }

    function showSearchInputs() {
        searchContainer.innerHTML = `
        <div class="row py-4 ">
            <div class="col-md-6 ">
                <input onkeyup="searchByName(this.value)" class="form-control bg-warning-subtle" type="text" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-warning-subtle" type="text" placeholder="Search By First Letter">
            </div>
        </div>`
    
        rowData.innerHTML = ""
    }
    
    async function searchByName(term) {
        rowData.innerHTML = ""
    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        response = await response.json()
    
        response.meals ? displayMeals(response.meals) : displayMeals([])
    }
    
    async function searchByFLetter(term) {
        rowData.innerHTML = ""
    
        term == "" ? term = "a" : "";
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
        response = await response.json()
    
        response.meals ? displayMeals(response.meals) : displayMeals([])
       
    }


// Contact Form --------------------------------------

    let submitBtn;

    function showContacts(){       
        rowData.innerHTML=`
        <div class="contact bg-black d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
        <div class="row g-4 ">
            <div class="col-md-6">
                <input id="inputName" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                 <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="inputEmail" onkeyup="inputsValidation()" type="Email" class="form-control" placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="inputPhone" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Phone">
                 <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="inputAge" onkeyup="inputsValidation()" type="number" class="form-control" placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="inputPassword" onkeyup="inputsValidation()" type="password" class="form-control" placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="inputRepassword" onkeyup="inputsValidation()" type="password" class="form-control" placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class=" btn btn-outline-danger px-2 mt-3"> Submit </button>
        </div>
        </div>`

        submitBtn = document.getElementById("submitBtn")

        document.getElementById("inputName").addEventListener("focus", () => {
            nameInputTouched = true
        })
    
        document.getElementById("inputEmail").addEventListener("focus", () => {
            emailInputTouched = true
        })
    
        document.getElementById("inputPhone").addEventListener("focus", () => {
            phoneInputTouched = true
        })
    
        document.getElementById("inputAge").addEventListener("focus", () => {
            ageInputTouched = true
        })
    
        document.getElementById("inputPassword").addEventListener("focus", () => {
            passwordInputTouched = true
        })
    
        document.getElementById("inputRepassword").addEventListener("focus", () => {
            repasswordInputTouched = true
        })
    }

    let nameInputTouched = false;
    let emailInputTouched = false;
    let phoneInputTouched = false;
    let ageInputTouched = false;
    let passwordInputTouched = false;
    let repasswordInputTouched = false;


    function inputsValidation() {
        if (nameInputTouched) {
            if (nameValidation()) {
                document.getElementById("nameAlert").classList.replace("d-block", "d-none")
    
            } else {
                document.getElementById("nameAlert").classList.replace("d-none", "d-block")
    
            }
        }
        if (emailInputTouched) {
    
            if (emailValidation()) {
                document.getElementById("emailAlert").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("emailAlert").classList.replace("d-none", "d-block")
    
            }
        }
    
        if (phoneInputTouched) {
            if (phoneValidation()) {
                document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
    
            }
        }
    
        if (ageInputTouched) {
            if (ageValidation()) {
                document.getElementById("ageAlert").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("ageAlert").classList.replace("d-none", "d-block")
    
            }
        }
    
        if (passwordInputTouched) {
            if (passwordValidation()) {
                document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
    
            }
        }
        if (repasswordInputTouched) {
            if (repasswordValidation()) {
                document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
    
            }
        }
    
        if (nameValidation() &&
            emailValidation() &&
            phoneValidation() &&
            ageValidation() &&
            passwordValidation() &&
            repasswordValidation()) {
            submitBtn.removeAttribute("disabled")
        } else {
            submitBtn.setAttribute("disabled", true)
            
        }
    }

    function nameValidation() {
        return (/^[a-zA-Z ]+$/.test(document.getElementById("inputName").value))
    }
    
    function emailValidation() {
        return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("inputEmail").value))
    }
    
    function phoneValidation() {
        return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("inputPhone").value))
    }
    
    function ageValidation() {
        return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("inputAge").value))
    }
    
    function passwordValidation() {
        return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("inputPassword").value))
    }
    
    function repasswordValidation() {
        return document.getElementById("inputRepassword").value == document.getElementById("inputPassword").value
    }