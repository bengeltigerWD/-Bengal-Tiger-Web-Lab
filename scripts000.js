const products = [
    { 
        id: 1, 
        name: "Product Name 1", 
        price: 2500.00, // BDT
        images: ["https://via.placeholder.com/250", "https://via.placeholder.com/250/FF0000", "https://via.placeholder.com/250/00FF00"]
    },
    { 
        id: 2, 
        name: "Product Name 2", 
        price: 3500.00, // BDT
        images: ["https://via.placeholder.com/250", "https://via.placeholder.com/250/0000FF"]
    },
    { 
        id: 3, 
        name: "Product Name 3", 
        price: 4500.00, // BDT
        images: ["https://via.placeholder.com/250", "https://via.placeholder.com/250/FFFF00"]
    }
];

// Function to display products
function displayProducts(filteredProducts = products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear previous products
    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        // Create carousel for multiple images
        let imagesHTML = '';
        product.images.forEach((image, index) => {
            imagesHTML += `<img src="${image}" class="${index === 0 ? 'active' : ''}" alt="${product.name}">`;
        });

        productDiv.innerHTML = `
            <div class="carousel">
                ${imagesHTML}
                <div class="carousel-controls">
                    <button onclick="prevImage(${product.id})">&#10094;</button>
                    <button onclick="nextImage(${product.id})">&#10095;</button>
                </div>
            </div>
            <h3>${product.name}</h3>
            <p>৳${product.price.toFixed(2)} BDT</p> <!-- Display in BDT -->
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Search function
function searchProducts() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchInput)
    );
    displayProducts(filteredProducts);
}

// Cart functionality
let cart = [];
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    alert(`${product.name} has been added to your cart.`);
    document.getElementById('cart').textContent = `Cart (${cart.length})`;
}

// Carousel functionality
function nextImage(productId) {
    const images = document.querySelectorAll(`.product:nth-child(${productId}) .carousel img`);
    let activeIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    images[activeIndex].classList.remove('active');
    activeIndex = (activeIndex + 1) % images.length;
    images[activeIndex].classList.add('active');
}

function prevImage(productId) {
    const images = document.querySelectorAll(`.product:nth-child(${productId}) .carousel img`);
    let activeIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    images[activeIndex].classList.remove('active');
    activeIndex = (activeIndex - 1 + images.length) % images.length;
    images[activeIndex].classList.add('active');
}

// Initialize products display
document.addEventListener('DOMContentLoaded', displayProducts);
