var productNameInput = document.getElementById('productNameInput')
var productPriceInput = document.getElementById('productPriceInput')
var productCategoryInput = document.getElementById('productCategoryInput')
var productDescInput = document.getElementById('productDescInput')

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
    var product = 
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
        window.alert('Not Valid Input')
    }
}

function displayProduct()
{
    var cartoona = ``;
    for(var i = 0 ; i<productContainer.length ;i++)
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

function searchProduct(term)
{
    var cartoona = ``;
    for(var i = 0 ; i<productContainer.length ;i++)
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
    var regex = /^[A-Z][a-z]{2,8}$/
    if(regex.test(productNameInput.value) == true)
    {
        return true
    }
    else
    {
        return false
    }
}