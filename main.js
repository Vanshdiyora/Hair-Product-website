let menu=document.querySelector('.fa-bars')
let navBar=document.querySelector('.navbar')
let cartItems = {};
menu.addEventListener('click' ,function() {
    menu.classList.toggle('fa-times');
    navBar.classList.toggle('nav-toggle');
});


function scrollToSection(sectionId, event) {
    event.preventDefault(); 
    const section = document.querySelector(sectionId);
    const sectionPos = section.offsetTop; 

    const scrollOptions = {
        top: sectionPos,
        behavior: 'smooth' 
    };

    window.scrollTo(scrollOptions);

}


function toggleCartPanel() {
    showCartStatus()
    const cartPopup = document.getElementById('cartPopup');
    const currentTransform = cartPopup.style.transform;

    if (currentTransform === 'translateX(0%)') {
        return;
    }

    // Open the cart panel
    cartPopup.style.transform = 'translateX(0%)';
}

function closePanel() {
    const cartPopup = document.getElementById('cartPopup');
    const currentTransform = cartPopup.style.transform;
    cartPopup.style.transform = 'translateX(100%)';
}

const products = [
    { id: 'product1', name: 'Product 1', price: 10.00 },
    { id: 'product2', name: 'Product 2', price: 15.00 },
    { id: 'product3', name: 'Product 3', price: 20.00 }
];

function setupCartListeners() {
    const cartItemsElements = document.querySelectorAll('.cart-item');

    cartItemsElements.forEach(cartItem => {
        // Check if event listeners are already attached
        if (!cartItem.dataset.listenersAttached) {
            const increaseBtn = cartItem.querySelector('.increase-btn');
            const decreaseBtn = cartItem.querySelector('.decrease-btn');
            const removeBtn = cartItem.querySelector('.remove-btn');
            const productId = cartItem.getAttribute('data-product-id');

            increaseBtn.addEventListener('click', () => increaseQuantity(productId));
            decreaseBtn.addEventListener('click', () => decreaseQuantity(productId));
            removeBtn.addEventListener('click', () => removeCartItem(productId));

            // Mark listeners as attached
            cartItem.dataset.listenersAttached = true;
        }
    });
}
function showCartStatus(){
    const existingMessage = document.querySelector('.cart-empty-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    if (Object.keys(cartItems).length === 0) {
        const msg = document.createElement('li');
        msg.classList.add('cart-empty-message');
        msg.innerHTML = `
            <div class="msg">Cart is Empty</div>
        `;
        document.querySelector('.cart-items').appendChild(msg);
    }
}

function addToCart(productId) {
    let cartItem = document.querySelector(`.cart-item[data-product-id="${productId}"]`);
   
    if (!cartItem) {
        const product = products.find(prod => prod.id === productId);
        if (product) {
            const newItem = document.createElement('li');
            newItem.classList.add('cart-item');
            newItem.setAttribute('data-product-id', productId);
            newItem.innerHTML = `
                <div class="cart-item-details">
                    <h4>${product.name}</h4>
                    <p>Price: $${product.price.toFixed(2)}</p>
                    <p>Quantity: <span class="item-quantity">1</span></p>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn decrease-btn">-</button>
                    <button class="quantity-btn increase-btn">+</button>
                    <button class="remove-btn">Remove</button>
                </div>
            `;
            document.querySelector('.cart-items').appendChild(newItem);
            cartItem = newItem;

            // Initialize quantity in cartItems object
            cartItems[productId] = 1;
        }
    } else {
        increaseQuantity(productId);
    }
    // Show cart panel after adding item
    toggleCartPanel();

    // Set up event listeners for the cart items
    setupCartListeners();
}

function increaseQuantity(productId) {
    if (cartItems[productId]) {
        cartItems[productId]++;
        updateCartItemQuantity(productId);
    }
}

function decreaseQuantity(productId) {
    if (cartItems[productId] && cartItems[productId] > 1) {
        cartItems[productId]--;
        updateCartItemQuantity(productId);
    }
}

function removeCartItem(productId) {
    // Remove from cartItems object
    delete cartItems[productId];
    // Remove from UI
    const cartItem = document.querySelector(`.cart-item[data-product-id="${productId}"]`);
    if (cartItem) {
        cartItem.remove();
    }
    showCartStatus()
}

function updateCartItemQuantity(productId) {
    const cartItemElement = document.querySelector(`.cart-item[data-product-id="${productId}"]`);
    if (cartItemElement) {
        const quantityElement = cartItemElement.querySelector('.item-quantity');
        if (quantityElement) {
            quantityElement.textContent = cartItems[productId];
        }
    }
}

