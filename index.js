let productNameInput = document.getElementById('productNameInput')
let productPriceInput = document.getElementById('productPriceInput')
let productCategoryInput = document.getElementById('productCategoryInput')
let productDescInput = document.getElementById('productDescInput')

productContainer = []

if(localStorage.getItem('products') != null)
{
    productContainer = JSON.parse(localStorage.getItem('products'));
    displayProduct()
}

function addProduct()
{
    if(validProduct() == true)
    {
    let product = 
    {
        fullName:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescInput.value,
    }
    productContainer.push(product);
    localStorage.setItem('products' , JSON.stringify(productContainer));
    displayProduct();
    clearProduct();
    }
    else
    {
        cartoona ='Not valid Product Information'
        document.getElementById('x').innerHTML = cartoona
    }
    
}

function displayProduct()
{
    let cartoona = ``;
    for(let i = 0 ; i<productContainer.length ;i++)
    {
        cartoona+= `<tr>
        <td>${[i+1]}</td>
        <td>${productContainer[i].fullName}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].desc}</td>
        <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>
        <td><button class="btn btn-outline-warning" onclick="updateProduct(${i})">Update</button></td>
        </tr>`
    }
    document.getElementById('tableBody').innerHTML = cartoona
}

function clearProduct()
{
    productNameInput.value = '';
    productPriceInput.value = '';
    productCategoryInput.value = '';
    productDescInput.value = '';
}

function deleteProduct(deletIndex)
{
    productContainer.splice(deletIndex,1)
    localStorage.setItem('products' , JSON.stringify(productContainer));
    displayProduct()
}

function updateProduct(deletIndex)
{
    localStorage.setItem('products' , JSON.stringify(productContainer));
    console.log(productContainer);
    for(let i = 0 ; i<productContainer.length ;i++)
    {
        productNameInput.value = productContainer[i].fullName;
        productPriceInput.value = productContainer[i].price;
        productCategoryInput.value = productContainer[i].category;
        productDescInput.value = productContainer[i].desc;
    }
    productContainer.splice(deletIndex,1);
    displayProduct();
}   

function searchProduct(term)
{
    let cartoona = ``;
    for(let i = 0 ; i<productContainer.length ;i++)
    {
        if(productContainer[i].fullName.toLowerCase().includes(term.toLowerCase()) == true)
        {
        cartoona+= `<tr>
        <td>${[i]}</td>
        <td>${productContainer[i].fullName}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].desc}</td>
        <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>
        <td><button class="btn btn-outline-warning">Update</button></td>
        </tr>`
        }
    }
    document.getElementById('tableBody').innerHTML = cartoona
}

function validProduct()
{
    let regexName = /^([A-Z]|[a-z]){2,12}$/
    let regexPrice = /^[0-9]{2,12}$/
    let regexCat = /^([A-Z]|[a-z]){2,12}$/
    let regexdes = /^([A-Z]|[a-z]){2,50}$/
    if(regexName.test(productNameInput.value)&regexPrice.test(productPriceInput.value)&regexCat.test(productCategoryInput.value)&regexdes.test(productDescInput.value) == true)
    {
        return true
    }
    else
    {
        return false
    }
}