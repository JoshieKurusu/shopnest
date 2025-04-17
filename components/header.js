class Header extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
            <header>
                <!-- NAVIGATION BAR -->
                <nav class="navbar navbar-expand-md">
                    <div class="container-fluid">
                        <!-- BRAND LOGO -->
                        <a href="./index.html"><img src="./img/icons/shopnest-logo.png" alt="ShopNest"></a>
                        <!-- Collapsible wrapper -->
                        <div class="collapse navbar-collapse" id="navbarContent">
                            <!-- LINKS -->
                            <ul class="navbar-nav">
                                <li class="nav-item"><a id="1" href="./index.html" class="nav-link">Home</a></li>
                                <li class="nav-item"><a id="2" href="./policies.html" class="nav-link">Store Policies</a></li>
                                <li class="nav-item"><a id="3" href="./category.html" class="nav-link">Shop</a></li>
                                <li class="nav-item"><a id="4" href="./blog.html" class="nav-link">Blog</a></li>
                            </ul>
                        </div>
                        
                        <!-- SHOPPING CART ICON -->
                        <button type="button" class="cart" id="cart-btn" data-hook="svg-icon-wrapper" data-bs-target="#cartOffcanvas" data-bs-toggle="offcanvas" aria-controls="cartOffcanvas">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" viewBox="5.7 0 105.5 126.1" preserveAspectRatio="xMinYMax meet" data-hook="svg-icon-1">
                                <path fill="#E71D1D" d="M99.8 28.4c0-1.2-0.9-2-2.1-2h-15c0 3.2 0 7.6 0 8.2 0 1.5-1.2 2.6-2.6 2.9 -1.5 0.3-2.9-0.9-3.2-2.3 0-0.3 0-0.3 0-0.6 0-0.9 0-4.7 0-8.2H40.1c0 3.2 0 7.3 0 8.2 0 1.5-1.2 2.9-2.6 2.9 -1.5 0-2.9-0.9-3.2-2.3 0-0.3 0-0.3 0-0.6 0-0.6 0-5 0-8.2h-15c-1.2 0-2 0.9-2 2L8.3 124c0 1.2 0.9 2.1 2.1 2.1h96.3c1.2 0 2.1-0.9 2.1-2.1L99.8 28.4z"></path>
                                <path fill="#E71D1D" d="M59.1 5.9c-2.9 0-2 0-2.9 0 -2 0-4.4 0.6-6.4 1.5 -3.2 1.5-5.9 4.1-7.6 7.3 -0.9 1.8-1.5 3.5-1.8 5.6 0 0.9-0.3 1.5-0.3 2.3 0 1.2 0 2.1 0 3.2 0 1.5-1.2 2.9-2.6 2.9 -1.5 0-2.9-0.9-3.2-2.3 0-0.3 0-0.3 0-0.6 0-1.2 0-2.3 0-3.5 0-3.2 0.9-6.4 2-9.4 1.2-2.3 2.6-4.7 4.7-6.4 3.2-2.9 6.7-5 11.1-5.9C53.5 0.3 55 0 56.7 0c1.5 0 2.9 0 4.4 0 2.9 0 5.6 0.6 7.9 1.8 2.6 1.2 5 2.6 6.7 4.4 3.2 3.2 5.3 6.7 6.4 11.1 0.3 1.5 0.6 3.2 0.6 4.7 0 1.2 0 2.3 0 3.2 0 1.5-1.2 2.6-2.6 2.9s-2.9-0.9-3.2-2.3c0-0.3 0-0.3 0-0.6 0-1.2 0-2.6 0-3.8 0-2.3-0.6-4.4-1.8-6.4 -1.5-3.2-4.1-5.9-7.3-7.3 -1.8-0.9-3.5-1.8-5.9-1.8C61.1 5.9 59.1 5.9 59.1 5.9L59.1 5.9z"></path>
                                <text fill="#FFFFFF" x="58.5" y="77" dy=".35em" text-anchor="middle" data-hook="items-count" id="items-count">0</text>
                            </svg>
                        </button>

                        <!-- MOBILE MENU BUTTON -->
                        <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                            <span class="toggler-icon top-bar"></span>
                            <span class="toggler-icon middle-bar"></span>
                            <span class="toggler-icon bottom-bar"></span>
                        </button>
                        
                        <!-- SEARCH FORM -->
                        <div class="input-group">
                            <button type="button" class="btn" data-mdb-ripple-init>
                                <i class="fa fa-search"></i>
                            </button>
                            <div class="form-outline" id="navbar-search-autocomplete" data-mdb-input-init>
                                <input type="search" id="form1" class="form-control" placeholder="Search..." />
                            </div>
                        </div>
                    </div>
                </nav>
                <!-- OFFCANVAS/SIDEBAR SHOPPING CART -->
                <div class="offcanvas offcanvas-end" tabindex="-1" id="cartOffcanvas" aria-labelledby="cartOffcanvasLabel">
                    <div class="offcanvas-header">
                        <div class="column">
                            <button type="button" class="btn" data-bs-dismiss="offcanvas" aria-label="Close"><i class="fa fa-angle-left"></i></button>
                            <h4>Cart</h4>
                        </div>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="item-list"></ul>
                        <div class="total">
                            <h3>Subtotal</h3>
                            <h3 class="total-amount">₱0.00</h3>
                        </div>
                        <h5 class="empty-cart">Cart is empty</h5>
                    </div>
                    <div class="offcanvas-footer">
                        <a href="./cart.html">View Cart</a>
                    </div>
                </div>
            </header>
        `;
    }
}
customElements.define('header-component', Header);

// SHOPPING CART BUTTON AND OFFCANVAS
const cartBtn = document.getElementById('cart-btn');
const offcanvas = document.getElementById('cartOffcanvas');

// NAMED FUNCTIONS FOR CART BUTTON BEHAVIORS
function openCartSidebar() {
    if (window.innerWidth < 768) {
        // REDIRECT TO THE CART PAGE IF THE SCREEN IS SMALL
        redirectToCartPage();
        return; // EXIT THE FUNCTION TO PREVENT FURTHER EXECUTION
    } else {
        // console.log("open cart sidebar! *INNERWIDTH");
        $("#cartOffcanvas").offcanvas('show');
    }
}

function redirectToCartPage() {
    // console.log("redirected to cart page! *INNERWIDTH");
    // window.location.href = "http://127.0.0.1:5500/cart.html";
    window.location.href = "https://joshiekurusu.github.io/shopnest/cart.html";
}

// FUNCTION TO HANDLE CART BUTTON STATE
function updateCartButton() {
    const isInnerWideScreen = window.innerWidth >= 768;
    // const isCartPage = window.location.href === "http://127.0.0.1:5500/cart.html";
    const isCartPage = window.location.href === "https://joshiekurusu.github.io/shopnest/cart.html";
    
    // ENABLE OR DISABLE THE CART BUTTON BASED ON THE CURRENT PAGE
    if (isCartPage) {
        cartBtn.setAttribute('disabled', 'true');
    } else {
        cartBtn.removeAttribute('disabled');
    }

    // CLEAN UP PREVIOUS LISTENERS
    cartBtn.removeEventListener('click', openCartSidebar);
    cartBtn.removeEventListener('click', redirectToCartPage);

    // ADD APPROPRIATE LISTENER
    if (isInnerWideScreen) {
        cartBtn.addEventListener('click', openCartSidebar);
        // console.log("YES! *INNERWIDTH", window.innerWidth);
    } else {
        cartBtn.addEventListener('click', redirectToCartPage);
        // console.log("No! *INNERWIDTH", window.innerWidth);
    }
}

// FUNCTION TO HANDLE OFFCANVAS STATE BASED ON BROWSER WIDTH
function updateOffcanvas() {
    const isInnerWideScreen = window.innerWidth >= 768;

    if (isInnerWideScreen) {
        // console.log("Yes! *INNERWIDTH", window.innerWidth);
        // Logic for wide screens
        $("#filterSortOffcanvas").offcanvas('hide') // HIDE FILTER & SORT SIDEBAR
    } else {
        // console.log("No! *INNERWIDTH", window.innerWidth);
        // Logic for narrow screens
        $("#cartOffcanvas").offcanvas('hide'); // HIDE CART SIDEBAR
        $("#product-modal").modal('hide');    // HIDE PRODUCT MODAL
    }
}

function toggleHeaderImage() {
    const isInnerWideScreen = window.innerWidth >= 768;
    const headerImage = document.querySelector('.header-img');

    if (headerImage) {
        if (isInnerWideScreen) {
            headerImage.classList.add('.show-header-img');
            headerImage.classList.remove('.hide-header-img');
        } else {
            headerImage.classList.add('.hide-header-img');
            headerImage.classList.remove('.show-header-img');
        }
        console.log(`Header image is now ${isInnerWideScreen ? 'visible' : 'hidden'}`);
    } else {
        console.error("Error: .header-img element not found in the DOM");
    }
}

// INITIALIZATION FUNCTION
function initialize() {
    updateCartButton();
    updateOffcanvas();
    toggleHeaderImage();
}

// ATTACH THE RESIZE EVENT LISTENER
window.addEventListener('resize', initialize);

// INITAL CALL TO SET THE CORRECT STATE ON THE PAGE LOAD
initialize();

// SELECT ALL NAVIGATION
function initializeNavigation() {
    const navigationLink = document.querySelectorAll('.nav-link');

    // NORMALIZE CURRENT URL TO AVOID ISSUES WITH TRAILING SLASHES
    const currentURL = window.location.href.replace(/\/$/, '');

    // MAP URLs TO NAVIGATION LINK IDs FOR EASY LOOKUP
    const pageLinks = {
        'https://joshiekurusu.github.io/shopnest': '1',
        'https://joshiekurusu.github.io/shopnest/index.html': '1',
        'http://127.0.0.1:5500/index.html': '1',
        'https://joshiekurusu.github.io/shopnest/policies.html': '2',
        'http://127.0.0.1:5500/policies.html': '2',
        'https://joshiekurusu.github.io/shopnest/category.html': '3',
        'http://127.0.0.1:5500/category.html': '3',
        'https://joshiekurusu.github.io/shopnest/blog.html': '4',
        'http://127.0.0.1:5500/blog.html': '4'
    };

    // SET ACTIVE CLASS BASED ON PAGE URL
    const activeLinkId = pageLinks[currentURL];

    if (activeLinkId) {
        navigationLink.forEach(link => link.classList.remove('active')); // RESET ALL
        document.getElementById(activeLinkId)?.classList.add('active'); // ADD THE ACTIVE CLASS
    }

    // ADD ACTIVE CLASS ON CLICK
    navigationLink.forEach(navLink => {
        navLink.addEventListener('click', (event) => {
            navigationLink.forEach(link => link.classList.remove('active'));
            event.currentTarget.classList.add('active');
        });
    });
}

// SAVE CART DATA TO LOCALSTORAGE
function saveCartData() {
    const cartItems = [];
    document.querySelectorAll('.item-list .card').forEach(cartItem => {
    const id = cartItem.getAttribute('id');
    const img = cartItem.querySelector('.product-img').src ;
    const page = cartItem.querySelector('.product-img').getAttribute('data-page');
    const name = cartItem.querySelector('.cart-product-name').textContent;
    const amount = parseFloat(cartItem.querySelector('.cart-product-amount').textContent.replace('₱', ''));
    const quantity = parseInt(cartItem.querySelector('.cart-input').value);
    cartItems.push({ id, page, img, name, amount, quantity });
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // console.log('Saved cartItems:', localStorage.getItem('cartItems'));
    
    if (cartItems.length === 0) {
        localStorage.removeItem('cartItems');
        // console.log('Cart is empty. Removed cartItems from localStorage.');
    } else {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        // console.log('Cart data saved to localStorage:', JSON.stringify(cartItems, null, 2));
    }
}

// LOAD CART DATA FROM LOCALSTORAGE
function loadCartData() {
    const savedCartItems = localStorage.getItem('cartItems');
    const savedTotalPrice = parseFloat(localStorage.getItem('totalPrice'));

    // VERIFY DOM ELEMENTS EXIST
    const itemList = document.querySelector('.item-list');
    const totalAmountElement = document.querySelector('.total-amount');

    
    if (!itemList || !totalAmountElement) {
        console.error('Required elements (.item-list or .total-amount) are missing in the DOM');
        return null;
    }

    if (savedCartItems && savedTotalPrice) {
        try {
            const cartItems = JSON.parse(savedCartItems);
            // console.log('Loaded Cart Items:', cartItems);
            // console.log('Loaded Total Price:', savedTotalPrice);
            
            // DISPLAY CART ITEMS
            cartItems.forEach(item => updateCartUI(item, itemList));

            // DISPLAY TOTAL PRICE
            if (!isNaN(savedTotalPrice)) {
                totalAmountElement.innerText = `₱${savedTotalPrice.toFixed(2)}`;
            } else {
                console.error('Invalid total price value in localStorage.');
                totalAmountElement.innerText = '₱0.00';
            }

            return cartItems; // RETURN FOR DEBUGGING PURPOSES
        } catch (error) {
            console.error('Error parsing cartItems from localStorage:', error);
            return null;
        }
    } else {
        // console.log('No cart data found in localStorage');
        return null;
    }
}

function updateCartUI(item, itemList) {
    const cartItem = document.createElement('div');
    cartItem.setAttribute("id", item.id);
    cartItem.classList.add('card');
    cartItem.innerHTML = `
        <img class="product-img" src="${item.img}" alt="${item.name}" data-page="${item.page}">
        <div class="card-body">
            <h6 class="cart-product-name">${item.name}</h6>
            <h6 class="cart-product-amount">₱${item.amount.toFixed(2)}</h6>
            <div class="input-group cart-input-group">
                <button type="button" class="btn fa fa-minus signs"></button>
                <input type="number" class="cart-input" max="99999" min="1" value="${item.quantity}">
                <button type="button" class="btn fa fa-plus signs"></button>
            </div>
        </div>
        <button type="button" class="btn-close remove-btn"></button>
    `;
    itemList.appendChild(cartItem);

    cartItemsCounter();
    removeItem();
    addQuantityEventListeners(cartItem);
}

// INITIAL SETUP
function cartItemsInitialSetup() {
    return {
        itemList: document.querySelector('.item-list'),
        subtotal: document.querySelector('.total'),
        emptyText: document.querySelector('.empty-cart'),
        offcanvasFooter: document.querySelector('.offcanvas-footer'),
        itemCounterText: document.getElementById("items-count")
    };
}
// CART ITEM LIST COUNTER
function cartItemsCounter() {
    const { itemList, subtotal, emptyText, offcanvasFooter } = cartItemsInitialSetup();
    let { itemCounterText } = cartItemsInitialSetup();

    const cartItemCounter = document.querySelectorAll('.cart-input-group .cart-input');
    let cartCounter = 0;
    
    cartItemCounter.forEach(itemCounter => {
        let counterValue = parseInt(itemCounter.value);
        let totalCountValue = cartCounter + counterValue;
        cartCounter = totalCountValue;
        itemCounterText.textContent = totalCountValue;

        // IF THERES NO ITEMS ON THE CART HIDE THE ITEM LIST, SUBTOTAL, VIEW CART BUTTON BUT WHEN THERES ITEM TOGGLE THEM TO SHOW THE ITEM AND SUBTOTAL AND HIDE THE EMPTY TEXT
        if(totalCountValue == 0) {
            itemList.style.display = 'none';
            subtotal.style.display = 'none';
            emptyText.style.display = 'block';
            offcanvasFooter.style.display = 'none';
        }
        else {
            itemList.style.display = 'block';
            subtotal.style.display = 'block';
            emptyText.style.display = 'none';
            offcanvasFooter.style.display = 'flex';
        }
    });
}

// CALCULATE THE TOTAL PRICE OF THE ITEMS ON THE CART
function updateTotalPrice() {
    const cartItems = document.querySelectorAll(".item-list .card");
    const total = document.querySelector(".total-amount");
    let sum = 0;

    cartItems.forEach(cartItem => {
        const price = parseFloat(cartItem.querySelector(".cart-product-amount").innerText.replace("₱", ""));
        const quantity = parseInt(cartItem.querySelector(".cart-input").value);
        total.classList.add('blur');

        sum += price * quantity;
    });
    setTimeout(() => {
        total.classList.remove('blur');
        total.innerHTML = "₱" + sum.toFixed(2);

        const savedTotal = document.querySelector('.total-amount').innerText.replace("₱", "");
        localStorage.setItem('totalPrice', savedTotal);
        // console.log('Saved totalPrice:', localStorage.getItem('totalPrice'));
    }, 1000)
}

// REMOVE ITEM FROM THE CART AND ALSO FROM THE LOCALSTORAGE
function removeItem() {
    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(removeItemBtn => {
        removeItemBtn.addEventListener('click', () => {
            // REMOVE THE ITEM IN THE ITEM LIST WHEN THE REMOVE BTN CLICKED
            const cardItem = removeItemBtn.parentElement;
            const itemId = cardItem.id;

            // REMOVE ITEM FROM DOM
            cardItem.remove();

            // APPLY BLUR EFFFECT CLASS TO THE TOTAL PRICE
            document.querySelector(".total-amount").classList.add('blur');

            // REMOVE ITEM FROM LOCALSTORAGE
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems = cartItems.filter(item => item.id !== itemId); // FILTER OUT THE REMOVED ITEM
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            // UPDATE THE CART ITEM COUNTER
            cartItemsCounter();
            
            setTimeout(() => {
                // UPDATE THE TOTAL PRICE
                updateTotalPrice();

                // CHECK IF THERE'S AN ITEM IN CART
                const itemCard = document.querySelector('.item-list .card');

                const { itemList, subtotal, emptyText, offcanvasFooter } = cartItemsInitialSetup();
                let { itemCounterText } = cartItemsInitialSetup();
                if(!itemCard) {
                    itemList.style.display = "none";
                    subtotal.style.display = "none";
                    emptyText.style.display = "block";
                    offcanvasFooter.style.display = "none";
                    itemCounterText.textContent = 0;
                }
            }, 1000);
        });
    });
}

// MULTIPLE INPUT NUMBER INSIDE THE CART SIDEBAR
function addQuantityEventListeners(cartItem) {
    const incrementBtn = cartItem.querySelector(".fa-plus");
    const decrementBtn = cartItem.querySelector(".fa-minus");
    const quantityInput = cartItem.querySelector(".cart-input");

    incrementBtn.addEventListener("click", () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
        updateTotalPrice(); // Update total price when quantity changes
        cartItemsCounter(); // Update item count display when quantity changes
        saveCartData(); // UPDATE THE QUANTITY ON LOCALSTORAGE
    });

    decrementBtn.addEventListener("click", () => {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
            updateTotalPrice(); // Update total price when quantity changes
            cartItemsCounter(); // Update item count display when quantity changes
            saveCartData(); // UPDATE THE QUANTITY ON LOCALSTORAGE
        }
    });

    quantityInput.addEventListener("change", () => {
        if (quantityInput.value < 1) {
            quantityInput.value = 1;
        }
        updateTotalPrice(); // Update total price when quantity changes
        cartItemsCounter(); // Update item count display when quantity changes
        saveCartData(); // UPDATE THE QUANTITY ON LOCALSTORAGE
    });
}
