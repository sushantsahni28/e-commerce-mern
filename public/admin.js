var prodSheet = document.getElementById("prod-sheet")
var uptToast = document.getElementById("toast-update")
var delToast = document.getElementById("toast-delete")

function saveProduct(){
    let name = document.getElementById("name").value.trim()
    let description = document.getElementById("description").value.trim()
    let price = document.getElementById("price").value.trim()
    let quantity = document.getElementById("quantity").value.trim()
    console.log(typeof(description))
    if(name == "" || description == "" || price == "" || quantity == ""){
        alert("Some fields are empty.")
        return
    }
    if(description.length >= 250){
        alert("Description too long!!")
        return
    }
    if(name.length >= 60){
        alert("Name too long!!")
        return
    }
    var pic = document.getElementById("picture")
    if(!pic.files[0]){
        alert("Upload a picture!!")
        return
    }
    else if(pic.files[0].type.split("/")[0] !== "image"){
        alert("Uploaded file is not a picture!!")
        return
    }
    const formData = new FormData()

    formData.append("name",name)
    formData.append("description",description)
    formData.append("price",price)
    formData.append("quantity",quantity)
    formData.append("picture", pic.files[0]);

    const request = new XMLHttpRequest();
    request.open("POST", "/admin/addproduct");
    request.send(formData);

    request.addEventListener("load", function(){
        const data = JSON.parse(this.responseText)
        createListing(data)
    })
    
    document.getElementById("name").value = ""
    document.getElementById("description").value = ""
    document.getElementById("price").value = ""
    document.getElementById("quantity").value = ""
    document.getElementById("picture").value = ""
}

function createListing(item){
    var mainDiv = document.createElement("div")
    mainDiv.classList.add("d-flex", "border", "border-dark", "p-3")

    var image = document.createElement("img")
    image.src = item.image
    image.width = 180
    image.height = 180

    var formEle = document.createElement("form")
    formEle.classList.add("d-flex", "m-1")

    var labelDiv = document.createElement("div")
    labelDiv.classList.add("d-flex", "flex-column", "row-gap-4", "flex-shrink-0")

    var nameLabel = document.createElement("label")
    nameLabel.innerText = "Product Name"
    var descLabel = document.createElement("label")
    descLabel.innerText = "Product Description"
    var priceLabel = document.createElement("label")
    priceLabel.innerText = "Product Price"
    var quanLabel = document.createElement("label")
    quanLabel.innerText = "Product Quantity"

    labelDiv.append(nameLabel)
    labelDiv.append(descLabel)
    labelDiv.append(priceLabel)
    labelDiv.append(quanLabel)

    var inputDiv = document.createElement("div")
    inputDiv.classList.add("d-flex", "flex-column", "row-gap-3")

    var nameInp = document.createElement("input")
    nameInp.setAttribute("name","name")
    nameInp.setAttribute("required","true")
    nameInp.value = item.name

    var descInp = document.createElement("input")
    descInp.setAttribute("name","description")
    descInp.setAttribute("required","true")
    descInp.value = item.description

    var priceInp = document.createElement("input")
    priceInp.setAttribute("name","price")
    priceInp.setAttribute("required","true")
    priceInp.value = item.price

    var quanInp = document.createElement("input")
    quanInp.setAttribute("name","quantity")
    quanInp.setAttribute("required","true")
    quanInp.value = item.quantity

    inputDiv.append(nameInp)
    inputDiv.append(descInp)
    inputDiv.append(priceInp)
    inputDiv.append(quanInp)

    formEle.append(labelDiv)
    formEle.append(inputDiv)

    var btnDiv = document.createElement("div")
    btnDiv.classList.add("w-50", "d-flex", "flex-column", "justify-content-end", "align-items-end", "m-3", "row-gap-2")

    var uptBtn = document.createElement("button")
    uptBtn.classList.add("btn", "btn-primary", "w-50")
    uptBtn.innerText = "Update"

    var delBtn = document.createElement("button")
    delBtn.classList.add("btn", "btn-danger", "w-50")
    delBtn.innerText = "Delete"

    btnDiv.append(uptBtn)
    btnDiv.append(delBtn)

    mainDiv.append(image)
    mainDiv.append(formEle)
    mainDiv.append(btnDiv)

    //...........Event Listeners.........

    uptBtn.addEventListener("click",function(){
        if(nameInp.value.trim =="" || descInp.value.trim == "" ||
            priceInp.value.trim == "" || quanInp.value.trim == ""){
                alert("Fill all fields before updation.")
                return
        }

        var prod = {
            id: item.id,
            name: nameInp.value,
            price: priceInp.value,
            description: descInp.value,
            quantity: quanInp.value,
        }

        updateProduct(prod, function(){
            delToast.classList.add("d-none")
            uptToast.classList.remove("d-none")
            removeToast()
        })
    })

    delBtn.addEventListener("click",function(){
        var prod = {
            id: item.id,
        }

        delProduct(prod, function(){
            delToast.classList.remove("d-none")
            uptToast.classList.add("d-none")
            removeToast()
            mainDiv.remove()
        })
    })

    prodSheet.append(mainDiv)
}

/* <div class="d-flex border border-dark p-3">
        <img src="iphone.jpg" width="180" height="180">
        <form class="d-flex">
            <div class="d-flex flex-column row-gap-4 flex-shrink-0">
                <label>Product Name</label>
                <label>Product Description</label>
                <label>Product Price</label>
                <label>Product Quantity</label>
            </div>
            <div class="d-flex flex-column row-gap-3">
                <input name="name" required />
                <input name="description" required />
                <input name="price" type="text" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');"
                    required />
                <input name="quantity" type="text" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');"
                    required />
            </div>
        </form>
        <div class="w-50 d-flex flex-column justify-content-end align-items-end m-3 row-gap-2">
            <button class="btn btn-primary w-50">Update</button>
            <button class="btn btn-danger w-50">Delete</button>
        </div>
    </div> */

function getProducts(){
    var request = new XMLHttpRequest()
    request.open("GET","/admin/allproducts")
    request.send()
    request.addEventListener("load", function(){
       const allProducts = JSON.parse(this.responseText)
       allProducts.forEach(item => {
            createListing(item)
       })
    })
}

function updateProduct(prod, callback){
    var updaterequest = new XMLHttpRequest()
        updaterequest.open("POST","/admin/updateproduct")
        updaterequest.setRequestHeader("Content-type","application/json")
        updaterequest.send(JSON.stringify(prod))
        updaterequest.addEventListener("load",function(){
            callback()
        })
}
function delProduct(prod, callback){
    var deleterequest = new XMLHttpRequest()
        deleterequest.open("POST","/admin/deleteproduct")
        deleterequest.setRequestHeader("Content-type","application/json")
        deleterequest.send(JSON.stringify(prod))
        deleterequest.addEventListener("load",function(){
            if(this.responseText == "cart"){
                alert("This product is present in someone's cart")
                return
            }
            callback()
        })
}
function removeToast(){
    var timer = setTimeout(function(){
        delToast.classList.add("d-none")
        uptToast.classList.add("d-none")
    },3000)
}

