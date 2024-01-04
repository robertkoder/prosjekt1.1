document.addEventListener("DOMContentLoaded", function() {
    fetchProductData();
});

function fetchProductData() {
    fetch("data/products.json")
        .then(response => response.json())
        .then(products => {
            populateNavProductList(products);
            populateProductList(products);
            populateSmallProductList(products);
        })
        .catch(error => console.error("Error loading product data:", error));
}

function populateNavProductList(products) {
    const productNavList = document.getElementById("navProductList");
    products.forEach(product => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = product.title;
        li.appendChild(a);
        productNavList.appendChild(li);
    });
}

function populateProductList(products) {
    // Shuffle the products array
    const shuffledProducts = shuffleArray(products);
    
    // Get only the first 4 items after shuffling
    const selectedProducts = shuffledProducts.slice(0, 4);
    
    const productList = document.getElementById("productListLarge");
    // Clear previous items
    productList.innerHTML = "";
    
    selectedProducts.forEach(product => {
        const li = document.createElement("li");
        li.classList.add("product-item-large");
        li.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-details">
                <div class="product-title-description">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                </div>
                <p class="product-price">$${product.price}</p>
            </div>
        `;
        productList.appendChild(li);
    });
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate random index
        let j = Math.floor(Math.random() * (i + 1));
        // Swap elements at indices i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function populateSmallProductList(products) {
    const productSmallList = document.getElementById("productListSmall");
    // Clear previous items
    productSmallList.innerHTML = "";
    
    products.forEach(product => {
        const li = document.createElement("li");
        li.classList.add("product-item-small");
        li.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-details">
                <div class="product-title-description">
                    <h3 class="product-title">${product.title}</h4>
                </div>
                <p class="product-price">$${product.price}</p>
            </div>
        `;
        productSmallList.appendChild(li);
    });
}