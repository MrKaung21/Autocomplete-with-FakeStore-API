const autoCompleteTag = document.querySelector(".autoCompleteInput");



let products;
const url = "https://fakestoreapi.com/products";


// fetch(url)
//     .then(response=>{
//         const responseData = response.json();
//         return responseData;
//     })
//     .then(productDataFromServer=>{
//         products = productDataFromServer;
//         console.log(products);
//         
       
//     })
//     .catch(error=>{
//         console.log("Inside catch: ", error);
//     })

async function getData(){
    const fetchData = await fetch(url);
    return await fetchData.json();
}

products = await getData();
    
console.log(products);
    const resultConainerTag = document.querySelector(".resultContainer");
    const selectedContainer = document.querySelector(".selectedContainer");

    let filteredProducts = [];
    autoCompleteTag.disabled = false;
    let indexToSelect = -1;

autoCompleteTag.addEventListener("keyup", event=>{
    
    
    if(
        event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === "Enter"
    ){
        navigateAndSelectProduct(event.key);
        return;
    }
    
    resultConainerTag.innerHTML = "";  
    const searchText = event.target.value.toLowerCase();
        if(searchText.length === 0){
            return;
        }
            indexToSelect = -1;
        filteredProducts = products.filter(product => {
            return product.title.toLowerCase().includes(searchText);
        });
        const hasProductsToShow = filteredProducts.length > 0;
        if(hasProductsToShow){
            for (let i = 0; i < filteredProducts.length; i++) {
                const productItemContainer = document.createElement('div');
                productItemContainer.id = filteredProducts[i].id;
                productItemContainer.classList.add("productItemContainer");

                const productName = document.createElement("div");
                productName.classList.add("productName");
                productName.append(filteredProducts[i].title);

                const productImage = document.createElement("img");
                productImage.classList.add("productImage");
                productImage.src = filteredProducts[i].image;

                productItemContainer.append(productName,productImage);
                resultConainerTag.append(productItemContainer);
            };
        };
    });

    
    const navigateAndSelectProduct = key => {
        if(key === "ArrowDown"){
            if(indexToSelect === filteredProducts.length-1){
                indexToSelect = -1;
                deSelectProduct();
                return;
            }

            indexToSelect += 1;
            const productItemContainerToSelect = selectProduct(indexToSelect);
            if(indexToSelect > 0){
                deSelectProduct();
            }
            productItemContainerToSelect.classList.add("selected");
        }else if (key === "ArrowUp"){
            if(indexToSelect === -1){
                return;
            }

            if(indexToSelect === 0){
                deSelectProduct();
                indexToSelect = -1;
                return;
            }
            indexToSelect--;
            deSelectProduct();
            const productItemContainerToSelect = selectProduct(indexToSelect);
            productItemContainerToSelect.classList.add("selected");
        }else{
            const selectedProduct = selectProduct(indexToSelect);

            
            
            // const productId = filteredProducts[indexToSelect].id.toString() ;
            // const selectedId = selectedProduct.id.toString();
            // if(productId === selectedId){

            //   const productName = document.createElement("div");
            //   productName.classList.add("selectedProductName");
            //   productName.append(filteredProducts[indexToSelect].title);

            //   const productImage = document.createElement("img");
            //   productImage.classList.add("selectedProductImage");
            //   productImage.src = filteredProducts[indexToSelect].image;

            //   selectedContainer.append(productName,productImage);
            
            
            // }
            
            // resultConainerTag.style.display = "block"
            
            
            
        }
    }

    function deSelectProduct(){
    const productToDeSelect = document.querySelector(".selected");
    productToDeSelect.style.backgroundColor = "white";
    productToDeSelect.firstChild.style.color = "black";
    productToDeSelect.classList.remove("selected");
    }

    function selectProduct(index){
    console.log(filteredProducts);
    
    console.log(indexToSelect);
    const productIdToSelect = filteredProducts[indexToSelect].id.toString();
    const productItemContainerToSelect = document.getElementById(productIdToSelect);
    productItemContainerToSelect.style.backgroundColor = "#237BFF";
    productItemContainerToSelect.firstChild.style.color = "white";

    return productItemContainerToSelect;
    }