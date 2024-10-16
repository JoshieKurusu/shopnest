class Header extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
            <header>
                <!-- Navigation bar -->
                <nav class="navbar navbar-expand-md">
                    <div class="container-fluid">
                        <!-- Brand -->
                        <a href="./index.html"><img src="./img/logo-1.png" alt="ShopNest"></a>
                        <!-- Collapsible wrapper -->
                        <div class="collapse navbar-collapse" id="navbarContent">
                            <!-- Links -->
                            <ul class="navbar-nav">
                                <li class="nav-item"><a href="./index.html" class="nav-link active">Home</a></li>
                                <li class="nav-item"><a href="./policies.html" class="nav-link">Store Policies</a></li>
                                <li class="nav-item"><a href="./category.html" class="nav-link">Shop</a></li>
                                <li class="nav-item"><a href="./blog.html" class="nav-link">Blog</a></li>
                            </ul>
                        </div>
                        
                        <!-- Shopping Cart Icon -->
                        <button type="button" class="cart" id="cart-btn" data-hook="svg-icon-wrapper" data-bs-target="#cartOffcanvas" data-bs-toggle="offcanvas" aria-controls="cartOffcanvas">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" viewBox="5.7 0 105.5 126.1" preserveAspectRatio="xMinYMax meet" data-hook="svg-icon-1">
                                <path fill="#E71D1D" d="M99.8 28.4c0-1.2-0.9-2-2.1-2h-15c0 3.2 0 7.6 0 8.2 0 1.5-1.2 2.6-2.6 2.9 -1.5 0.3-2.9-0.9-3.2-2.3 0-0.3 0-0.3 0-0.6 0-0.9 0-4.7 0-8.2H40.1c0 3.2 0 7.3 0 8.2 0 1.5-1.2 2.9-2.6 2.9 -1.5 0-2.9-0.9-3.2-2.3 0-0.3 0-0.3 0-0.6 0-0.6 0-5 0-8.2h-15c-1.2 0-2 0.9-2 2L8.3 124c0 1.2 0.9 2.1 2.1 2.1h96.3c1.2 0 2.1-0.9 2.1-2.1L99.8 28.4z"></path>
                                <path fill="#E71D1D" d="M59.1 5.9c-2.9 0-2 0-2.9 0 -2 0-4.4 0.6-6.4 1.5 -3.2 1.5-5.9 4.1-7.6 7.3 -0.9 1.8-1.5 3.5-1.8 5.6 0 0.9-0.3 1.5-0.3 2.3 0 1.2 0 2.1 0 3.2 0 1.5-1.2 2.9-2.6 2.9 -1.5 0-2.9-0.9-3.2-2.3 0-0.3 0-0.3 0-0.6 0-1.2 0-2.3 0-3.5 0-3.2 0.9-6.4 2-9.4 1.2-2.3 2.6-4.7 4.7-6.4 3.2-2.9 6.7-5 11.1-5.9C53.5 0.3 55 0 56.7 0c1.5 0 2.9 0 4.4 0 2.9 0 5.6 0.6 7.9 1.8 2.6 1.2 5 2.6 6.7 4.4 3.2 3.2 5.3 6.7 6.4 11.1 0.3 1.5 0.6 3.2 0.6 4.7 0 1.2 0 2.3 0 3.2 0 1.5-1.2 2.6-2.6 2.9s-2.9-0.9-3.2-2.3c0-0.3 0-0.3 0-0.6 0-1.2 0-2.6 0-3.8 0-2.3-0.6-4.4-1.8-6.4 -1.5-3.2-4.1-5.9-7.3-7.3 -1.8-0.9-3.5-1.8-5.9-1.8C61.1 5.9 59.1 5.9 59.1 5.9L59.1 5.9z"></path>
                                <text fill="#FFFFFF" x="58.5" y="77" dy=".35em" text-anchor="middle" data-hook="items-count" id="items-count">0</text>
                            </svg>
                        </button>

                        <!-- Toggle button -->
                        <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                            <span class="toggler-icon top-bar"></span>
                            <span class="toggler-icon middle-bar"></span>
                            <span class="toggler-icon bottom-bar"></span>
                        </button>
                        
                        <!-- Search form -->
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
                <!-- Offcanvas Shopping Cart -->
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
            <style>
                header {
                    nav {
                        height: 155px;
                        padding: 0 !important;
                        .container-fluid {
                            width: 100%;
                            height: 100%;
                            padding: 20px;
                            margin: 0;
                            position: relative;
                            a img {
                                width: 62px;
                                height: 51px;
                            }
                            .navbar-collapse {
                                width: 100%;
                                height: 100vh;
                                padding-top: 58px;
                                position: absolute;
                                top: 0;
                                right: 0;
                                bottom: 0;
                                z-index: 2;
                                background-color: #FFF;
                                transition: .15s ease-in-out;
                                ul {
                                    text-align: center;
                                    font-size: clamp(0.875rem, -0.893vw + 1.429rem, 1.25rem);
                                    line-height: clamp(1.313rem, -1.339vw + 2.143rem, 1.875rem);
                                    font-family: "Raleway", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
                                    li .active {
                                        color: #000;
                                    }
                                }
                            }
                            .cart {
                                width: 36px;
                                height: 43px;
                                margin-left: auto;
                                border: none;
                                background: none;
                                svg text {
                                    font-size: 3.125rem;
                                    font-family: 'Times New Roman', Times, serif;
                                }
                            }
                            .navbar-toggler {
                                width: 51px;
                                height: 51px;
                                position: relative;
                                transition: .5s ease-in-out;
                                border: none;
                                margin-left: 10px;
                                z-index: 999;
                                span {
                                    margin: 0;
                                    padding: 0;
                                }
                                .toggler-icon {
                                    display: block;
                                    position: absolute;
                                    height: 2px;
                                    width: 50%;
                                    background: #000;
                                    opacity: 1;
                                    z-index: 999;
                                    transform: rotate(0deg);
                                    transition: .25s ease-in-out;
                                }
                                .top-bar {
                                    margin-top: 0;
                                    transform: rotate(135deg);
                                }
                                .middle-bar {
                                    margin-top: 0;
                                    opacity: 0;
                                    filter: alpha(opacity=0);
                                }
                                .bottom-bar {
                                    margin-top: 0;
                                    transform: rotate(-135deg);
                                }
                                &:focus {
                                    box-shadow: none;
                                }
                            }
                            .navbar-toggler.collapsed {
                                .top-bar {
                                    margin-top: -10px;
                                    transform: rotate(0deg);
                                }
                                .middle-bar {
                                    opacity: 1;
                                    filter: alpha(opacity=100);
                                }
                                .bottom-bar {
                                    margin-top: 10px;
                                    transform: rotate(0deg);
                                }
                            }
                            .input-group {
                                width: 100%;
                                border: 1px solid #666;
                                height: 50px;
                                margin-top: 14px;;
                                .btn {
                                    width: 40px;
                                    color: #797979;
                                    z-index: 1;
                                }
                                .form-outline {
                                    width: 80%;
                                    input {
                                        height: 100%;
                                        border: none;
                                        box-shadow: none;
                                        padding: 6px 0;
                                        &::placeholder {
                                            color: #000;
                                            font-size: 1.125rem;
                                            font-family: 'Times New Roman', sans-serif;
                                        }
                                    }
                                }
                                &:focus-within {
                                    border-color: #000;
                                    .btn {
                                        color: #000;
                                    }
                                }
                            }
                        }
                    }
                    .offcanvas {
                        width: 350px !important;
                        border: none !important;
                        .offcanvas-header {
                            background: #000;
                            height: 136px;
                            padding: 0;
                            margin: 0;
                            .column {
                                width: 100%;
                                height: 30px;
                                color: #FFF;
                                display: flex;
                                flex-direction: row;
                                justify-content: center;
                                align-items: center;
                                position: relative;
                                button {
                                    width: 18px;
                                    height: 30px;
                                    padding: 0;
                                    border: none;
                                    position: absolute;
                                    left: 30px;
                                    transition: all .15s ease-in-out;
                                    i {
                                        color: #FFF;
                                        font-size: 30px;
                                    }
                                }
                                h4 {
                                    height: 30px;
                                    margin: 0;
                                    font-size: 1.438rem;
                                    font-family: 'Times New Roman', Times, serif;
                                }
                            }
                        }
                        .offcanvas-body {
                            padding: 34px;
                            height: 100vh;
                            width: 100%;
                            display: flex;
                            align-items: center;
                            flex-direction: column;
                            .item-list {
                                width: 100%;
                                flex: 1;
                                overflow-x: hidden;
                                overflow-y: auto;
                                list-style: none;
                                margin: 0;
                                padding: 0;
                                -ms-overflow-style: none;
                                scrollbar-width: none;
                                .card {
                                    width: 282px;
                                    height: auto;
                                    display: flex;
                                    flex-direction: row;
                                    border: none;
                                    border-bottom: 1px solid #f8f6f1;
                                    border-radius: 0;
                                    margin-bottom: 30px;
                                    padding-bottom: 30px;
                                    .product-img {
                                        width: 80px;
                                        height: 80px;
                                        cursor: pointer;
                                    }
                                    .card-body {
                                        width: 100%;
                                        max-width: 170px;
                                        margin-left: 15px;
                                        padding: 0;
                                        h6, .input-group {
                                            width: 153px;
                                            font-family: 'Times New Roman', Times, serif;
                                        }
                                        .cart-product-name {
                                            margin-bottom: 5px;
                                            font-size: clamp(1rem, 0vw + 1rem, 1rem);
                                            line-height: clamp(1.5rem, 0vw + 1.5rem, 1.5rem);
                                        }
                                        .cart-product-amount {
                                            margin-bottom: 17px;
                                            font-weight: 600;
                                            font-size: clamp(1.125rem, 0vw + 1.125rem, 1.125rem);
                                            line-height: clamp(1.969rem, 0vw + 1.969rem, 1.969rem);
                                        }
                                        .input-group {
                                            width: 100%;
                                            border: 1px solid #000;
                                            max-width: 64px;
                                            height: 28px;
                                            position: relative;
                                            input[type=number] {
                                                width: 50%;
                                                margin: 0 auto;
                                                border: none;
                                                text-align: center;
                                                vertical-align: middle;
                                                font-size: clamp(0.75rem, 0vw + 0.75rem, 0.75rem);
                                                line-height: clamp(1.313rem, 0vw + 1.313rem, 1.313rem);
                                                &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
                                                    -webkit-appearance: none;
                                                    margin: 0;
                                                }
                                                &:-moz-appearance {
                                                    -moz-appearance: textfield;
                                                }
                                                &:focus {
                                                    outline: none;
                                                }
                                            }
                                            .signs {
                                                width: 12px;
                                                height: 100%;
                                                position: absolute;
                                                top: 50%;
                                                padding: 0;
                                                font-size: 8px;
                                                border: none;
                                                transform: translateY(-50%);
                                                color: #817f83;
                                                &:first-child {
                                                    left: 2px;
                                                }
                                                &:last-child {
                                                    right: 2px;
                                                }
                                                &:hover {
                                                    color: #000;
                                                }
                                            }
                                        }
                                    }
                                    .remove-btn {
                                        font-size: 8px;
                                        padding: 4px;
                                        opacity: 0;
                                        border: 1px solid #f8f6f1;
                                        border-radius: 50%;
                                        transition: all .3s ease-in-out;
                                        &:focus {
                                            box-shadow: none;
                                        }
                                    }
                                    &:hover {
                                        .remove-btn {
                                            opacity: 1;
                                        }
                                    }
                                }
                                &::-webkit-scrollbar {
                                    display: none;
                                }
                            }
                            .total {
                                width: 100%;
                                height: 76px;
                                overflow: hidden;
                                margin-top: 20px;
                                text-align: left;
                                h3 {
                                    height: 39px;
                                    margin: 0;         
                                    font-size: 1.625rem;
                                    line-height: 1.5;
                                    font-family: 'Times New Roman', Times, serif;
                                }
                            }
                            .empty-cart {
                                height: 30px;
                                margin: 0;
                                display: none;
                                font-family: 'Times New Roman', Times, serif;
                                font-size: clamp(1.125rem, 0vw + 1.125rem, 1.125rem);
                                line-height: clamp(1.969rem, 0vw + 1.969rem, 1.969rem); 
                            }
                        }
                        .offcanvas-footer {
                            height: 150px;
                            padding: 0 34px;
                            align-items: center;
                            justify-content: center;
                            a {
                                width: 100%;
                                padding: 13px;
                                color: #FFF;
                                text-align: center;
                                text-decoration: none;
                                font-size: 1.125rem;
                                font-family: 'Times New Roman', Times, serif;
                                background-color: #E71D1D;
                                &:hover {
                                    opacity: .8;
                                }
                            }
                        }
                    }
                    .show .offcanvas-header .column button {
                        transform: rotate(180deg);
                    }
                    .offcanvas-backdrop.show {
                        opacity: 0.3;
                    }
                }
                @media (min-width: 425px) {
                    header nav .container-fluid .navbar-collapse {
                        width: 60%;
                    }
                }
                @media (min-width: 576px) {
                    header nav .container-fluid .navbar-collapse {
                        width: 48%;
                    }
                }
                @media (min-width: 768px) {
                    header nav {
                        height: 121px;
                        margin: auto 20px;
                        .container-fluid {
                            height: 62px;
                            padding: 0;
                            .navbar-collapse {
                                width: auto;
                                height: 32px;
                                padding-top: 0;
                                position: static;  
                                justify-content: end;       
                                ul li a {
                                    padding: 4px 8px;
                                }
                            }
                            .cart {
                                margin-left: 21px;
                            }
                            .input-group {
                                width: 280px;
                                margin: 0 0 0 18px;
                            }
                        }
                    }
                }
                @media (min-width: 992px) {
                    header nav {
                        margin: auto 60px;
                        .container-fluid {
                            a img {
                                width: 84px;
                                height: 62px;
                            }
                            .cart {
                                margin-left: 62px;
                            }
                            .input-group {
                                width: 303px;
                                margin-right: 10px;
                            }
                        }
                    }
                }
                @media (min-width: 1200px) {
                    header nav {
                        margin: auto 94px;
                    }
                }
            </style>
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
    if(window.location == "http://127.0.0.1:5500/cart.html") {
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
    if(window.location == "http://127.0.0.1:5500/cart.html") {
        cartBtn.setAttribute("disabled", "disabled");
    }
    else {
        cartBtn.removeAttribute("disabled");
    }
    cartBtn.addEventListener('click', () => {
        // * CHANGE THE http://127.0.0.1:5500/cart.html TO ACTUAL LINK OF THE CART PAGE
        if(window.location == "http://127.0.0.1:5500/cart.html") {
            location.reload();
        }
        else {
            window.location = "http://127.0.0.1:5500/cart.html";
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
        if(window.location == "http://127.0.0.1:5500/cart.html") {
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
        if(window.location == "http://127.0.0.1:5500/cart.html") {
            cartBtn.setAttribute("disabled", "disabled");
        }
        else {
            cartBtn.removeAttribute("disabled");
        }
        cartBtn.addEventListener('click', () => {
            // * CHANGE THE http://127.0.0.1:5500/cart.html TO ACTUAL LINK OF THE CART PAGE
            if(window.location == "http://127.0.0.1:5500/cart.html") {
                location.reload();
            }
            else {
                window.location = "http://127.0.0.1:5500/cart.html";
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

// * (NEED TO FIX) PUT ACTIVE CLASS ON A ACTIVE NAV-LINK
// ADD ACTIVE CLASS IN NAVIGATION BAR LINKS TO THE CURRENT/CLICKED BUTTON
var btnContainer = document.querySelector(".navbar-nav");
// GET ALL BUTTONS WITH class="btn" INSIDE THE CONTAINER
var btn = btnContainer.querySelectorAll(".nav-link");
// LOOP THROUGH THE BUTTONS AND ADD THE ACTIVE CLASS TO THE CURRENT/CLICKED BUTTON
for (var i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    // IF THERE'S NO ACTIVE CLASS
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }
    // ADD THE ACTIVE CLASS TO THE CURRENT/CLICKED BUTTON
    this.className += " active";
  });
}

// CART ITEM LIST COUNTER
const cartItemCounter = document.querySelectorAll('.cart-input-group .cart-input');
const itemCounterText = document.getElementById("items-count");
let cartCounter = 0;

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