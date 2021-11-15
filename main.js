const search = document.querySelector('.search')
const recipeContainer = document.querySelector('.recipes__container')
const modal = document.querySelector('.modal')
// modal selectors
const modalImg = document.querySelector('.modal__img')
const modalTitle = document.querySelector('.modal__title')
const modalDescrip = document.querySelector('.modal__descrip')
const ingredientOne = document.querySelector('#ingred1')
const ingredientTwo = document.querySelector('#ingred2')
const ingredientThree = document.querySelector('#ingred3')

// EVENT LISTENERS
search.addEventListener('click', toggleSearch)
recipeContainer.addEventListener('click', openModal)
modal.addEventListener('click', closeModal)

// toggle search
function toggleSearch(e){
    if(e.target.classList.contains('search__icon')){
        const searchItem = document.querySelectorAll('.search__item')

        searchItem.forEach((item)=>{
            item.classList.toggle('hide')
        })
    }
}

// open modal when 'see more' btn is clicked
function openModal(e){
    if(e.target.classList.contains('recipe__btn')){
        modal.style.display = 'flex'
        // get id of recipe clicked
        let itemId = parseInt(e.target.parentElement.parentElement.id)
        // display recipe with the selected Id
        displayRecipe(itemId)
        
    }
}

// display the recipe inside the modal
function displayRecipe(id){
    fetch('./data.json')
    .then(response =>{
        return response.json()
    })
    .then(data => {
        data.forEach(function(item){
            if(item.id === id){
                console.log(item)
                modalImg.src = item.image
                modalTitle.innerHTML = item.title
                modalDescrip.innerHTML = item.description
                ingredientOne.innerHTML = item.ingredientOne
                ingredientTwo.innerHTML = item.ingredientTwo
                ingredientThree.innerHTML = item.ingredientThree
            }
        })
    })
}

// close modal by clicking the background
function closeModal(e){
    if(e.target.classList.contains('modal')){
        modal.style.display = 'none'
    }
}

// generate the recipes
function generateCards(item){
    const div = document.createElement('div')
    div.classList = 'recipe'
    div.id = item.id
    div.innerHTML = `
    <img src="${item.image}" class="recipe__img">
    <div class="recipe__info">
        <span class="recipe__date">
            <small>${item.date}</small>
        </span>
        <h3 class="recipe__title">
            ${item.title}
        </h3>
        <div class="underline"></div>
        <p>${item.description}</p>
        <button class="recipe__btn">
            See more
        </button>
    </div>
    `;
    recipeContainer.insertAdjacentElement('beforeend', div)
}

// load data and generate a card for each item
function loadData(){
    fetch('./data.json')
    .then(response =>{
        return response.json()
    })
    .then(data =>{
        data.forEach(function(item){
            generateCards(item)
        })
    })
}

loadData()