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
// GET THE STATIC WIDTH OF THE BROWSER
let wi = window.innerWidth;
if(wi >= 768) {
    if(window.location == "https://joshiekurusu.github.io/shopnest/cart.html") {
        cartBtn.setAttribute("disabled", "disabled");
    }
    else {
        cartBtn.removeAttribute("disabled");
    }
    cartBtn.addEventListener('click', () => {
        $("#cartOffcanvas").offcanvas('show');
    });
}
else {
    if(window.location == "https://joshiekurusu.github.io/shopnest/cart.html") {
        cartBtn.setAttribute("disabled", "disabled");
    }
    else {
        cartBtn.removeAttribute("disabled");
    }
    cartBtn.addEventListener('click', () => {
        // * CHANGE THE http://127.0.0.1:5500/cart.html TO ACTUAL LINK OF THE CART PAGE
        if(window.location == "https://joshiekurusu.github.io/shopnest/cart.html") {
            location.reload();
        }
        else {
            window.location = "https://joshiekurusu.github.io/shopnest/cart.html";
        }
    });
    try {
        // HIDE THE CART SIDEBAR/OFFCANVAS WHEN THE STATIC BROWSER IS BELOW 768PX
        $("#cartOffcanvas").offcanvas('hide');
    }
    catch(err) {
        console.log(err);
    }
}
// GET THE WIDTH OF THE BROWSER WHEN RESIZING
function myFunction() {
    let wo = window.outerWidth;
    if(wo >= 768) {
         // HIDE THE FILTER & SORT OFFCANVAS WHEN THE BROWSER WIDTH IS ABOVE 768PX
        $("#filterSortOffcanvas").offcanvas('hide');
        if(window.location == "https://joshiekurusu.github.io/shopnest/cart.html") {
            cartBtn.setAttribute("disabled", "disabled");
        }
        else {
            cartBtn.removeAttribute("disabled");
        }
        cartBtn.addEventListener('click', () => {
            $("#cartOffcanvas").offcanvas('show');
        });
        try {
            // SHOW THE CATEGORY HEADER IMAGE OF ALL PRODUCTS WHEN THE BROWSER WIDTH IS ABOVE 768PX
            document.querySelector('.header-img').style.display = 'block';
        }
        catch {
            return wo;
        }
    }
    else {
        if(window.location == "https://joshiekurusu.github.io/shopnest/cart.html") {
            cartBtn.setAttribute("disabled", "disabled");
        }
        else {
            cartBtn.removeAttribute("disabled");
        }
        cartBtn.addEventListener('click', () => {
            // * CHANGE THE http://127.0.0.1:5500/cart.html TO ACTUAL LINK OF THE CART PAGE
            if(window.location == "https://joshiekurusu.github.io/shopnest/cart.html") {
                location.reload();
            }
            else {
                window.location = "https://joshiekurusu.github.io/shopnest/cart.html";
            }
        });
        // HIDE THE CART SIDEBAR/OFFCANVAS AND THE PRODUCT MODAL WHEN THE BROWSER WIDTH IS BELOW 768PX
        $("#cartOffcanvas").offcanvas('hide');
        $("#product-modal").modal('hide');
        try {
            // HIDE THE CATEGORY HEADER IMAGE OF ALL PRODUCTS WHEN THE BROWSER WIDTH IS BELOW 768PX
            document.querySelector('.header-img').style.display = 'none';
        }
        catch {
            return wo;
        }
    }
}

// CART ITEM LIST COUNTER
const cartItemCounter = document.querySelectorAll('.cart-input-group .cart-input');
const itemCounterText = document.getElementById("items-count");
let cartCounter = 0;
// CART CONTENT ELEMENTS
const itemList = document.querySelector('.item-list');
const subtotal = document.querySelector('.total');
const emptyText = document.querySelector('.empty-cart');
const offcanvasFooter = document.querySelector('.offcanvas-footer');
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

const navigationLink = document.querySelectorAll('.nav-link');
navigationLink.forEach(navLinks => {
    navLinks.addEventListener('click', (event) => {
        // GET THE ID OF THE BUTTON LINK
        let linkIdBtn = event.target.id;
        // console.log(linkIdBtn);
        // REMOVE THE ACTIVE CLASS ON THE PREVIOUS BUTTON
        navigationLink.forEach(navLink => navLink.classList.remove('active'));
        if(linkIdBtn == 1) {
            navLinks.classList.add('active');
        }
        else if(linkIdBtn == 2) {
            navLinks.classList.add('active');
        }
        else if(linkIdBtn == 3) {
            navLinks.classList.add('active');
        }
        else if(linkIdBtn == 4) {
            navLinks.classList.add('active');
        }
        else {
            return navigationLink;
        }
    });
});
// ADD ACTIVE CLASS IN NAVIGATION LINK BASED ON THE SHOPNEST PAGE
if(window.location == 'https://joshiekurusu.github.io/shopnest/' || window.location == 'https://joshiekurusu.github.io/shopnest/index.html' || window.location == 'http://127.0.0.1:5500/index.html') {
    document.getElementById('1').classList.add('active');
}
else if(window.location == 'https://joshiekurusu.github.io/shopnest/policies.html' || window.location == 'http://127.0.0.1:5500/policies.html') {
    document.getElementById('2').classList.add('active');
}
else if(window.location == 'https://joshiekurusu.github.io/shopnest/category.html' || window.location == 'http://127.0.0.1:5500/category.html') {
    document.getElementById('3').classList.add('active');
}
else if(window.location == 'https://joshiekurusu.github.io/shopnest/blog.html' || window.location == 'http://127.0.0.1:5500/blog.html') {
    document.getElementById('4').classList.add('active');
}
else {
    navigationLink.forEach(navLink => navLink.classList.remove('active'));
}