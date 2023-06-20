var cartSheet = document.getElementById("maincard")
var blurSheet = document.getElementById("blur")
var emptyCart = document.getElementById("empty-cart")
var subTotal = document.getElementById("subtotal")
var totalPrice = document.getElementById("money")
var money = 0
/* <div class="d-flex justify-content-between border border-secondary w-75">
    <div class="d-flex">
        <img src="airpods.jpeg" width="200" height="200">
        <div class="mt-4">
            <h2>Airpods</h2>
            <p>Price: 24999</p>
        </div>
    </div>
    <div class="d-flex align-self-end justify-self-end flex-column m-4">
        <label class="text-center border border-secondary mb-2">2</label>
        <div class="d-flex justify-content-between">
            <button class="btn btn-outline-secondary">+</button>
            <button class="btn btn-outline-secondary">-</button>
        </div>
        <button class="btn btn-danger mt-2">
            <i class="bi bi-trash3"> Remove
        </button>
    </div> 
</div> */

function createCartItem(item, quantity) {
    var maindiv = document.createElement("div")
    maindiv.classList.add("d-flex", "justify-content-between", "border", "border-secondary", "w-75", "m-1")

    var firstdiv = document.createElement("div")
    firstdiv.classList.add("d-flex")

    var image = document.createElement("img")
    image.src = item.image
    image.width = 200
    image.height = 200

    var subfirstdiv = document.createElement("div")
    subfirstdiv.classList.add("mt-4")

    var nameEle = document.createElement("h2")
    nameEle.innerText = item.name

    var priceEle = document.createElement("p")
    priceEle.innerText = "Price: " + item.price

    subfirstdiv.append(nameEle)
    subfirstdiv.append(priceEle)

    var prodQuantity = document.createElement("p")
    prodQuantity.style.display = "none"
    prodQuantity.innerText = item.quantity

    firstdiv.append(image)
    firstdiv.append(subfirstdiv)
    firstdiv.append(prodQuantity)

    var seconddiv = document.createElement("div")
    seconddiv.classList.add("d-flex", "align-self-end", "justify-self-end", "flex-column", "m-4")

    var quantityEle = document.createElement("label")
    quantityEle.classList.add("text-center", "border", "border-secondary", "mb-2")
    quantityEle.innerText = quantity

    var secondsubfirst = document.createElement("div")
    secondsubfirst.classList.add("d-flex", "justify-content-between")

    var addButton = document.createElement("button")
    addButton.classList.add("btn", "btn-outline-secondary")
    addButton.innerText = "+"

    var subButton = document.createElement("button")
    subButton.classList.add("btn", "btn-outline-secondary")
    subButton.innerText = "-"

    secondsubfirst.append(addButton)
    secondsubfirst.append(subButton)

    var removeBtn = document.createElement("button")
    removeBtn.classList.add("btn", "btn-danger", "mt-2")

    var icon = document.createElement("i")
    icon.classList.add("bi", "bi-trash3")

    removeBtn.append(icon)
    removeBtn.innerHTML += " Remove"

    seconddiv.append(quantityEle)
    seconddiv.append(secondsubfirst)
    seconddiv.append(removeBtn)

    maindiv.append(firstdiv)
    maindiv.append(seconddiv)

    money += quantity * item.price
    totalPrice.innerText = "₹"+money

    //.............eventlisteners................
    addButton.addEventListener("click", function () {
        blurSheet.classList.remove("d-none")
        let itemcount = parseInt(quantityEle.innerText)
        if(itemcount < parseInt(prodQuantity.innerText)){
            itemcount++
            changeItemCount(item.id, itemcount, function () {
                quantityEle.innerText = itemcount
                money += parseInt(item.price)
                totalPrice.innerText = "₹"+money
            })
        }
        else{
            alert("Max item number reached")
        }
        blurSheet.classList.add("d-none")        
    })

    subButton.addEventListener("click", function () {
        blurSheet.classList.remove("d-none")
        let itemcount = parseInt(quantityEle.innerText)
        if(itemcount >=2){
            itemcount--
            changeItemCount(item.id, itemcount, function () {
                quantityEle.innerText = itemcount
                money -= parseInt(item.price)
                totalPrice.innerText = "₹"+money
            })
        }
        else{ alert("Quantity cannot become less than 1")}
        blurSheet.classList.add("d-none")
    })

    removeBtn.addEventListener("click", function(){
        blurSheet.classList.remove("d-none")
        deleteItem(item.id,function(){
            blurSheet.classList.add("d-none")
            money -= parseInt(item.price)*parseInt(quantityEle.innerText)
            totalPrice.innerText = "₹"+money
            checkCartSheet()
            maindiv.remove()
        })
    })
    cartSheet.append(maindiv)
}

function findProduct(){
    let allItems
    var itemrequest = new XMLHttpRequest()
    itemrequest.open("GET", "/products/cartitems")
    itemrequest.send()
    itemrequest.addEventListener("load", function () {
        allItems = JSON.parse(this.responseText)
        if(allItems.length > 0){
            emptyCart.classList.add("d-none")
            subTotal.classList.remove("d-none")
            getItemInfo(allItems)
        }
    })

}
function getItemInfo(allItems) {
    for (let i = 0; i < allItems.length; i++) {
        var cartitem = { prodid: allItems[i].productid }

        var iteminfo = new XMLHttpRequest()
        iteminfo.open("POST", "/products/info")
        iteminfo.setRequestHeader("Content-type", "application/json")
        iteminfo.send(JSON.stringify(cartitem))
        iteminfo.addEventListener("load", function () {
            let item = JSON.parse(this.responseText)
            createCartItem(item, allItems[i].quantity)
        })
    }
}

function changeItemCount(itemid, itemquantity, callback) {

    let sendItem = { itemid, itemquantity }

    var changerequest = new XMLHttpRequest()
    changerequest.open("POST", "/products/change")
    changerequest.setRequestHeader("Content-type", "application/json")
    changerequest.send(JSON.stringify(sendItem))
    changerequest.addEventListener("load", function () {
        callback()
    })
}

function deleteItem(itemid, callback){
    let sendItem = { itemid }

    var deleterequest = new XMLHttpRequest()
    deleterequest.open("POST", "/products/delete")
    deleterequest.setRequestHeader("Content-type", "application/json")
    deleterequest.send(JSON.stringify(sendItem))
    deleterequest.addEventListener("load", function () {
        callback()
    })
}

function checkCartSheet(){
    if(cartSheet.childNodes.length == 1){
        emptyCart.classList.remove("d-none")
        subTotal.classList.add("d-none")
    }
}