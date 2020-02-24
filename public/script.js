const $itemsContainer = document.querySelector("section#items")
const $cart = document.querySelector("section#cart ul")
let items = []
let inCart = []

loadItems()

function loadItems() {
    fetch("/items")
        .then( response => response.json() )
        .then( response => {
        console.log(response)
            createItemCards(response) 
        })
        .catch(err => console.error(err))
}

function createItemCards(_items) {
    items = _items
    const itemsHTML = _items.map(item => 
        `<div class="item">
            <h3>Name: ${item.name}</h3>            
            <button onClick="addToCart(${item.itemid}, event)">Add to Cart</button>
        </div>`
    ).join('')
    $itemsContainer.innerHTML = itemsHTML    
}

function login(event) {
    event.preventDefault()
    //create order object
    const $form = document.forms[0]
    const order = {
        user: {
            first: $form.first.value,
            last: $form.last.value,
            email: $form.email.value,
            password: $form.password.value
        }
    }
    //POST on /login
    const config = {
        method: "POST",
        body: JSON.stringify( order ),
        headers: {
            "Content-Type":"application/json"
        }
    }
    fetch("/login",config)
        .then( response => response.json() )
        .then( response => console.log(response) )
        .catch(err => console.error(err))

}

function addToCart(id, event) {
    const item = items.find(item => item.itemid == id)

    const $newItem = document.createElement("li")
    $newItem.innerHTML = 
        `${item.name}`
    $cart.append($newItem)
    inCart.push(item)
    document.querySelector("span#itemCount").innerHTML = inCart.length
}