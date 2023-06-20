/*<div class="d-flex flex-column border border-dark mw-100 p-2">
    <img src="/random-dice.jpg" width="210" height="210">
    <p style="font-size: 30px;">
        <%= products[i].name %>
    </p>
        <p style="margin-top: -20px;">Price: <%= products[i].price %>
    </p>
    <div style="margin-top: -10px;">
        <button class="btn btn-dark">Add to Cart</button>
        <button class="btn btn-light">
            View Desc
        </button>
    </div>
    <div id="myModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
        <span class="close">&times;</span>
        <p>Some text in the Modal..</p>
    </div>

    </div>
</div> */
var count = 0
var mainWindow = document.getElementById("main-window")
function createProduct(item){
    //const item = {name:"Dice", price: "50", description:"used to play ludo and snakes & ladders", image: "/random-dice.jpg"}
    var card = document.createElement("div")
    card.classList.add("d-flex", "flex-column", "border", "border-dark", "mw-100", "p-2")

    var image = document.createElement("img")
    image.src = item.image
    image.setAttribute("width","210")
    image.setAttribute("height","210")

    var nameEle = document.createElement("p")
    nameEle.style.fontSize = "30px"
    nameEle.innerText = item.name

    var priceEle = document.createElement("p")
    priceEle.style.marginTop= "-20px"
    priceEle.innerText = "Price: "+item.price

    var buttonEle = document.createElement("div")
    buttonEle.style.marginTop= "-10px"

    var addCart = document.createElement("button")
    addCart.classList.add("btn", "btn-dark")
    addCart.innerText = "Add to Cart"

    var desc = document.createElement("button")
    desc.classList.add("btn", "btn-light")
    desc.innerText = "View Desc"

    var modalEle = document.createElement("div")
    modalEle.classList.add("modal")

    var contentEle = document.createElement("div")
    contentEle.classList.add("modal-content")

    var close = document.createElement("span")
    close.classList.add("close")
    close.innerHTML = "&times;"

    var descEle = document.createElement("p")
    descEle.innerHTML = "<h3>Description: </h3>"+item.description

    var quantEle = document.createElement("p")
    quantEle.innerHTML = "<h4>Quantity: </h4>"+item.quantity

    contentEle.append(close)
    contentEle.append(image)
    contentEle.append(descEle)
    contentEle.append(quantEle)

    modalEle.append(contentEle)

    buttonEle.append(addCart)
    buttonEle.append(desc)

    card.append(image)
    card.append(nameEle)
    card.append(priceEle)
    card.append(buttonEle)
    card.append(modalEle)

    desc.addEventListener("click", function() {
        modalEle.style.display = "block";
    })

    close.addEventListener("click",function() {
        modalEle.style.display = "none";
    })

    addCart.addEventListener("click",function(){

        var prod = {prodid: item.id, prodquantity: item.quantity}

        let request = new XMLHttpRequest()
        request.open("POST","/products/addtocart")
        request.setRequestHeader('Content-type', 'application/json');
        request.send(JSON.stringify(prod))
        
        request.addEventListener("load", function(){
            let action = this.responseText
            if(action == "login"){
                location.replace("http://localhost:3000/login")
            }
            else if(action == "notVerified"){
                location.replace("http://localhost:3000/pending")
            }
            else if(action == "present"){
                alert("Item already present in the cart")
                addCart.innerText = "Added to Cart"
            }
            else{
                addCart.innerText = "Added to Cart"
            }
        })
    })

    return { card }
}
/* <div  class="d-flex justify-content-between w-100 mb-4">
        </div>   */
function createProductList(data){
    var list = document.createElement("div")
    list.classList.add("d-flex", "w-100", "mb-4", "flex-wrap", "justify-content-evenly")

    data.forEach(item => {
        const {card} = createProduct(item)
        list.append(card)
    });

    mainWindow.append(list)
}

function create5Products(){

    var request = new XMLHttpRequest()
    request.open("get","/products/"+count)
    request.send()
    request.addEventListener("load", function(){
        const data = JSON.parse(this.responseText)
        createProductList(data)
        if(data.length < 5){
            disableLoad()
        }
    })
    count += 5
}

var loadButton = document.getElementById("load-more")

loadButton.addEventListener("click", function(){
    create5Products()
})

function disableLoad(){
    loadButton.style.opacity = "0.6"
    loadButton.innerText = "No more products"
    loadButton.setAttribute("disabled","")
}
