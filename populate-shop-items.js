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
    const gameList = document.getElementById("navProductList").children[0].querySelector(".sub-menu");
    const consoleList = document.getElementById("navProductList").children[1].querySelector(".sub-menu");
    const accessoryList = document.getElementById("navProductList").children[2].querySelector(".sub-menu");

    products.forEach(product => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#" + product.id;
        a.textContent = product.title;

        // Prevent default anchor link behavior
        a.addEventListener("click", function(event) {
            event.preventDefault();
            scrollToProduct(product.id);
        });

        li.appendChild(a);
        li.classList.add("li_hover");

        switch (product.type) {
            case "game":
                gameList.appendChild(li);
                break;
            case "console":
                consoleList.appendChild(li);
                break;
            case "accessory":
                accessoryList.appendChild(li);
                break;
        }
    });
}

function scrollToProduct(productId) {
    const element = document.getElementById(productId);
    if (element) {
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        
        const middle = absoluteElementTop - (window.innerHeight / 2) + 100;
        
        window.scrollTo({
            top: middle,
            behavior: "smooth"  // adds smooth scrolling
        });

        // add the "bumped" class to the element
        element.classList.add("bumped");

        // remove the class after the animation
        setTimeout(() => {
            element.classList.remove("bumped");
        }, 4000);
    }
}

function populateProductList(products) {
    // Shuffle the products array
    const shuffledProducts = shuffleArray(products);
    
    // Get only the first 4 items after shuffling
    const selectedProducts = shuffledProducts.slice(0, 4);
    
    const productList = document.getElementById("productListLarge");

    selectedProducts.forEach(product => {
        const li = document.createElement("li");
        li.classList.add("product-item-large");
        li.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image id="${product.id}">
            <div class="product-details">
                <div class="product-title-description">
                    <h3 class="product-title clean-default">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                </div>
                <p class="product-price clean-default">$${product.price}</p>
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
    // Sort products to show games first
    products.sort((a, b) => {
        if (a.type === "game" && b.type !== "game") {
            return -1; // a comes first
        }
        if (a.type !== "game" && b.type === "game") {
            return 1; // b comes first
        }
        return 0; // no change in order
    });

    const productSmallList = document.getElementById("productListSmall");

    products.forEach(product => {
        const li = document.createElement("li");
        li.classList.add("product-item-small");
        li.id = product.id;
        li.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image-small">
            <div class="product-details">
                <div class="product-title-description">
                    <h3 class="product-title clean-default">${product.title}</h3>
                </div>
                <p class="product-price clean-default">$${product.price}</p>
            </div>
        `;
        productSmallList.appendChild(li);
    });
}