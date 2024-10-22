// FETCH PRODUCTS DATA FROM THE JSON FILE/REMOTE API
async function getContent() {
    try {
        const response = await fetch(
            'content.json', {
                method: 'GET',
            },
        );
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }   
    catch (error) {
        console.log(error);
    }
}
// RENDER THE PRODUCTS DATA IN THE MAIN PAGE
getContent().then(data => {
    // MAKE A CAROUSEL OF PRODUCT CARDS FROM THE PRODUCTS ARRAY ON THE JSON FILE
    function carouselCard() {
        try {
            let carouselOutput = '';
            data.products.forEach(product => {
                carouselOutput += `
                    <div class="carousel-item card ${product.category}" id="${product.id}">
                        <img src="./${product.img}" alt="${product.name}" width="240" height="240">
                        <div class="card-body">
                            <button type="button" class="btn quick-view-btn" id="${product.id}" data-bs-toggle="modal" data-bs-target="#product-modal">Quick View</button>
                            <h5 class="card-title">${product.name}</h5>
                            <h5 class="card-text">₱${product.amount}</h5>
                        </div>
                    </div>
                `;
            });
            document.getElementById('carousel').innerHTML = carouselOutput;
        }
        catch(err) {
            console.log(err);
        }
    }
    carouselCard();

    // CAROUSEL OF PRODUCTS
    const wrapper = document.querySelector(".items");
    const carousel = document.querySelector(".carousel");
    const firstCardWidth = carousel.querySelector(".carousel-item").offsetWidth;
    const arrowBtns = document.querySelectorAll(".arrow-btns");
    const carouselChildrens = [...carousel.children];
    let isDragging = false, startX, startScrollLeft;
    // GET THE NUMBER OF CARDS THAT CAN FIT IN THE CAROUSEL AT ONCE
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
    // INSERT COPIES OF THE LAST FEW CARDS TO BEGINNING OF CAROUSEL FOR INFINITE SCROLLING
    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });
    // INSERT COPIES OF THE FIRST FEW CARDS TO END OF CAROUSEL FOR INFINITE SCROLLING
    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });
    // SCROLL THE CAROUSEL AT APPROPRIATE POSITION TO HIDE FIRST FEW DUPLICATE CARDS ON FIREFOX
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
    // ADD EVENT LISTENERS FOR THE ARROW BUTTONS TO SCROLL THE CAROUSEL LEFT AND RIGHT
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        });
    });
    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        // Records the initial cursor and scroll position of the carousel
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    }
    const dragging = (e) => {
        if(!isDragging) return; // if isDragging is false return from here
        // Updates the scroll position of the carousel based on the cursor movement
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    }
    const infiniteScroll = () => {
        // If the carousel is at the beginning, scroll to the end
        if(carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }
        // If the carousel is at the end, scroll to the beginning
        else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }
    }
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);

    // IF THE INNER WIDTH ARE 320PX TO 767PX AND CLICKED THE CAROUSEL CARD/PRODUCT CARD, IT WILL NAVIGATE TO ANOTHER PAGE
    const carouselItem = document.querySelectorAll(".carousel .carousel-item");
    carouselItem.forEach(Buttons => {
        Buttons.addEventListener('click', () => {
            // GET THE STATIC INNER WIDTH OF THE BROWSER
            let iW = window.innerWidth;
            if(iW <= 767) {
                // * CHANGE THE http://127.0.0.1:5500/product.html TO ACTUAL LINK OF THE PRODUCT PAGE
                window.location = "https://joshiekurusu.github.io/shopnest/product.html";
            }
        });
    });

    // QUICK VIEW BUTTONS FROM THE CAROUSEL CARDS FOR THE 768PX HIGHER
    const quick_view = document.querySelectorAll(".quick-view-btn");
    quick_view.forEach(btn => {
        btn.addEventListener("click", (event) => {
            let targetID = event.target.id;
            const newModalContent = `
                <div class="modal-content" id="${data.products[targetID].id}">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-column-1">
                            <img src="${data.products[targetID].img}" alt="${data.products[targetID].name}">
                        </div>
                        <div class="modal-column-2">
                            <div class="col2-row-1">
                                <h4 class="product-name">${data.products[targetID].name}</h4>
                                <h4 class="product-amount">₱${data.products[targetID].amount}</h4>
                            </div>
                            <div class="col2-row-2">
                                <p>Quantity:</p>
                                <div class="input-group">
                                    <input type="number" id="input-quantity-number" aria-label="Quantity" max="99999" min="1" value="1">
                                    <div class="up-down-btns">
                                        <button type="button" class="btn fa fa-angle-up increment"></button>
                                        <button type="button" class="btn fa fa-angle-down decrement"></button>
                                    </div>
                                </div>
                            </div>
                            <div class="col2-row-3">
                                <button type="button" class="btn addToCartBtn" id="${data.products[targetID].id}">
                                    <span class="text">Add to Cart</span>
                                    <span class="falling-dots">
                                        <div class="dot"></div>
                                        <div class="dot"></div>
                                        <div class="dot"></div>
                                    </span>
                                </button>
                                <a href="https://joshiekurusu.github.io/shopnest/product.html">View More Details</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.querySelector('.modal-dialog').innerHTML = newModalContent;

            // INCREMENT AND DECREMENT OF QUANTITY ITEM IN THE MODAL CARD
            const modalInc = document.querySelector(".increment");
            const modalInput = document.querySelector("#input-quantity-number");
            const modalDec = document.querySelector(".decrement");
            let modalCounter = 1;
            // GET THE UPDATED MODAL COUNTER
            function get() {
                return modalCounter;
            }
            modalInc.addEventListener("click", () => {
                modalCounter++;
                modalInput.value = get();
                modalInput.setAttribute("value", get());
                if(modalInput.value >= 1) {
                    modalDec.removeAttribute("disabled");
                    document.querySelector(".addToCartBtn").removeAttribute("disabled");
                }
                if(modalInput.value == 99999) {
                    modalInc.setAttribute("disabled", "disabled");
                }
                else {
                    modalInc.removeAttribute("disabled");
                }
            });
            modalDec.addEventListener("click", () => {
                if(modalInput.value > 1) {
                    modalCounter--;
                    modalInc.removeAttribute("disabled");
                    modalInput.setAttribute("value", get());
                    document.querySelector(".addToCartBtn").removeAttribute("disabled");
                }
                if(modalInput.value == 1) {
                    modalCounter--;
                    modalInput.setAttribute("value", "0");
                    modalDec.setAttribute("disabled", "disabled");
                    document.querySelector(".addToCartBtn").setAttribute("disabled", "disabled");
                }
                else {
                    modalDec.removeAttribute("disabled");
                }
                modalInput.value = get();
            });

            // * (NEED TO FIX THE QUANTITY NUMBER INPUT OF THE CART WHEN THE VALUE OF MODAL INPUT NUMBER IS MORE THAN 2 QUANTITY) 
            // ADD TO CART BUTTON ANIMATION AFTER CLICKED
            const addToCartBtn = document.querySelectorAll(".addToCartBtn");
            addToCartBtn.forEach(addToCart => {
                addToCart.addEventListener("click", (event) => {
                    addToCart.classList.add("addToCartClicked");
                    setTimeout(() => {
                        let targetIDBtn = event.target.id;
                        addToCart.classList.remove("addToCartClicked");
                        // MAKE IT APPEAR ON THE SIDEBAR CART
                        try {
                            const cartItem = document.createElement('div');
                            cartItem.classList.add("card");
                            cartItem.setAttribute("id", targetIDBtn);
                            cartItem.innerHTML = `
                                <img class="product-img" id="${data.products[targetIDBtn].id}" src="${data.products[targetIDBtn].img}" alt="${data.products[targetIDBtn].name}">
                                <div class="card-body">
                                    <h6 class="cart-product-name">${data.products[targetIDBtn].name}</h6>
                                    <h6 class="cart-product-amount">₱${data.products[targetIDBtn].amount}</h6>
                                    <div class="input-group cart-input-group" id="${data.products[targetIDBtn].id}">
                                        <button type="button" class="btn fa fa-minus signs" id="minus"></button> 
                                        <input type="number" class="cart-input" id="${data.products[targetIDBtn].id}" aria-label="Quantity" max="99999" min="1" value="1">
                                        <button type="button" class="btn fa fa-plus signs" id="plus"></button>
                                    </div>
                                </div>
                                <button type="button" class="btn-close remove-btn" aria-label="Close"></button>
                            `;
                            document.querySelector('.item-list').appendChild(cartItem);

                            // HIDE THE PRODUCT MODAL AFTER THE ANIMATION OF THE ADD TO CART BUTTON AND SHOW THE SIDEBAR/OFFCANVAS CART
                            $("#product-modal").modal('hide');
                            $("#cartOffcanvas").offcanvas('show');

                            //* YOU NEED TO CHANGE ITS VALUE IF YOU CHANGE THE PRICE IN THE CONTENT.JSON FILE SO IT MATCHES THE DATA-PRICE TO THE PRODUCT PRICE
                            // PUT DATA-PRICE ATTRIBUTE OF THE ITEM BASED ON THE PRODUCT AMOUNT
                            if(targetIDBtn == 0) {
                                cartItem.setAttribute("data-price", 3649.99);
                            }
                            else if(targetIDBtn == 1) {
                                cartItem.setAttribute("data-price", 1784.99);
                            }
                            else if(targetIDBtn == 2) {
                                cartItem.setAttribute("data-price", 849.99);
                            }
                            else if(targetIDBtn == 3) {
                                cartItem.setAttribute("data-price", 3379.99);
                            }
                            else if(targetIDBtn == 4) {
                                cartItem.setAttribute("data-price", 999.99);
                            }
                            else if(targetIDBtn == 5) {
                                cartItem.setAttribute("data-price", 2794.99);
                            }
                            else if(targetIDBtn == 6) {
                                cartItem.setAttribute("data-price", 4719.99);
                            }
                            else if(targetIDBtn == 7) {
                                cartItem.setAttribute("data-price", 499.99);
                            }
                            else if(targetIDBtn == 8) {
                                cartItem.setAttribute("data-price", 799.99);
                            }
                            else if(targetIDBtn == 9) {
                                cartItem.setAttribute("data-price", 449.99);
                            }
                            else {
                                return addToCartBtn;
                            }
                        }
                        catch {
                            $("#product-modal").modal('hide');
                            return addToCartBtn;
                        }

                        // * (NEED TO FIX) CAN CALCULATE THE TOTAL PRICES BUT IT CAN ONLY ADD 1 QUANTITY EACH ITEMS
                        // CALCULATE THE TOTAL PRICE OF THE ITEMS ON THE CART
                        const priceItems = document.querySelectorAll(".cart-product-amount");
                        const total = document.querySelector(".total-amount");
                        let prices = [];
                        
                        function productPrices() {
                            if(priceItems) {
                                priceItems.forEach(priceItem => {
                                    let price = parseFloat(priceItem.innerText.replace("₱", ""));
                                    prices.push(price);
                                });
                                // console.log(prices);
                            }
                        }
                        productPrices();
                        function sumArray(prices) {
                            let sum = 0;
                            for(let i = 0; i < prices.length; i++) {
                                sum += prices[i];
                            }
                            return sum;
                        }
                        // console.log(sumArray(prices));
                        total.innerHTML = "₱" + sumArray(prices).toFixed(2);

                        // * (NEED TO FIX THIS) COMPUTE THE SUBTOTAL IF THE QUANTITY INPUT NUMBER IS MORE THAN 2
                        // const cartInputValue = document.querySelectorAll(".cart-input");
                        // const priceItem = document.querySelector(".cart-product-amount");
                        // let totalQuantity = 0;
                        // let subtotal = 0;

                        // cartInputValue.forEach(quantity => {
                        //     console.log(quantity.value);
                                
                        //     let newQuantity = quantity.value;
                        //     console.log(newQuantity);

                        //     totalQuantity = parseInt(totalQuantity) + parseInt(newQuantity);
                        //     console.log(totalQuantity);

                        //     subtotal = sumArray(prices) * parseInt(totalQuantity);
                        //     console.log("₱" + subtotal);
                        //     document.querySelector(".total-amount").innerHTML = "₱" + subtotal.toFixed(2);
                        // });                        
                        function removeItem() {
                            const removeBtns = document.querySelectorAll('.remove-btn');
                            removeBtns.forEach(removeItemBtn => {
                                removeItemBtn.addEventListener('click', () => {
                                    // REMOVE THE ITEM IN THE ITEM LIST WHEN THE REMOVE BTN CLICKED
                                    const cardItem = removeItemBtn.parentElement;
                                    // console.log(cardItem);
                                    cardItem.remove();
                                    // REMOVE SPECIFIC ITEM FROM PRICES ARRAY
                                    const removePrice = parseFloat(cardItem.getAttribute('data-price'));
                                    // console.log(removePrice);
                                    prices = prices.filter(item => item !== removePrice);
                                    console.log(prices);
                                    // UPDATE THE CART ITEM COUNTER
                                    cartItemsCounter();
                                    // console.log(parseFloat(sumArray(prices)));
                                    // UPDATE THE TOTAL PRICE
                                    setTimeout(() => {
                                        total.innerHTML = "₱" + sumArray(prices).toFixed(2);
                                        // console.log(total.innerHTML);
                                        // CHECK IF THERE'S AN ITEM IN CART
                                        const itemCard = document.querySelector('.item-list .card');
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
                        removeItem();

                        // CART ITEM LIST COUNTER
                        function cartItemsCounter() {
                            const cartItemCounter = document.querySelectorAll('.cart-input-group .cart-input');
                            let itemCounterText = document.getElementById("items-count");
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
                        }
                        cartItemsCounter();

                        // * (NEED TO FIX) WHEN THE ITEM ON THE CART IS MORE THAN 2 THE FIRST INPUT NUMBER VALUE IS ADDING BASED ON THE NUMBER OF THE ITEMS
                        // MULTIPLE INPUT NUMBER INSIDE THE CART SIDEBAR
                        var decrementButton = document.getElementsByClassName("fa-minus");
                        var incrementButton = document.getElementsByClassName("fa-plus");
                        // console.log(incrementButton);
                        for(var i = 0; i < incrementButton.length; i++) {
                            var button = incrementButton[i];
                            button.addEventListener('click', (event) => {
                                var buttonClicked = event.target;
                                // console.log(buttonClicked);
                                var input = buttonClicked.parentElement.children[1];
                                // console.log(input);
                                var inputValue = input.value;
                                // console.log(inputValue);
                                var newValue = parseInt(inputValue) + 1;
                                // console.log(newValue);
                                input.value = newValue;
                                input.setAttribute("value", newValue);
                                cartItemsCounter();
                            });
                        }
                        // console.log(decrementButton);
                        for(var i = 0; i < decrementButton.length; i++) {
                            var button = decrementButton[i];
                            button.addEventListener('click', (event) => {
                                var buttonClicked = event.target;
                                // console.log(buttonClicked);
                                var input = buttonClicked.parentElement.children[1];
                                // console.log(input);
                                var inputValue = input.value;
                                // console.log(inputValue);
                                var newValue = parseInt(inputValue) - 1;
                                // console.log(newValue);
                                if(newValue >= 1) {
                                    input.value = newValue;
                                    input.setAttribute("value", newValue);
                                    cartItemsCounter();
                                }
                                else {
                                    input.value = 1;
                                    input.setAttribute("value", newValue);
                                    cartItemsCounter();
                                }
                            });
                        }

                        // IF THE PRODUCT IMAGES IN CART CLICKED REDIRECT IT TO PRODUCT PAGE
                        function productImages(){
                            const productImage = document.querySelectorAll('.product-img');
                            productImage.forEach(productImg => {
                                productImg.addEventListener('click', () => {
                                    // * CHANGE THE http://127.0.0.1:5500/product.html TO ACTUAL LINK OF THE PRODUCT PAGE
                                    window.location = "https://joshiekurusu.github.io/shopnest/product.html";
                                });
                            });
                        }
                        productImages();
                    }, 1500);
                });
            });
        });
    });
});
// RENDER THE POSTS INFORMATION IN THE BLOG PAGE
getContent().then(information => {
    // MAKE A HTML DOM FOR THE BLOG POST IN BLOG PAGE FROM THE POSTS ARRAY ON THE JSON FILE
    const blogPost = document.getElementById('blog-post');
    function blogPostList() {
        try {
            let postList = '';
            information.posts.forEach(post => {
                postList += `
                    <article class="post-list-item" id="${post.postId}">
                        <img id="${post.postId}" class="blog-post-img" src="./${post.postImg}" alt="${post.postTitle}">
                        <div class="post-list-description">
                            <div class="post-header">
                                <div class="column-1">
                                    <img src="./${post.writersImg}" alt="${post.writersName}">
                                    <div class="post-details">
                                        <div class="row-1">
                                            <h6 class="username">${post.writersName}</h6>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" viewBox="0 0 19 19" style="fill-rule: evenodd;">
                                                <path d="M15.3812,6.495914 L12.6789333,8.77258837 C12.6191333,8.84477644 12.5099333,8.85722265 12.4354,8.79997005 C12.4215333,8.79001308 12.4094,8.77756686 12.3998667,8.76429089 L9.78686667,6.14327115 C9.67766667,5.99225704 9.46186667,5.95491839 9.305,6.05863687 C9.26946667,6.08186981 9.23913333,6.11091099 9.21573333,6.14493065 L6.60013333,8.81075677 C6.5464,8.88626383 6.43893333,8.90534803 6.3592,8.85390366 C6.34446667,8.84394669 6.33146667,8.83233022 6.32106667,8.81905425 L3.61966667,6.50587098 C3.5018,6.36149485 3.28426667,6.33577266 3.13346667,6.44861837 C3.0494,6.51167921 3,6.60792997 3,6.70998895 L4,14 L15,14 L16,6.70169148 C16,6.51831719 15.8448667,6.36979232 15.6533333,6.36979232 C15.5476,6.36979232 15.4470667,6.41625821 15.3812,6.495914 Z"></path>
                                            </svg>
                                        </div>
                                        <div class="row-2">
                                            <h6 class="date">${post.postDate}</h6>
                                            <i class="fa fa-circle"></i>
                                            <h6 class="read-time">${post.postTime}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="column-2">
                                    <div class="dropstart">
                                        <button type="button" class="fa fa-ellipsis-v" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                        <!-- Dropdown Menu -->
                                        <ul class="dropdown-menu">
                                            <li><button type="button" class="btn"><i class="fa fa-pencil-square-o"></i>Edit Post</button></li>
                                            <li><hr class="dropdown-divider"></li>
                                            <li><button type="button" class="btn"><i class="fa fa-share-square-o"></i>Share Post</button></li>
                                            <li><hr class="dropdown-divider"></li>
                                            <li><button type="button" class="btn"><i class="fa fa-bookmark-o"></i>Pin to Feed</button></li>
                                            <li><hr class="dropdown-divider"></li>
                                            <li><button type="button" class="btn"><i class="fa fa-comment-o"></i>Turn Off Commenting</button></li>
                                            <li><hr class="dropdown-divider"></li>
                                            <li><button type="button" class="btn"><i class="fa fa-trash-o"></i>Move to Trash</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="post-description">
                                <h4 class="post-title" id="${post.postId}">${post.postTitle}</h4>
                                <p class="post-paragraph" id="${post.postId}">${post.postParagraph}</p>
                            </div>
                            <hr class="solid top">
                            <div class="post-footer">
                                <div class="column-1">
                                    <div class="view-count-compact">
                                        <i class="fa fa-eye"></i>
                                        <p class="viewers-counter">${post.views}</p>
                                        <p class="text">views</p>
                                    </div>
                                    <div class="comment-count-compact">
                                        <button type="button" class="btn">
                                            <i class="fa fa-comment-o"></i>
                                            <span class="comments-counter">${post.comments}</span>
                                            <span class="text">comments</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="column-2">
                                    <div class="like-count-compact">
                                        <p class="likes-counter">${post.likes}</p>
                                        <button type="button" class="btn like-btn fa fa-heart-o"></button>
                                    </div>
                                </div>
                            </div>
                            <hr class="solid bottom">
                        </div>
                    </article>
                `;
            });
            blogPost.innerHTML = postList;
        }
        catch(err) {
            console.log(err);
        }
    }
    blogPostList();
    
    // MULTIPLE LIKE OR HEART BUTTON WITH COUNTER FOR THE BLOG
    function heartButton() {
        const likeButtons = document.querySelectorAll(".like-btn");
        likeButtons.forEach(button => {
            const counter = button.previousElementSibling;
            if(counter.textContent >= "1") {
                counter.style.visibility = "visible";
            }
            else if(counter.textContent == "0") {
                counter.style.visibility = "hidden";
            }
            else {
                console.log('error');
            }
            button.addEventListener('click', () => {
                function toggleLike() {
                    button.classList.toggle("fa-heart-o");
                    button.classList.toggle("fa-heart");
                }
                if(button.classList.contains('fa-heart-o')) {
                    toggleLike();
                    counter.textContent = parseInt(counter.textContent) + 1;
                    // console.log(counter.textContent);
                    if(counter.textContent >= 1) {
                        counter.style.visibility = "visible";
                    }
                }
                else if(button.classList.contains('fa-heart')) {
                    toggleLike();
                    counter.textContent = parseInt(counter.textContent) - 1;
                    // console.log(counter.textContent);
                    if(counter.textContent == 0) {
                        counter.style.visibility = "hidden";
                    }
                }
                else {
                    console.log("error");
                }
            })
        });
    }
    heartButton();

    // REDIRECT THE CURRENT URL TO POST URL WHEN THE IMG, TITLE, DESCRIPTION CLICKED
    const imgPost = document.querySelectorAll(".blog-post-img");
    const postDescription = document.querySelectorAll(".post-description");
    
    function toggleActiveClass() {
        blogPost.classList.toggle('blog-post');
        blogPost.classList.toggle('blog-post-list');
    }
    imgPost.forEach(img => {
        img.addEventListener("click", (event) => {
            let targetPostID = event.target.id;
            // console.log(targetPostID);
            toggleActiveClass();
            try {
                blogPost.innerHTML = `
                    <article class="blog-post-item" id="${information.posts[targetPostID].postId}">
                        <div class="blog-post-header">
                            <div class="column-1">
                                <img src="${information.posts[targetPostID].writersImg}" alt="${information.posts[targetPostID].writersName}">
                                <div class="post-details">
                                    <div class="row-1">
                                        <h6 class="username">${information.posts[targetPostID].writersName}</h6>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" viewBox="0 0 19 19" style="fill-rule: evenodd;">
                                            <path d="M15.3812,6.495914 L12.6789333,8.77258837 C12.6191333,8.84477644 12.5099333,8.85722265 12.4354,8.79997005 C12.4215333,8.79001308 12.4094,8.77756686 12.3998667,8.76429089 L9.78686667,6.14327115 C9.67766667,5.99225704 9.46186667,5.95491839 9.305,6.05863687 C9.26946667,6.08186981 9.23913333,6.11091099 9.21573333,6.14493065 L6.60013333,8.81075677 C6.5464,8.88626383 6.43893333,8.90534803 6.3592,8.85390366 C6.34446667,8.84394669 6.33146667,8.83233022 6.32106667,8.81905425 L3.61966667,6.50587098 C3.5018,6.36149485 3.28426667,6.33577266 3.13346667,6.44861837 C3.0494,6.51167921 3,6.60792997 3,6.70998895 L4,14 L15,14 L16,6.70169148 C16,6.51831719 15.8448667,6.36979232 15.6533333,6.36979232 C15.5476,6.36979232 15.4470667,6.41625821 15.3812,6.495914 Z"></path>
                                        </svg>
                                    </div>
                                    <i class="fa fa-circle first"></i>
                                    <div class="row-2">
                                        <h6 class="date">${information.posts[targetPostID].postDate}</h6>
                                        <i class="fa fa-circle second"></i>
                                        <h6 class="read-time">${information.posts[targetPostID].postTime}</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="column-2">
                                <div class="dropstart">
                                    <button type="button" class="fa fa-ellipsis-v" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                    <!-- Dropdown Menu -->
                                    <ul class="dropdown-menu">
                                        <li><button type="button" class="btn"><i class="fa fa-pencil-square-o"></i>Edit Post</button></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><button type="button" class="btn"><i class="fa fa-share-square-o"></i>Share Post</button></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><button type="button" class="btn"><i class="fa fa-bookmark-o"></i>Pin to Feed</button></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><button type="button" class="btn"><i class="fa fa-comment-o"></i>Turn Off Commenting</button></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><button type="button" class="btn"><i class="fa fa-trash-o"></i>Move to Trash</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="blog-post-description">
                            <h4 class="blog-post-title">${information.posts[targetPostID].postTitle}</h4>
                            <div class="blog-post-content">
                                <p>${information.posts[targetPostID].postParagraph}</p>
                                <p>${information.posts[targetPostID].postParagraph1}</p>
                                <p>${information.posts[targetPostID].postParagraph2}</p>
                                <p>${information.posts[targetPostID].postParagraph3}</p>
                                <p>${information.posts[targetPostID].postParagraph4}</p>
                                <p>${information.posts[targetPostID].postParagraph5}</p>
                                <p>${information.posts[targetPostID].postParagraph6}</p>
                                <p>${information.posts[targetPostID].postParagraph7}</p>
                                <p>${information.posts[targetPostID].postParagraph8}</p>
                                <p>${information.posts[targetPostID].postParagraph9}</p>
                                <p>${information.posts[targetPostID].postParagraph10}</p>
                                <p>${information.posts[targetPostID].postParagraph11}</p>
                            </div>
                        </div>
                        <img src="${information.posts[targetPostID].postImg}" alt="${information.posts[targetPostID].postTitle}" width="320" height="213">
                        <hr class="solid top">
                        <div class="social-bar">
                            <a href="#" type="button" class="btn fa fa-facebook-f"></a>
                            <a href="#" type="button" class="btn fa fa-twitter"></a>
                            <a href="#" type="button" class="btn fa fa-linkedin"></a>
                            <a href="#" type="button" class="btn fa fa-link"></a>
                        </div>
                        <hr class="solid bottom">
                        <div class="post-footer">
                            <div class="column-1">
                                <div class="view-count-compact">
                                    <i class="fa fa-eye"></i>
                                    <p class="viewers-counter">${information.posts[targetPostID].views}</p>
                                    <p class="text">views</p>
                                </div>
                                <div class="comment-count-compact">
                                    <button type="button" class="btn">
                                        <i class="fa fa-comment-o"></i>
                                        <span class="comments-counter">${information.posts[targetPostID].comments}</span>
                                        <span class="text">comments</span>
                                    </button>
                                </div>
                            </div>
                            <div class="column-2">
                                <div class="like-count-compact">
                                    <p class="likes-counter">${information.posts[targetPostID].likes}</p>
                                    <button type="button" class="btn like-btn fa fa-heart-o"></button>
                                </div>
                            </div>
                        </div>
                    </article>
                    <div class="comments">
                        <div class="row-1">
                            <h6>Comments</h6>
                            <img src="${information.posts[targetPostID].writersImg}" alt="${information.posts[targetPostID].writersName}">
                        </div>
                        <div class="row-2">
                            <input type="text" placeholder="Write a comment...">
                        </div>
                    </div>
                `;
                heartButton();
                viewCounter();
            }
            catch {
                return blogPostList();
            }  
        });
    });
    postDescription.forEach(posting => {
        posting.addEventListener("click", (event) => {
            let targetPostID = event.target.id;
            // console.log(targetPostID);
            toggleActiveClass();
            try {
                blogPost.innerHTML = `
                    <article class="blog-post-item" id="${information.posts[targetPostID].postId}">
                        <div class="blog-post-header">
                            <div class="column-1">
                                <img src="${information.posts[targetPostID].writersImg}" alt="${information.posts[targetPostID].writersName}">
                                <div class="post-details">
                                    <div class="row-1">
                                        <h6 class="username">${information.posts[targetPostID].writersName}</h6>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" viewBox="0 0 19 19" style="fill-rule: evenodd;">
                                            <path d="M15.3812,6.495914 L12.6789333,8.77258837 C12.6191333,8.84477644 12.5099333,8.85722265 12.4354,8.79997005 C12.4215333,8.79001308 12.4094,8.77756686 12.3998667,8.76429089 L9.78686667,6.14327115 C9.67766667,5.99225704 9.46186667,5.95491839 9.305,6.05863687 C9.26946667,6.08186981 9.23913333,6.11091099 9.21573333,6.14493065 L6.60013333,8.81075677 C6.5464,8.88626383 6.43893333,8.90534803 6.3592,8.85390366 C6.34446667,8.84394669 6.33146667,8.83233022 6.32106667,8.81905425 L3.61966667,6.50587098 C3.5018,6.36149485 3.28426667,6.33577266 3.13346667,6.44861837 C3.0494,6.51167921 3,6.60792997 3,6.70998895 L4,14 L15,14 L16,6.70169148 C16,6.51831719 15.8448667,6.36979232 15.6533333,6.36979232 C15.5476,6.36979232 15.4470667,6.41625821 15.3812,6.495914 Z"></path>
                                        </svg>
                                    </div>
                                    <i class="fa fa-circle first"></i>
                                    <div class="row-2">
                                        <h6 class="date">${information.posts[targetPostID].postDate}</h6>
                                        <i class="fa fa-circle second"></i>
                                        <h6 class="read-time">${information.posts[targetPostID].postTime}</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="column-2">
                                <div class="dropstart">
                                    <button type="button" class="fa fa-ellipsis-v" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                    <!-- Dropdown Menu -->
                                    <ul class="dropdown-menu">
                                        <li><button type="button" class="btn"><i class="fa fa-pencil-square-o"></i>Edit Post</button></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><button type="button" class="btn"><i class="fa fa-share-square-o"></i>Share Post</button></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><button type="button" class="btn"><i class="fa fa-bookmark-o"></i>Pin to Feed</button></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><button type="button" class="btn"><i class="fa fa-comment-o"></i>Turn Off Commenting</button></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><button type="button" class="btn"><i class="fa fa-trash-o"></i>Move to Trash</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="blog-post-description">
                            <h4 class="blog-post-title">${information.posts[targetPostID].postTitle}</h4>
                            <div class="blog-post-content">
                                <p>${information.posts[targetPostID].postParagraph}</p>
                                <p>${information.posts[targetPostID].postParagraph1}</p>
                                <p>${information.posts[targetPostID].postParagraph2}</p>
                                <p>${information.posts[targetPostID].postParagraph3}</p>
                                <p>${information.posts[targetPostID].postParagraph4}</p>
                                <p>${information.posts[targetPostID].postParagraph5}</p>
                                <p>${information.posts[targetPostID].postParagraph6}</p>
                                <p>${information.posts[targetPostID].postParagraph7}</p>
                                <p>${information.posts[targetPostID].postParagraph8}</p>
                                <p>${information.posts[targetPostID].postParagraph9}</p>
                                <p>${information.posts[targetPostID].postParagraph10}</p>
                                <p>${information.posts[targetPostID].postParagraph11}</p>
                            </div>
                        </div>
                        <img src="${information.posts[targetPostID].postImg}" alt="${information.posts[targetPostID].postTitle}" width="320" height="213">
                        <hr class="solid top">
                        <div class="social-bar">
                            <a href="#" type="button" class="btn fa fa-facebook-f"></a>
                            <a href="#" type="button" class="btn fa fa-twitter"></a>
                            <a href="#" type="button" class="btn fa fa-linkedin"></a>
                            <a href="#" type="button" class="btn fa fa-link"></a>
                        </div>
                        <hr class="solid bottom">
                        <div class="post-footer">
                            <div class="column-1">
                                <div class="view-count-compact">
                                    <i class="fa fa-eye"></i>
                                    <p class="viewers-counter">${information.posts[targetPostID].views}</p>
                                    <p class="text">views</p>
                                </div>
                                <div class="comment-count-compact">
                                    <button type="button" class="btn">
                                        <i class="fa fa-comment-o"></i>
                                        <span class="comments-counter">${information.posts[targetPostID].comments}</span>
                                        <span class="text">comments</span>
                                    </button>
                                </div>
                            </div>
                            <div class="column-2">
                                <div class="like-count-compact">
                                    <p class="likes-counter">${information.posts[targetPostID].likes}</p>
                                    <button type="button" class="btn like-btn fa fa-heart-o"></button>
                                </div>
                            </div>
                        </div>
                    </article>
                    <div class="comments">
                        <div class="row-1">
                            <h6>Comments</h6>
                            <img src="${information.posts[targetPostID].writersImg}" alt="${information.posts[targetPostID].writersName}">
                        </div>
                        <div class="row-2">
                            <input type="text" placeholder="Write a comment...">
                        </div>
                    </div>
                `;
                heartButton();
                viewCounter();
            }
            catch {
                return blogPostList();
            }
        });
    });

    // VIEWS COUNTER WHEN A CERTAIN POST VISITED BASED ON THE ACTIVE CLASS
    function viewCounter() {
        const viewsCount = document.querySelectorAll('.viewers-counter');
        // console.log(window.location.href);
        viewsCount.forEach(viewCount => {
            if(blogPost.classList.contains('blog-post')) {
                viewCount.textContent = parseInt(viewCount.textContent) + 1;
            }
        });
    }
    viewCounter();
});
// RENDER THE ITEMS IN THE CATEGORY PAGE
getContent().then(items => {
    // MAKE A HTML DOM OF THE PRODUCT CARDS IN THE CATEGORY PAGE
    const productList = document.querySelector('.product-list');
    function productLists() {
        try {
            let categoryProductList = '';
            items.products.forEach(product => {
                categoryProductList += `
                    <div class="card ${product.category}" id="${product.id}">
                        <img src="${product.img}" alt="${product.name}">
                        <div class="card-body">
                            <h6 class="product-name">${product.name}</h6>
                            <h6 class="product-amount">₱${product.amount}</h6>                
                        </div>
                    </div>
                `;
            });
            productList.innerHTML = categoryProductList;
        }
        catch(err) {
            console.log(err);
        }
    }
    productLists();

    // PUT ACTIVE CLASS ON THE DROPDOWN-ITEM IF IT'S CLICKED
    const sortType = document.querySelectorAll('.dropdown-item');
    sortType.forEach(type => {
        type.addEventListener('click', () => {
            sortType.forEach(sort => sort.classList.remove('active'));
            type.classList.add('active');
            // CHECK IF THE ACTIVE CLASS IS IN THE DROPDOWN-ITEM TO GET THE INNERTEXT AND SHOW IT IN THE DROPDOWN-SELECTED CLASS
            if(type.classList.contains('active')) {
                let selectedType = type.innerText;
                document.querySelector('.dropdown-selected').innerText = selectedType;
            }
            
        });
        // CHECK IF THE ACTIVE CLASS IS IN THE DROPDOWN-ITEM TO GET THE INNER TEXT AND SHOW IT IN THE DROPDOWN-SELECTED CLASS
        if(type.classList.contains('active')) {
            let selectedType = type.innerText;
            document.querySelector('.dropdown-selected').innerText = selectedType;
        }
    });

    // COUNT THE PRODUCTS IN THE PRODUCT LIST TO SHOW HOW MANY PRODUCTS ARE THERE
    const productCards = document.querySelectorAll('.product-list .card');
    function productCardCounter() {
        const activeProductCards = Array.from(productCards).filter(productCards => productCards.classList.contains('is-active'));
        let activeCount = activeProductCards.length;

        document.querySelector('.product-counter').innerText = activeCount + " products";
        document.querySelector('.offcanvas-product-counter').innerText = "(" + activeCount + " products)";
    }
    productCardCounter();

    // FILTER THE PRODUCTS IN THE PRODUCT LIST WHEN THE CATEGORY BUTTONS CLICKED BASED ON THE CATEGORY OF EACH PRODUCTS
    const categoryBtns = document.querySelectorAll(".category-option");
    const categoryTitle = document.querySelector('.header-title');
    const categoryImg = document.querySelector('.header-img');
    const categoryParagraph = document.querySelector('.header-paragraph');
    const sidebarProductType = document.querySelector('.product-type');
    const pageTitle = document.querySelector('.page');
    // GET THE HEADER TITLE OF THE CATEGORY AND SHOW IT ON THE PAGE TITLE 
    pageTitle.innerText = categoryTitle.innerText;

    function categoryAllProducts() {
        // SHOW THE HEADER IMG WHEN ALL PRODUCTS BUTTON CLICKED
        categoryImg.style.display = 'block';
        // SHOW THE FILTER PRODUCT TYPE WHEN ALL PRODUCTS BUTTON CLICKED
        sidebarProductType.style.display = 'block';
        // ADD THE MARGIN TOP IN HEADER TITLE
        categoryTitle.style.marginTop = '24px';
        // CHANGE THE INNER TEXT OF HEADER TITLE
        categoryTitle.innerText = 'All Products';
        // CHANGE THE INNER TEXT OF HEADER PARAGRAPH
        categoryParagraph.innerText = "This is your category description. It's a great place to tell customers what this category is about, connect with your audience and draw attention to your products."
        // GET THE HEADER TITLE OF THE CATEGORY AND SHOW IT ON THE PAGE TITLE 
        pageTitle.innerText = categoryTitle.innerText;
    }
    function categoryEcoFriendly() {
        // HIDE THE HEADER IMG WHEN THIS BUTTON CLICKED
        categoryImg.style.display = 'none';
        // HIDE THE FILTER PRODUCT TYPE WHEN THIS BUTTON CLICKED
        sidebarProductType.style.display = 'none';
        // REMOVE THE MARGIN TOP OF HEADER TITLE WHEN THIS BUTTON CLICKED
        categoryTitle.style.marginTop = 0;
        // CHANGE THE INNER TEXT OF HEADER TITLE
        categoryTitle.innerText = 'Eco-Friendly Fashion';
        // CHANGE THE INNER TEXT OF HEADER PARAGRAPH
        categoryParagraph.innerText = "A collection of trendy apparel and accessories made from sustainable materials, promoting ethical practices in the fashion industry.";
        // GET THE HEADER TITLE OF THE CATEGORY AND SHOW IT ON THE PAGE TITLE 
        pageTitle.innerText = categoryTitle.innerText;
    }
    function categoryMinimalist() {
        // HIDE THE HEADER IMG WHEN THIS BUTTON CLICKED
        categoryImg.style.display = 'none';
        // HIDE THE FILTER PRODUCT TYPE WHEN THIS BUTTON CLICKED
        sidebarProductType.style.display = 'none';
        // REMOVE THE MARGIN TOP OF HEADER TITLE WHEN THIS BUTTON CLICKED
        categoryTitle.style.marginTop = 0;
        // CHANGE THE INNER TEXT OF HEADER TITLE
        categoryTitle.innerText = 'Minimalist Essentials';
        // CHANGE THE INNER TEXT OF HEADER PARAGRAPH
        categoryParagraph.innerText = "A collection of timeless and versatile fashion pieces that can be easily mixed matched, perfect for creating a minimalist wardrobe.";
        // GET THE HEADER TITLE OF THE CATEGORY AND SHOW IT ON THE PAGE TITLE 
        pageTitle.innerText = categoryTitle.innerText;
    }
    function categoryVegan() {
        // HIDE THE HEADER IMG WHEN THIS BUTTON CLICKED
        categoryImg.style.display = 'none';
        // HIDE THE FILTER PRODUCT TYPE WHEN THIS BUTTON CLICKED
        sidebarProductType.style.display = 'none';
        // REMOVE THE MARGIN TOP OF HEADER TITLE WHEN THIS BUTTON CLICKED
        categoryTitle.style.marginTop = 0;
        // CHANGE THE INNER TEXT OF HEADER TITLE
        categoryTitle.innerText = 'Vegan Leather Accessories';
        // CHANGE THE INNER TEXT OF HEADER PARAGRAPH
        categoryParagraph.innerText = "a collection of stylish accessories made from high-quality vegan leather, offering a cruelty-free alternative to traditional leather products.";
        // GET THE HEADER TITLE OF THE CATEGORY AND SHOW IT ON THE PAGE TITLE 
        pageTitle.innerText = categoryTitle.innerText;
    }
    categoryBtns.forEach(categoryBtn => {
        if(categoryBtn.classList.contains('active')) {
            productCards.forEach(productCard => productCard.classList.add('is-active'));
            productCardCounter();
        }
        categoryBtn.addEventListener('click', (event) => {
            // GET THE ID OF THE BUTTON CLICKED
            let catOptionId = event.target.id;
            // REMOVE THE CLASS ACTIVE TO THE RECENT BUTTON WHEN OTHER BUTTON CLICKED
            categoryBtns.forEach(catBtns => catBtns.classList.remove('active'));
            // ALL PRODUCTS BUTTON
            if(catOptionId === 'category-btn1') {
                categoryBtn.classList.add('active');
                categoryAllProducts();
                // TOGGLE THE ACTIVE CLASS TO SHOW THE PRODUCTS IN THE PRODUCT LIST
                productCards.forEach(productCard => productCard.classList.add('is-active'));
                productCardCounter();
            }
            // ECO-FRIENDLY FASHION BUTTON
            else if(catOptionId === 'category-btn2') {
                categoryBtn.classList.add('active');
                categoryEcoFriendly();
                // TOGGLE THE ACTIVE CLASS TO SHOW THE PRODUCTS IN THE PRODUCT LIST
                productCards.forEach(productCard => {
                    if(productCard.classList.contains('eco-friendly')) {
                        productCard.classList.add('is-active');
                    }
                    else {
                        productCard.classList.remove('is-active');
                    }
                    productCardCounter();
                });

            }
            // MINIMALIST ESSENTIALS BUTTON
            else if(catOptionId === 'category-btn3') {
                categoryBtn.classList.add('active');
                categoryMinimalist();
                // TOGGLE THE ACTIVE CLASS TO SHOW THE PRODUCTS IN THE PRODUCT LIST
                productCards.forEach(productCard => {
                    if(productCard.classList.contains('minimalist')) {
                        productCard.classList.add('is-active');
                    }
                    else {
                        productCard.classList.remove('is-active');
                    }
                    productCardCounter();
                });
            }
            // VEGAN LEATHER ACCESSORIES BUTTON
            else if(catOptionId === 'category-btn4') {
                categoryBtn.classList.add('active');
                categoryVegan();
                // TOGGLE THE ACTIVE CLASS TO SHOW THE PRODUCTS IN THE PRODUCT LIST
                productCards.forEach(productCard => {
                    if(productCard.classList.contains('vegan')) {
                        productCard.classList.add('is-active');
                    }
                    else {
                        productCard.classList.remove('is-active');
                    }
                    productCardCounter();
                });
            }
            // ERROR 
            else {
                return categoryBtn;
            }
        });
    });

    // COUNT THE CHECKBOX CHECKED IN FILTER PRODUCT TYPE FOR FILTER & SORT OFFCANVAS
    function countCheckboxes() {
        const offcanvasCheckboxes = document.getElementsByName('offcanvasCollection');
        const checkboxCounter = document.querySelector('.checkbox-counter');
        let counter = 0;
        offcanvasCheckboxes.forEach(offcanvasCheckedbox => {
            offcanvasCheckedbox.addEventListener('click', () => {
                if(offcanvasCheckedbox.checked) {
                    counter++
                    if(counter >= 1) {
                        checkboxCounter.style.display = 'block';
                    }
                }
                else {
                    counter--;
                    if(counter === 0) {
                        checkboxCounter.style.display = 'none';
                    }
                }
                checkboxCounter.innerText = '(' + counter + ')';
            });
        });
    }
    countCheckboxes();

    // GET THE MIN PRICE AND MAX PRICE OF THE PRODUCTS BASED ON THE PRICE RANGE SLIDER
    const minimumValue = document.querySelectorAll(".min-price-value");
    const maximumValue = document.querySelectorAll(".max-price-value");
    const sliderFill = document.querySelectorAll(".slider-fill");
    const inputRange = document.querySelectorAll("input[type=range]");
    inputRange.forEach(range => range.addEventListener('input', validateRange));
    // VALIDATE RANGE AND UPDATE THE FILL COLOR OF THE SLIDER-FILL
    function validateRange() {
        // CHECK IF THE BROWSER WIDTH IS SMALLER OR BIGGER TO 768PX
        if(window.innerWidth >= 768) {
            // MINIMUM PRICE AND MAXIMUM PRICE OF 768PX HIGHER
            let minimumPrice = parseFloat(inputRange[0].value);
            let maximumPrice = parseFloat(inputRange[1].value);

            // SWAP THE VALUES IF minimumPrice IS GREATER THAN maximumPrice
            if (minimumPrice > maximumPrice) {
                let tempValue = maximumPrice;
                maximumPrice = minimumPrice;
                minimumPrice = tempValue;
            }
            // CALCULATE THE PERCENTAGE POSITION FOR THE MIN AND MAX VALUES
            const minPercentage = ((minimumPrice - 449.99) / 4270) * 100;
            const maxPercentage = ((maximumPrice - 449.99) / 4270) * 100;
            // SET THE POSITION AND WIDTH OF THE FILL COLOR ELEMENT TO REPRESENT THE SELECTED RANGE
            sliderFill.forEach(slider => {
                slider.style.left = minPercentage + "%";
                slider.style.width = maxPercentage - minPercentage + "%";
            });
            // UPDATE THE DISPLAYED MIN AND MAX VALUES
            minimumValue.forEach(minValue => {
                minValue.innerText = "₱" + minimumPrice;
            });
            maximumValue.forEach(maxValue => {
                maxValue.innerText = "₱" + maximumPrice;
            });
        }
        else {
            // MINIMUM PRICE AND MAXIMUM PRICE OF 767PX LOWER
            let minimumPrice = parseFloat(inputRange[2].value);
            let maximumPrice = parseFloat(inputRange[3].value);

            // SWAP THE VALUES IF minimumPrice IS GREATER THAN maximumPrice
            if (minimumPrice > maximumPrice) {
                let tempValue = maximumPrice;
                maximumPrice = minimumPrice;
                minimumPrice = tempValue;
            }
            // CALCULATE THE PERCENTAGE POSITION FOR THE MIN AND MAX VALUES
            const minPercentage = ((minimumPrice - 449.99) / 4270) * 100;
            const maxPercentage = ((maximumPrice - 449.99) / 4270) * 100;
            // SET THE POSITION AND WIDTH OF THE FILL COLOR ELEMENT TO REPRESENT THE SELECTED RANGE
            sliderFill.forEach(slider => {
                slider.style.left = minPercentage + "%";
                slider.style.width = maxPercentage - minPercentage + "%";
            });
            // UPDATE THE DISPLAYED MIN AND MAX VALUES
            minimumValue.forEach(minValue => {
                minValue.innerText = "₱" + minimumPrice;
            });
            maximumValue.forEach(maxValue => {
                maxValue.innerText = "₱" + maximumPrice;
            });
        }
    }
    validateRange();

    // REDIRECT TO PRODUCT PAGE WHEN THE IMAGE CLICKED
    const categoryProductImage = document.querySelectorAll('.product-list .card img');
    categoryProductImage.forEach(categoryProductImg => {
        categoryProductImg.addEventListener('click', () => {
            window.location = 'https://joshiekurusu.github.io/shopnest/product.html';
        });
    });
});
// RENDER THE PRODUCTS DETAILS IN THE PRODUCT PAGE
getContent().then(details => {
    // MAKE A HTML DOM OF THE PRODUCTS IN THE PRODUCT PAGE
    const productDetail = document.querySelector('.product .container-fluid .row-2');
    function productDetails() {
        try {
            let itemDetail = '';
            details.products.forEach(detail => {
                itemDetail += `
                    <div class="product-item">
                        <img src="${detail.img}" alt="${detail.name}" width="240" height="229">
                        <div class="product-text">
                            <h4 class="product-name">${detail.name}</h4>
                            <h4 class="product-amount">₱${detail.amount}</h4>
                        </div>
                        <div class="product-qty">
                            <p>Quantity:</p>
                            <div class="input-group">
                                <input type="number" id="input-qty" aria-label="Quantity" max="99999" min="1" value="1">
                                <div class="up-down-btns">
                                    <button type="button" class="btn fa fa-angle-up increment"></button>
                                    <button type="button" class="btn fa fa-angle-down decrement"></button>
                                </div>
                            </div>
                        </div>
                        <div class="add-to-cart">
                            <button type="button" class="btn addToCartBtn" id="${detail.id}">
                                <span class="text">Add to Cart</span>
                                <span class="falling-dots">
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                </span>
                            </button>
                        </div>
                        <p class="product-definition">${detail.description}</p>
                        <div class="social-bar">
                            <ul>
                                <li><a href="#" class="fa fa-whatsapp"></a></li>
                                <li><a href="#" class="fa fa-facebook"></a></li>
                                <li><a href="#" class="fa fa-twitter"></a></li>
                                <li><a href="#" class="fa fa-pinterest"></a></li>
                            </ul>
                        </div>
                    </div>
                `;
                productDetail.innerHTML = itemDetail;
            });
        }
        catch(err) {
            console.log(err);
        }
    }
    productDetails();

    // GET THE PRODUCT NAME AND SHOW IT ON THE PRODUCT TITLE HEADER
    function productName() {
        const productNames = document.querySelectorAll('.product-item');
        productNames.forEach(names => {
            const productName = names.querySelector('.product-name');
            const productTitle = document.querySelector('.product-title');
            if(!names.classList.contains('hidden')) {
                productTitle.textContent = productName.innerText;
            }
        });
    }
    try {
        document.querySelector('.product-title').textContent = document.querySelector('.product-name').textContent;
    }
    catch(err) {
        console.log(err);
    }

    // PAGINATION FOR THE PRODUCT PAGE
    const paginationNumbers = document.getElementById('pagination-numbers');
    const paginationList = document.getElementById('product-list');
    const listItems = paginationList.querySelectorAll('.product-item');
    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');

    const paginationLimit = 1;
    const pageCount = Math.ceil(listItems.length / paginationLimit);
    let currentPage;

    const appendPageNumber = (index) => {
        const pageNumber = document.createElement('button');
        pageNumber.className = 'pagination-number';
        pageNumber.innerHTML = index;
        pageNumber.setAttribute('page-index', index);
        pageNumber.setAttribute('aria-label', 'Page ' + index);
        paginationNumbers.appendChild(pageNumber);
    }
    const getPaginationNumbers = () => {
        for(let i = 1; i <= pageCount; i++) {
            appendPageNumber(i);
        }
    }
    const setCurrentPage = (pageNum) => {
        currentPage = pageNum;
        handleActivePageNumber();
        handlePageButtonsStatus();
        const prevRange = (pageNum - 1) * paginationLimit;
        const currRange = pageNum * paginationLimit;
        listItems.forEach((item, index) => {
            item.classList.add('hidden');
            if(index >= prevRange && index < currRange) {
                item.classList.remove('hidden');
            }
        });
    }
    document.querySelectorAll('.pagination-number').forEach(button => {
        const pageIndex = Number(button.getAttribute('page-index'));
        if(pageIndex) {
            button.addEventListener('click', () => {
                setCurrentPage(pageIndex);
            });
        }
    });
    const handleActivePageNumber = () => {
        document.querySelectorAll('.pagination-number').forEach(button => {
            button.classList.remove('active');
            const pageIndex = Number(button.getAttribute('page-index'));
            if(pageIndex == currentPage) {
                button.classList.add('active');
            }
        });
    }
    prevButton.addEventListener('click', () => {
        setCurrentPage(currentPage - 1);
        productName();
    });
    nextButton.addEventListener('click', () => {
        setCurrentPage(currentPage + 1);
        productName();
    });
    document.querySelectorAll('.pagination-number').forEach(button => {
        const pageIndex = Number(button.getAttribute('page-index'));
        if(pageIndex) {
            button.addEventListener('click', () => {
                setCurrentPage(pageIndex);
            });
        }
    });
    const disableButton = (button) => {
        button.classList.add('disabled');
        button.setAttribute('disabled', true);
    }
    const enableButton = (button) => {
        button.classList.remove('disabled');
        button.removeAttribute('disabled');
    }
    const handlePageButtonsStatus = () => {
        // DISABLE THE PREVIOUS BUTTON IF THE PAGE IS ON THE FIRST PAGE
        if(currentPage === 1) {
            disableButton(prevButton);
        }
        else {
            enableButton(prevButton);
        }
        // DISABLE THE NEXT BUTTON IF THE PAGE IS ON THE LAST PAGE
        if(pageCount === currentPage) {
            disableButton(nextButton);
        }
        else {
            enableButton(nextButton);
        }
    };
    getPaginationNumbers();
    setCurrentPage(1);
    
    // INCREMENT AND DECREMENT OF QUANTITY ITEM IN THE PRODUCT PAGE
    const productInc = document.querySelector(".increment");
    const productInput = document.querySelector("#input-qty");
    const productDec = document.querySelector(".decrement");
    let productCounter = 1;
    // GET THE UPDATED PRODUCT PAGE COUNTER
    function store() {
        return productCounter;
    }
    productInc.addEventListener("click", () => {
        productCounter++;
        productInput.value = store();
        productInput.setAttribute("value", store());
        if(productInput.value >= 1) {
            productDec.removeAttribute("disabled");
            document.querySelector(".addToCartBtn").removeAttribute("disabled");
        }
        if(productInput.value == 99999) {
            productInc.setAttribute("disabled", "disabled");
        }
        else {
            productInc.removeAttribute("disabled");
        }
    });
    productDec.addEventListener("click", () => {
        if(productInput.value > 1) {
        productCounter--;
            productInc.removeAttribute("disabled");
            productInput.setAttribute("value", store());
            document.querySelector(".addToCartBtn").removeAttribute("disabled");
        }
        if(productInput.value == 1) {
            productCounter--;
            productInput.setAttribute("value", "0");
            productDec.setAttribute("disabled", "disabled");
            document.querySelector(".addToCartBtn").setAttribute("disabled", "disabled");
        }
        else {
            productDec.removeAttribute("disabled");
        }
        productInput.value = store();
    });

    // ADD TO CART BUTTON ANIMATION AFTER CLICKED IN PRODUCT PAGE
    const addToCartBtn = document.querySelectorAll(".addToCartBtn");
    addToCartBtn.forEach(addToCart => {
        addToCart.addEventListener("click", (event) => {
            addToCart.classList.add("addToCartClicked");
            setTimeout(() => {
                let targetIDBtn = event.target.id;
                addToCart.classList.remove("addToCartClicked");
                // MAKE IT APPEAR ON THE SIDEBAR CART
                try {
                    const cartItem = document.createElement('div');
                    cartItem.classList.add("card");
                    cartItem.setAttribute("id", targetIDBtn);
                    cartItem.innerHTML = `
                        <img class="product-img" id="${details.products[targetIDBtn].id}" src="${details.products[targetIDBtn].img}" alt="${details.products[targetIDBtn].name}">
                        <div class="card-body">
                            <h6 class="cart-product-name">${details.products[targetIDBtn].name}</h6>
                            <h6 class="cart-product-amount">₱${details.products[targetIDBtn].amount}</h6>
                            <div class="input-group cart-input-group" id="${details.products[targetIDBtn].id}">
                                <button type="button" class="btn fa fa-minus signs" id="minus"></button> 
                                <input type="number" class="cart-input" id="${details.products[targetIDBtn].id}" aria-label="Quantity" max="99999" min="1" value="1">
                                <button type="button" class="btn fa fa-plus signs" id="plus"></button>
                            </div>
                        </div>
                        <button type="button" class="btn-close remove-btn" aria-label="Close"></button>
                    `;
                    document.querySelector('.item-list').appendChild(cartItem);

                    // SHOW THE SIDEBAR/OFFCANVAS CART
                    if(window.innerWidth >= 768) {
                        $("#cartOffcanvas").offcanvas('show');
                    }

                    //* YOU NEED TO CHANGE ITS VALUE IF YOU CHANGE THE PRICE IN THE CONTENT.JSON FILE SO IT MATCHES THE DATA-PRICE TO THE PRODUCT PRICE
                    // PUT DATA-PRICE ATTRIBUTE OF THE ITEM BASED ON THE PRODUCT AMOUNT
                    if(targetIDBtn == 0) {
                        cartItem.setAttribute("data-price", 3649.99);
                    }
                    else if(targetIDBtn == 1) {
                        cartItem.setAttribute("data-price", 1784.99);
                    }
                    else if(targetIDBtn == 2) {
                        cartItem.setAttribute("data-price", 849.99);
                    }
                    else if(targetIDBtn == 3) {
                        cartItem.setAttribute("data-price", 3379.99);
                    }
                    else if(targetIDBtn == 4) {
                        cartItem.setAttribute("data-price", 999.99);
                    }
                    else if(targetIDBtn == 5) {
                        cartItem.setAttribute("data-price", 2794.99);
                    }
                    else if(targetIDBtn == 6) {
                        cartItem.setAttribute("data-price", 4719.99);
                    }
                    else if(targetIDBtn == 7) {
                        cartItem.setAttribute("data-price", 499.99);
                    }
                    else if(targetIDBtn == 8) {
                        cartItem.setAttribute("data-price", 799.99);
                    }
                    else if(targetIDBtn == 9) {
                        cartItem.setAttribute("data-price", 449.99);
                    }
                    else {
                        return addToCartBtn;
                    }
                }
                catch {
                    return addToCartBtn;
                }

                // * (NEED TO FIX) CAN CALCULATE THE TOTAL PRICES BUT IT CAN ONLY ADD 1 QUANTITY EACH ITEMS
                // CALCULATE THE TOTAL PRICE OF THE ITEMS ON THE CART
                const priceItems = document.querySelectorAll(".cart-product-amount");
                const total = document.querySelector(".total-amount");
                let prices = [];
                
                if(priceItems) {
                    priceItems.forEach(priceItem => {
                        let price = parseFloat(priceItem.innerText.replace("₱", ""));
                        prices.push(price);
                    });
                    // console.log(prices);
                }
                function sumArray(prices) {
                    let sum = 0;
                    for(let i = 0; i < prices.length; i++) {
                        sum += prices[i];
                    }
                    return sum;
                }
                // console.log(sumArray(prices));
                total.innerHTML = "₱" + sumArray(prices).toFixed(2);

                // * (NEED TO FIX THIS) COMPUTE THE SUBTOTAL IF THE QUANTITY INPUT NUMBER IS MORE THAN 2
                // const cartInputValue = document.querySelectorAll(".cart-input");
                // const priceItem = document.querySelector(".cart-product-amount");
                // let totalQuantity = 0;
                // let subtotal = 0;

                // cartInputValue.forEach(quantity => {
                //     console.log(quantity.value);
                        
                //     let newQuantity = quantity.value;
                //     console.log(newQuantity);

                //     totalQuantity = parseInt(totalQuantity) + parseInt(newQuantity);
                //     console.log(totalQuantity);

                //     subtotal = sumArray(prices) * parseInt(totalQuantity);
                //     console.log("₱" + subtotal);
                //     document.querySelector(".total-amount").innerHTML = "₱" + subtotal.toFixed(2);
                // });                        
                const removeBtns = document.querySelectorAll('.remove-btn');
                removeBtns.forEach(removeItemBtn => {
                    removeItemBtn.addEventListener('click', () => {
                        // REMOVE THE ITEM IN THE ITEM LIST WHEN THE REMOVE BTN CLICKED
                        const cardItem = removeItemBtn.parentElement;
                        // console.log(cardItem);
                        cardItem.remove();
                        // REMOVE SPECIFIC ITEM FROM PRICES ARRAY
                        const removePrice = parseFloat(cardItem.getAttribute('data-price'));
                        // console.log(removePrice);
                        prices = prices.filter(item => item !== removePrice);
                        // console.log(prices);
                        // UPDATE THE CART ITEM COUNTER
                        cartItemsCounter();
                        // console.log(parseFloat(sumArray(prices)));
                        // UPDATE THE TOTAL PRICE
                        setTimeout(() => {
                            total.innerHTML = "₱" + sumArray(prices).toFixed(2);
                            // console.log(total.innerHTML);
                            // CHECK IF THERE'S AN ITEM IN CART
                            const itemCard = document.querySelector('.item-list .card');
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

                // CART ITEM LIST COUNTER
                function cartItemsCounter() {
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
                }
                cartItemsCounter();

                // * (NEED TO FIX) WHEN THE ITEM ON THE CART IS MORE THAN 2 THE FIRST INPUT NUMBER VALUE IS ADDING BASED ON THE NUMBER OF THE ITEMS
                // MULTIPLE INPUT NUMBER INSIDE THE CART SIDEBAR
                var decrementButton = document.getElementsByClassName("fa-minus");
                var incrementButton = document.getElementsByClassName("fa-plus");
                // console.log(incrementButton);
                for(var i = 0; i < incrementButton.length; i++) {
                    var button = incrementButton[i];
                    button.addEventListener('click', (event) => {
                        var buttonClicked = event.target;
                        // console.log(buttonClicked);
                        var input = buttonClicked.parentElement.children[1];
                        // console.log(input);
                        var inputValue = input.value;
                        // console.log(inputValue);
                        var newValue = parseInt(inputValue) + 1;
                        // console.log(newValue);
                        input.value = newValue;

                        input.setAttribute("value", newValue);
                        cartItemsCounter();
                    });
                }
                // console.log(decrementButton);
                for(var i = 0; i < decrementButton.length; i++) {
                    var button = decrementButton[i];
                    button.addEventListener('click', (event) => {
                        var buttonClicked = event.target;
                        // console.log(buttonClicked);
                        var input = buttonClicked.parentElement.children[1];
                        // console.log(input);
                        var inputValue = input.value;
                        // console.log(inputValue);
                        var newValue = parseInt(inputValue) - 1;
                        // console.log(newValue);
                        if(newValue >= 1) {
                            input.value = newValue;

                            input.setAttribute("value", newValue);
                            cartItemsCounter();
                        }
                        else {
                            input.value = 1;

                            input.setAttribute("value", newValue);
                            cartItemsCounter();
                        }
                    });
                }

                // IF THE PRODUCT IMAGES IN CART CLICKED HIDE THE SIDEBAR/OFFCANVAS CART
                function productImages(){
                    const productImage = document.querySelectorAll('.product-img');
                    productImage.forEach(productImg => {
                        productImg.addEventListener('click', () => {
                            // HIDE THE SIDEBAR/OFFCANVAS CART
                            $("#cartOffcanvas").offcanvas('hide');
                        });
                    });
                }
                productImages();
            }, 1500);
        });
    });
});
// SCRIPT WITHOUT ACCESSING THE JSON FILE
document.addEventListener('DOMContentLoaded', () => {
});