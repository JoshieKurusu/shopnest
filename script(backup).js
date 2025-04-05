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
                        <img src="./${product.img}" alt="${product.name}" width="240" height="240" data-page="${product.page}">
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
            console.error(err);
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
        Buttons.addEventListener('click', (event) => {
            // GET THE STATIC INNER WIDTH OF THE BROWSER
            let iW = window.innerWidth;
            const pageNumber = event.target.getAttribute('data-page');
            if(iW <= 767) {
                // * CHANGE THE URL TO THE ACTUAL LINK OF THE PRODUCT PAGE
                window.location = `https://joshiekurusu.github.io/shopnest/product.html?page=${pageNumber}`;
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
                                <a href="https://joshiekurusu.github.io/shopnest/product.html?page=${data.products[targetID].page}">View More Details</a>
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

            // ADD TO CART BUTTON ANIMATION AFTER CLICKED
            const addToCartBtn = document.querySelectorAll(".addToCartBtn");
            addToCartBtn.forEach(addToCart => {
                addToCart.addEventListener("click", (event) => {
                    const productModal = document.querySelector('#product-modal');
                    const productModalQuantityInput = productModal.querySelector('#input-quantity-number');
                    const productModalQuantity = parseInt(productModalQuantityInput.value);

                    addToCart.classList.add("addToCartClicked");
                    setTimeout(() => {
                        let targetIDBtn = event.target.id;
                        addToCart.classList.remove("addToCartClicked");

                        // const cartItemList = document.querySelector('.item-list');
                        const existingProduct = document.getElementById(`cart-item-${data.products[targetIDBtn].id}`);
                        
                        // CHECK IF THERES AN EXISTING PRODUCT ITEM ON THE CART BEFORE PROCESS THE DOM
                        if (existingProduct) {
                            const quantity = existingProduct.querySelector('.cart-input');
                            const totalPrice = parseFloat(existingProduct.querySelector('.cart-product-amount').textContent.replace("₱", ""));
                            const total = document.querySelector('.total-amount');
                            let newPrice = 0;

                            let currentQuantity = parseInt(quantity.value, 10);
                            currentQuantity += productModalQuantity; // Increment quantity
                            quantity.value = currentQuantity; // Update input value

                            newPrice = totalPrice * quantity.value;

                            saveCartData(); // UPDATE THE QUANTITY ON LOCALSTORAGE

                            cartItemsCounter(); // UPDATE THE CART ITEMS COUNTER

                            // HIDE THE PRODUCT MODAL AND SHOW THE CART OFFCANVAS/SIDEBAR
                            $("#product-modal").modal('hide');
                            $("#cartOffcanvas").offcanvas('show');

                            total.classList.add('blur');
                            setTimeout(() => {
                                total.classList.remove('blur');
                                updateTotalPrice();

                                const savedTotal = document.querySelector('.total-amount').innerText.replace("₱", "");
                                localStorage.setItem('totalPrice', savedTotal);
                                // console.log('Saved totalPrice:', localStorage.getItem('totalPrice'));
                            }, 1000);
                        } else {
                            try {
                                const cartItem = document.createElement('div');
                                cartItem.classList.add("card");
                                cartItem.setAttribute("id", `cart-item-${data.products[targetIDBtn].id}`);
                                cartItem.innerHTML = `
                                    <img class="product-img" id="${data.products[targetIDBtn].id}" src="${data.products[targetIDBtn].img}" alt="${data.products[targetIDBtn].name}" data-page="${data.products[targetIDBtn].page}">
                                    <div class="card-body">
                                        <h6 class="cart-product-name">${data.products[targetIDBtn].name}</h6>
                                        <h6 class="cart-product-amount">₱${data.products[targetIDBtn].amount}</h6>
                                        <div class="input-group cart-input-group" id="${data.products[targetIDBtn].id}">
                                            <button type="button" class="btn fa fa-minus signs" id="minus"></button> 
                                            <input type="number" class="cart-input" id="${data.products[targetIDBtn].id}" aria-label="Quantity" max="99999" min="1" value="${productModalQuantity}">
                                            <button type="button" class="btn fa fa-plus signs" id="plus"></button>
                                        </div>
                                    </div>
                                    <button type="button" class="btn-close remove-btn" aria-label="Close"></button>
                                `;
                                document.querySelector('.item-list').appendChild(cartItem);
                        
                                // HIDE THE PRODUCT MODAL AND SHOW THE CART OFFCANVAS/SIDEBAR
                                $("#product-modal").modal('hide');
                                $("#cartOffcanvas").offcanvas('show');
                        
                                // Add data-price attribute
                                cartItem.setAttribute("data-price", data.products[targetIDBtn].amount);
                                addQuantityEventListeners(cartItem);
                                updateTotalPrice();
                                saveCartData();
                            } catch (err) {
                                console.error('Error while adding item to cart:', err);
                                return;
                            }
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
                        // updateTotalPrice();

                        // CALL THE REMOVEITEM FUNCTION
                        removeItem();

                        // CART ITEM LIST COUNTER
                        cartItemsCounter();

                        // MULTIPLE INPUT NUMBER INSIDE THE CART SIDEBAR
                        addQuantityEventListeners(cartItem);

                        // IF THE PRODUCT IMAGES IN CART CLICKED REDIRECT IT TO PRODUCT PAGE
                        const productImage = document.querySelectorAll('.product-img');
                        productImage.forEach(productImg => {
                            productImg.addEventListener('click', (event) => {
                                const pageNumber = event.target.getAttribute('data-page');
                                // * CHANGE THE URL TO THE ACTUAL LINK OF THE PRODUCT PAGE
                                window.location = `https://joshiekurusu.github.io/shopnest/product.html?page=${pageNumber}`;
                            });
                        });
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
            console.error(err);
        }
    }
    blogPostList();
    
    // MULTIPLE LIKE OR HEART BUTTON WITH COUNTER FOR THE BLOG
    function heartButton() {
        const likeButtons = document.querySelectorAll(".like-btn");
        likeButtons.forEach(button => {
            const counter = button.previousElementSibling;
            counter.style.visibility = counter.textContent > "0" ? "visible" : "hidden";
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

    // HANDLE CLICK EVENTS ON IMAGES AND POST DESCRIPTION
    function handleBlogPostClick(event) {
        let targetPostID = event.target.id;
        // console.log(targetPostID);
        toggleActiveClass(); // TO TOGGLE ACTIVE CLASS ON THE BLOG POST CONTAINER
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
            heartButton(); // CALL THE heartButton FUNCTION HERE
            viewCounter();
            // updateViewCounter(targetPostID); // UPDATE VIEW COUNTER
        }
        catch (error) {
            console.error(error);
            blogPostList(); // PROPERLY RETURN THE BLOG POST LIST ON ERROR
        } 
    }

    imgPost.forEach(img => img.addEventListener('click', handleBlogPostClick));
    postDescription.forEach(desc => desc.addEventListener('click', handleBlogPostClick));

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
                    <div class="card ${product.category}" id="${product.id}" data-price="${product.amount}">
                        <img src="${product.img}" alt="${product.name}" data-page="${product.page}">
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
            console.error(err);
        }
    }
    productLists();

    // PUT ACTIVE CLASS ON THE DROPDOWN-ITEM IF IT'S CLICKED
    const sortType = document.querySelectorAll('.dropdown-item');
    sortType.forEach(type => {
        type.addEventListener('click', () => {
            sortType.forEach(sort => sort.classList.remove('active'));
            type.classList.add('active');
            // CHECK IF THE ACTIVE CLASS IS IN THE DROPDOWN-ITEM TO GET THE INNER TEXT AND SHOW IT IN THE DROPDOWN-SELECTED CLASS
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
        document.querySelector('.offcanvas-product-counter').innerText = `(${activeCount} products)`;
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

    // HELPER FUNCTION
    function updateCategoryDisplay(imgDisplay, productTypeDisplay, marginTop, titleText, paragraphText) {
        categoryImg.style.display = imgDisplay;
        sidebarProductType.style.display = productTypeDisplay;
        categoryTitle.style.marginTop = marginTop;
        categoryTitle.innerText = titleText;
        categoryParagraph.innerText = paragraphText;
        pageTitle.innerText = titleText;
    }

    // CATEGORY FUNCTIONS 
    const categories = {
        'category-btn1': { display: 'block', productTypeDisplay: 'block', marginTop: '24px', title: 'All Products', paragraph: "This is your category description. It's a great place to tell customers what this category is about, connect with your audience and draw attention to your products." },
        'category-btn2': { display: 'none', productTypeDisplay: 'none', marginTop: '0', title: 'Eco-Friendly Fashion', paragraph: "A collection of trendy apparel and accessories made from sustainable materials, promoting ethical practices in the fashion industry." },
        'category-btn3': { display: 'none', productTypeDisplay: 'none', marginTop: '0', title: 'Minimalist Essentials', paragraph: "A collection of timeless and versatile fashion pieces that can be easily mixed matched, perfect for creating a minimalist wardrobe." },
        'category-btn4': { display: 'none', productTypeDisplay: 'none', marginTop: '0', title: 'Vegan Leather Accessories', paragraph: "A collection of stylish accessories made from high-quality vegan leather, offering a cruelty-free alternative to traditional leather products." }
    }

    // UNCHECK THE CHECKED CHECKBOX ON THE PRODUCT TYPE WHEN CLICKED ON THE CATEGORY BTNS
    function uncheckedCheckboxes() {
        // CHECK IF THE PARENT DIV IS HIDDEN
        if(sidebarProductType && getComputedStyle(sidebarProductType).display === 'none') {
            // UNCHECK ALL CHECKBOXES INSIDE THE HIDDEN PARENT DIV
            const checkboxes = document.querySelectorAll('input[name="collection"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false; // UNCHECK THE CHECKBOX
            });
        }
    }

    // EVENT LISTENERS FOR CATEGORY BUTTONS
    categoryBtns.forEach(categoryBtn => {
        categoryBtn.addEventListener('click', (event) => {
            // GET THE ID OF THE BUTTON CLICKED
            let catOptionId = event.target.id;

            // REMOVE THE CLASS ACTIVE FROM OTHER BUTTONS
            categoryBtns.forEach(catBtns => catBtns.classList.remove('active'));

            if (categories[catOptionId]) {
                categoryBtn.classList.add('active');
                const { display, productTypeDisplay, marginTop, title, paragraph } = categories[catOptionId];
                updateCategoryDisplay(display, productTypeDisplay, marginTop, title, paragraph);

                document.querySelectorAll('.product-list .card').forEach(productCard => {
                    if(productCard.classList.toggle('is-active', productCard.classList.contains(catOptionId.replace('category-btn', '').toLowerCase()) || catOptionId === 'category-btn2')) {
                        productCard.classList.contains('eco-friendly') ? productCard.classList.add('is-active') : productCard.classList.remove('is-active');
                        uncheckedCheckboxes()
                    }
                    else if(productCard.classList.toggle('is-active', productCard.classList.contains(catOptionId.replace('category-btn', '').toLowerCase()) || catOptionId === 'category-btn3')) {
                        productCard.classList.contains('minimalist') ? productCard.classList.add('is-active') : productCard.classList.remove('is-active');
                        uncheckedCheckboxes()
                    }
                    else if(productCard.classList.toggle('is-active', productCard.classList.contains(catOptionId.replace('category-btn', '').toLowerCase()) || catOptionId === 'category-btn4')) {
                        productCard.classList.contains('vegan') ? productCard.classList.add('is-active') : productCard.classList.remove('is-active');
                        uncheckedCheckboxes()
                    }
                    else {
                        productCard.classList.toggle('is-active', productCard.classList.contains(catOptionId.replace('category-btn', '').toLowerCase()) || catOptionId === 'category-btn1') ? productCard.classList.add('is-active') : '';
                        uncheckedCheckboxes()
                    }
                });
                productCardCounter();
            }
        });
        categoryBtn.classList.contains('active') ? productCards.forEach(productCard => productCard.classList.add('is-active')) : '';
        productCardCounter();
    });

    // FILTER THE PRODUCTS IN THE PRODUCT LIST USING CHECKBOXES
    function filterProducts() {
        // GET REFERENCES TO ALL CHECKBOXES AND THE PRODUCT LIST CONTAINER
        const isLargeScreen = window.innerWidth >= 768;
        const checkboxes = isLargeScreen 
        ? document.querySelectorAll('input[name="collection"]:checked') 
        : document.querySelectorAll('input[name="offcanvasCollection"]:checked');
        const productList = document.querySelectorAll('.product-list .card');
    
        // GET THE SELECTED FILTER CRITERIA
        const selectedFilters = Array.from(checkboxes).map(checkbox => checkbox.id);

        // SHOW OR HIDE PRODUCTS BASED ON THE SELECTED FILTERS
        productList.forEach(products => {
            // CHECK IF THE PRODUCT MATCHES ANY SELECTED FILTER
            const matchesFilter = selectedFilters.some(filter => {
                if (isLargeScreen) {
                    if (filter === 'ecoFriendlyFashion' && products.classList.contains('eco-friendly')) {
                        return true;
                    }
                    if (filter === 'veganLeatherAccessories' && products.classList.contains('vegan')) {
                        return true;
                    }
                    if (filter === 'minimalistEssentials' && products.classList.contains('minimalist')) {
                        return true;
                    }
                } else {
                    if (filter === 'ecoFriendly' && products.classList.contains('eco-friendly')) {
                        return true;
                    }
                    if (filter === 'leatherAccessories' && products.classList.contains('vegan')) {
                        return true;
                    }
                    if (filter === 'minimalist' && products.classList.contains('minimalist')) {
                        return true;
                    }
                }
                return false;
            });
    
            // SHOW OR HIDE THE PRODUCT IN THE PRODUCT LIST
            if (matchesFilter || selectedFilters.length === 0) {
                products.classList.add('is-active'); // SHOW THE PRODUCT
                productCardCounter();
            } else {
                products.classList.remove('is-active'); // HIDE THE PRODUCT
                productCardCounter();
            }
        });
    }
    
    // ATTACH EVENT LISTENERS TO CHECKBOXES DYNAMICALLY
    const attachCheckboxListeners = () => {
        const isLargeScreen = window.innerWidth >= 768;
        const checkboxes = isLargeScreen
            ? document.querySelectorAll('input[name="collection"]') // LARGE SCREEN CHECKBOXES
            : document.querySelectorAll('input[name="offcanvasCollection"]'); // SMALL SCREEN CHECKBOXES

        // REMOVE EXISTING EVENT LISTENERS TO PREVENT DUPLICATION
        checkboxes.forEach(checkbox => {
            checkbox.removeEventListener('change', filterProducts);
            checkbox.addEventListener('change', filterProducts); // ATTACH NEW EVENT LISTENER
        });
    };
    
    // INITIAL CALL TO DISPLAY ALL PRODUCTS
    attachCheckboxListeners();
    filterProducts();

    // REAPPLY LISTENERS AND FILTERS WHEN THE SCREEN IS RESIZED
    window.addEventListener('resize', () => {
        attachCheckboxListeners();
        filterProducts();
    });

    // COUNT THE CHECKBOX CHECKED IN FILTER PRODUCT TYPE FOR FILTER & SORT OFFCANVAS AND WHEN THE CHECKBOX CHECKED FILTER THE PRODUCTS BASED ON THE PRODUCT TITLE
    function countCheckboxes() {
        const offcanvasCheckboxes = document.getElementsByName('offcanvasCollection');
        const checkboxCounter = document.querySelector('.checkbox-counter');
        let counter = 0;
        offcanvasCheckboxes.forEach(offcanvasCheckedbox => {
            offcanvasCheckedbox.addEventListener('click', () => {
                counter += offcanvasCheckedbox.checked ? 1 : -1;
                checkboxCounter.style.display = counter > 0 ? 'block' : 'none';
                checkboxCounter.innerText = `(${counter})`;
            });
        });
    }
    countCheckboxes();

    // GET THE MIN PRICE AND MAX PRICE OF THE PRODUCTS BASED ON THE PRICE RANGE SLIDER
    function validateRange() {
        const minimumValue = document.querySelectorAll(".min-price-value");
        const maximumValue = document.querySelectorAll(".max-price-value");
        const sliderFill = document.querySelectorAll(".slider-fill");
        const inputRange = document.querySelectorAll("input[type=range]");
        const productCards = document.querySelectorAll(".product-list .card");
    
        // FUNCTION TO DYNAMICALLY CHOOSE CATEGORY MAPPINGS AND CHECKBOXES BASED ON SCREEN SIZE
        const getConfiguration = () => {
            const isLargeScreen = window.innerWidth >= 768;
            const categoryMap = isLargeScreen
                ? {
                    ecoFriendlyFashion: 'eco-friendly',
                    veganLeatherAccessories: 'vegan',
                    minimalistEssentials: 'minimalist'
                }
                : {
                    ecoFriendly: 'eco-friendly',
                    leatherAccessories: 'vegan',
                    minimalist: 'minimalist'
                };
    
            const checkboxes = isLargeScreen
                ? document.querySelectorAll('input[name="collection"]:checked') // LARGE SCREEN CHECKBOXES
                : document.querySelectorAll('input[name="offcanvasCollection"]:checked'); // SMALL SCREEN CHECKBOXES
    
            return { categoryMap, checkboxes };
        };
    
        const updateSliderFill = (minPrice, maxPrice) => {
            const minPercentage = ((minPrice - 449.99) / 4270) * 100;
            const maxPercentage = ((maxPrice - 449.99) / 4270) * 100;
    
            sliderFill.forEach(slider => {
                slider.style.left = `${minPercentage}%`;
                slider.style.width = `${maxPercentage - minPercentage}%`;
            });
    
            minimumValue.forEach(minValue => (minValue.innerText = `₱${minPrice}`));
            maximumValue.forEach(maxValue => (maxValue.innerText = `₱${maxPrice}`));
        };
    
        const applyFilters = () => {
            const { categoryMap, checkboxes } = getConfiguration();
            const selectedFilters = Array.from(checkboxes)
                .map(checkbox => categoryMap[checkbox.id])
                .filter(Boolean); // FILTERS OUT UNDEFINED MAPPINGS
    
            // CALCULATE MIN AND MAX PRICES BASED ON SLIDER INPUTS
            const isLargeScreen = window.innerWidth >= 768;
            let minPrice = parseFloat(inputRange[isLargeScreen ? 0 : 2].value);
            let maxPrice = parseFloat(inputRange[isLargeScreen ? 1 : 3].value);
    
            if (minPrice > maxPrice) [minPrice, maxPrice] = [maxPrice, minPrice];
    
            // UPDATE THE SLIDER VISUALS
            updateSliderFill(minPrice, maxPrice);
    
            // FILTER PRODUCTS BASED ON CATEGORIES AND PRICE
            productCards.forEach(productCard => {
                const productPrice = parseFloat(productCard.getAttribute("data-price"));
    
                const matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;
                const matchesCategory =
                    selectedFilters.length === 0 || // IF NO CATEGORIES SELECTED, MATCH ALL
                    selectedFilters.some(category => productCard.classList.contains(category));
    
                if (matchesPrice && matchesCategory) {
                    productCard.classList.add("is-active"); // SHOW THE PRODUCTS
                    productCardCounter();
                } else {
                    productCard.classList.remove("is-active"); // HIDE THE PRODUCTS
                    productCardCounter();
                }
            });
        };
    
        // ATTACH THE INPUT EVENT LISTENER TO THE RANGE SLIDERS
        inputRange.forEach(range => range.addEventListener("input", applyFilters));
    
        // INITIAL FILTERING ON PAGE LOAD
        applyFilters();
        // REAPPLY FILTERS AND CONFIGURATIONS WHEN RESIZING THE SCREEN
        window.addEventListener("resize", applyFilters);
    }
    
    validateRange(); // CALL TO INITIALIZE VALUES

    // REDIRECT TO PRODUCT PAGE WHEN THE IMAGE CLICKED
    const categoryProductImage = document.querySelectorAll('.product-list .card img');
    categoryProductImage.forEach(categoryProductImg => {
        categoryProductImg.addEventListener('click', (event) => {
            const pageNumber = event.target.getAttribute('data-page');
            window.location = `https://joshiekurusu.github.io/shopnest/product.html?page=${pageNumber}`;
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
                    <div class="product-item" id="product-item">
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
            console.error(err);
        }
    }
    productDetails();

    // GET THE PRODUCT NAME AND SHOW IT ON THE PRODUCT TITLE HEADER
    function displayProductName() {
        const productNames = document.querySelectorAll('.product-item');
        const productTitle = document.querySelector('.product-title');

        productNames.forEach(names => {
            const productName = names.querySelector('.product-name');
            if(!names.classList.contains('hidden')) {
                productTitle.textContent = productName.innerText;
            }
        });
    }
    
    try {
        setTimeout(() => {
            displayProductName();
        }, 1);
    }
    catch(err) {
        console.error(err);
    }

    // PAGINATION FOR THE PRODUCT PAGE
    function setupPagination() {
        const paginationNumbers = document.getElementById('pagination-numbers');
        const paginationList = document.getElementById('product-list');
        const listItems = paginationList.querySelectorAll('.product-item');
        const nextButton = document.getElementById('next-button');
        const prevButton = document.getElementById('prev-button');

        const paginationLimit = 1;
        const pageCount = Math.ceil(listItems.length / paginationLimit);
        let currentPage = 1;

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
            attachPaginationEventListeners();
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

        const handleActivePageNumber = () => {
            document.querySelectorAll('.pagination-number').forEach(button => {
                button.classList.remove('active');
                const pageIndex = Number(button.getAttribute('page-index'));
                if(pageIndex == currentPage) {
                    button.classList.add('active');
                }
            });
        }

        const attachPaginationEventListeners = () => {
            document.querySelectorAll('.pagination-number').forEach(button => {
                const pageIndex = Number(button.getAttribute('page-index'));
                if(pageIndex) {
                    button.addEventListener('click', () => {
                        setCurrentPage(pageIndex);
                    });
                }
            });
        }

        const disableButton = (button) => {
            button.classList.add('disabled');
            button.setAttribute('disabled', true);
        }

        const enableButton = (button) => {
            button.classList.remove('disabled');
            button.removeAttribute('disabled');
        }

        const handlePageButtonsStatus = () => {
            if(currentPage === 1) {
                disableButton(prevButton);
            } else {
                enableButton(prevButton);
            }

            if(pageCount === currentPage) {
                disableButton(nextButton);
            } else {
                enableButton(nextButton);
            }
        };

        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
                displayProductName();
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentPage < pageCount) {
                setCurrentPage(currentPage + 1);
                displayProductName();
            }
        });

        // Read URL Parameters and Set Initial Page
        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = urlParams.get('page');
        const initialPage = pageParam ? Number(pageParam) : 1;

        getPaginationNumbers();
        setCurrentPage(initialPage);
    }
    setupPagination();
    
    // INCREMENT AND DECREMENT OF QUANTITY ITEM IN THE PRODUCT PAGE
    function quantityItemProductListeners() {
        const productInc = document.querySelector(".increment");
        const productInput = document.querySelector("#input-qty");
        const productDec = document.querySelector(".decrement");
        let productCounter = parseInt(productInput?.value, 10) || 1; // Initialize from input value or fallback to 1
    
        // Ensure the input element starts with the correct value
        productInput.value = productCounter;
    
        // GET THE UPDATED PRODUCT PAGE COUNTER
        function store() {
            return productCounter;
        }

        // Increment Button Event Listener
        if (productInc) {
            productInc.addEventListener("click", () => {
                if (productCounter < 99999) {
                    productCounter++;
                    productInput.value = store();
                    productInput.setAttribute("value", store());
    
                    if (productCounter >= 1) {
                        productDec.removeAttribute("disabled");
                        document.querySelector(".addToCartBtn").removeAttribute("disabled");
                    }
    
                    if (productCounter === 99999) {
                        productInc.setAttribute("disabled", "disabled");
                    } else {
                        productInc.removeAttribute("disabled");
                    }
                }
            });
        }
    
        // Decrement Button Event Listener
        if (productDec) {
            productDec.addEventListener("click", () => {
                if (productCounter > 1) {
                    productCounter--;
                    productInput.value = store();
                    productInput.setAttribute("value", store());
                    productInc.removeAttribute("disabled");
                    document.querySelector(".addToCartBtn").removeAttribute("disabled");
    
                    if (productCounter == 0) {
                        productDec.setAttribute("disabled", "disabled");
                        document.querySelector(".addToCartBtn").setAttribute("disabled", "disabled");
                    }
                }
            });
        }
    }
    quantityItemProductListeners();

    // Example: Simulate pagination click and reloading content
    const paginationContainer = document.querySelector("#product-list");
    if (paginationContainer) {
        paginationContainer.addEventListener("click", () => {
            // Simulate content reload after pagination (adjust timeout based on your logic)
            setTimeout(() => {
                quantityItemProductListeners();; // Reattach listeners after the new content is loaded
            }, 1000); // Delay for DOM update
        });
    }

    // ADD TO CART BUTTON ANIMATION AFTER CLICKED IN PRODUCT PAGE
    const addToCartBtn = document.querySelectorAll(".addToCartBtn");
    addToCartBtn.forEach(addToCart => {
        addToCart.addEventListener("click", (event) => {
            addToCart.classList.add("addToCartClicked");
            setTimeout(() => {
                let targetIDBtn = event.target.id;
                const productPage = document.querySelector('#product-item');
                const productQuantityInput = productPage.querySelector('#input-qty');
                const productPageQuantity = parseInt(productQuantityInput.value);

                addToCart.classList.remove("addToCartClicked");

                const existingProduct = document.getElementById(`cart-item-${details.products[targetIDBtn].id}`);
                        
                // CHECK IF THERES AN EXISTING PRODUCT ITEM ON THE CART BEFORE PROCESS THE DOM
                if (existingProduct) {
                    const quantity = existingProduct.querySelector('.cart-input');
                    const totalPrice = parseFloat(existingProduct.querySelector('.cart-product-amount').textContent.replace("₱", ""));
                    const total = document.querySelector('.total-amount');
                    let newPrice = 0;

                    let currentQuantity = parseInt(quantity.value, 10);
                    currentQuantity += productPageQuantity; // Increment quantity
                    quantity.value = currentQuantity; // Update input value

                    newPrice = totalPrice * quantity.value;

                    saveCartData(); // UPDATE THE QUANTITY ON LOCALSTORAGE

                    cartItemsCounter(); // UPDATE THE CART ITEMS COUNTER

                    // SHOW THE CART OFFCANVAS/SIDEBAR
                    $("#cartOffcanvas").offcanvas('show');

                    total.classList.add('blur');
                    setTimeout(() => {
                        total.classList.remove('blur');
                        updateTotalPrice();

                        const savedTotal = document.querySelector('.total-amount').innerText.replace("₱", "");
                        localStorage.setItem('totalPrice', savedTotal);
                        // console.log('Saved totalPrice:', localStorage.getItem('totalPrice'));
                    }, 1000);
                } else {
                    try {
                        const cartItem = document.createElement('div');
                        cartItem.classList.add("card");
                        cartItem.setAttribute("id", `cart-item-${details.products[targetIDBtn].id}`);
                        cartItem.innerHTML = `
                            <img class="product-img" id="${details.products[targetIDBtn].id}" src="${details.products[targetIDBtn].img}" alt="${details.products[targetIDBtn].name}" data-page="${details.products[targetIDBtn].page}">
                            <div class="card-body">
                                <h6 class="cart-product-name">${details.products[targetIDBtn].name}</h6>
                            <h6 class="cart-product-amount">₱${details.products[targetIDBtn].amount}</h6>
                                <div class="input-group cart-input-group" id="${details.products[targetIDBtn].id}">
                                    <button type="button" class="btn fa fa-minus signs" id="minus"></button> 
                                    <input type="number" class="cart-input" id="${details.products[targetIDBtn].id}" aria-label="Quantity" max="99999" min="1" value="${productPageQuantity}">
                                    <button type="button" class="btn fa fa-plus signs" id="plus"></button>
                                </div>
                            </div>
                            <button type="button" class="btn-close remove-btn" aria-label="Close"></button>
                        `;
                        document.querySelector('.item-list').appendChild(cartItem);

                        // SHOW THE SIDEBAR/OFFCANVAS CART
                        window.innerWidth >= 768 ? $("#cartOffcanvas").offcanvas('show') : $("#cartOffcanvas").offcanvas('hide')

                        // PUT DATA-PRICE ATTRIBUTE OF THE ITEM BASED ON THE PRODUCT AMOUNT
                        cartItem.setAttribute("data-price", details.products[targetIDBtn].amount);
                        addQuantityEventListeners(cartItem);
                        updateTotalPrice();
                        saveCartData();
                    } catch (err) {
                        console.error('Error while adding item to cart:', err);
                        return;
                    } 
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
                // updateTotalPrice();
                
                // CALL THE REMOVEITEM FUNCTION
                removeItem();

                // CART ITEM LIST COUNTER
                cartItemsCounter();

                // MULTIPLE INPUT NUMBER INSIDE THE CART SIDEBAR
                addQuantityEventListeners(cartItem);

                // IF THE PRODUCT IMAGES IN CART CLICKED HIDE THE SIDEBAR/OFFCANVAS CART
                const productImage = document.querySelectorAll('.product-img');
                productImage.forEach(productImg => {
                    productImg.addEventListener('click', () => {
                        // HIDE THE SIDEBAR/OFFCANVAS CART
                        $("#cartOffcanvas").offcanvas('hide');
                    });
                });
            }, 1500);
        });
    });
});
// SCRIPT WITHOUT ACCESSING THE JSON FILE
document.addEventListener('DOMContentLoaded', () => {
    const cartItems = loadCartData();
    // cartItems ? console.log('Cart successfully loaded:', cartItems) : console.warn('Cart is empty or data not found in localStorage');
    if(!cartItems) {
        console.warn('Cart is empty or data not found in localStorage');
    }

    // IF IS IN THE CART PAGE SHOW THE ITEMS ON THE CART
    const isCartPage = window.location.href === "http://127.0.0.1:5500/cart.html";
    // isCartPage ? console.log('Yes!') : console.log('No!');
    if(isCartPage) {
        const cartItem = getCartData();

        const cartPageContainer = document.querySelector('.cart-section .container-fluid');
        const orderSummary = document.querySelector('.order-summary');
        const emptyCart = document.querySelector('.empty-cart-container');

        if(cartItem)  {
            // console.log('Cart successfully loaded:', cartItems);

            // TOGGLE IF THERE'S ITEM ON CART
            cartPageContainer.style.display = 'block';
            orderSummary.style.display = 'block';
            emptyCart.style.display = 'none';
        } else {
            console.warn('Cart is empty or data not found in localStorage');

            // TOGGLE IF THERE'S NO ITEM ON CART            
            cartPageContainer.style.display = 'none';
            orderSummary.style.display = 'none';
            emptyCart.style.display = 'block';
        }
    }

    function getCartData() {
        const savedCartItems = localStorage.getItem('cartItems');
        const savedTotalPrice = parseFloat(localStorage.getItem('totalPrice'));;
    
        // Verify DOM elements exist
        const productArray = document.querySelector('.cart-items-container');
        const subtotalElement = document.querySelector('[data-hook="SubTotals.subtotalText"]');
        const totalAmountElement = document.querySelector('[data-hook="Total.formattedValue"]');
    
        
        if (!productArray || !subtotalElement || !totalAmountElement) {
            console.error('Required elements (.items-container or [data-hook="SubTotals.subtotalText] or [data-hook="Total.formattedValue"]") are missing in the DOM');
            return null;
        }
    
        if (savedCartItems && savedTotalPrice) {
            try {
                const cartItems = JSON.parse(savedCartItems);
                // console.log('Loaded Cart Items:', cartItems);
                // console.log('Loaded Total Price:', savedTotalPrice);
                
                // Display Cart Items
                cartItems.forEach(product => displayCartItems(product, productArray));
    
                // Display Total Price
                if (!isNaN(savedTotalPrice)) {
                    subtotalElement.innerText = `₱${savedTotalPrice.toFixed(2)}`;
                    totalAmountElement.innerText = `₱${savedTotalPrice.toFixed(2)}`;
                } else {
                    console.error('Invalid total price value in localStorage.');
                    subtotalElement.innerText = '₱0.00';
                    totalAmountElement.innerText = '₱0.00';
                }
                return cartItems; // Return for debugging purposes
            } catch (error) {
                console.error('Error parsing cartItems from localStorage:', error);
                return null;
            }
        } else {
            // console.log('No cart data found in localStorage');
            return null;
        }
    }

    function displayCartItems(product, productArray) {
        const cartItem = document.createElement('li');
        cartItem.classList.add('cart-items');
        cartItem.innerHTML = `
            <div class="card" id="${product.id}">
                <img src="${product.img}" alt="${product.name}">
                <div class="card-body">
                    <div class="cart-product-text">
                        <h6 class="cart-product-name">${product.name}</h6>
                        <h6 class="cart-product-amount">₱${product.amount.toFixed(2)}</h6>
                    </div>
                    <div class="input-group cart-input-group">
                        <button type="button" class="btn fa fa-minus signs" id="minus"></button> 
                        <input type="number" class="cart-input" aria-label="Quantity" max="99999" min="1" value="${product.quantity}">
                        <button type="button" class="btn fa fa-plus signs" id="plus"></button>
                    </div>
                    <h6 class="cart-subtotal">₱${(product.amount * product.quantity).toFixed(2)}</h6>
                </div>
                <button type="button" class="btn remove-btn">
                    <svg viewBox="0 0 24 24" fill="#000000" width="24" height="24">
                        <path fill-rule="evenodd" d="M13.5,3 C14.327,3 15,3.673 15,4.5 L15,4.5 L15,5 L19,5 L19,6 L18,6 L18,17.5 C18,18.879 16.878,20 15.5,20 L15.5,20 L7.5,20 C6.122,20 5,18.879 5,17.5 L5,17.5 L5,6 L4,6 L4,5 L8,5 L8,4.5 C8,3.673 8.673,3 9.5,3 L9.5,3 Z M17,6 L6,6 L6,17.5 C6,18.327 6.673,19 7.5,19 L7.5,19 L15.5,19 C16.327,19 17,18.327 17,17.5 L17,17.5 L17,6 Z M10,9 L10,16 L9,16 L9,9 L10,9 Z M14,9 L14,16 L13,16 L13,9 L14,9 Z M13.5,4 L9.5,4 C9.224,4 9,4.225 9,4.5 L9,4.5 L9,5 L14,5 L14,4.5 C14,4.225 13.776,4 13.5,4 L13.5,4 Z"></path>
                    </svg>
                </button>
            </div>
        `;
        productArray.appendChild(cartItem);
    }

    // function removeItemFromCart(productId) {
    //     // GET CART ITEMS FROM LOCALSTORAGE
    //     const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    //     // REMOVE THE SELECTED ITEM
    //     const updatedCartItems = cartItems.filter(item => item.id !== productid);

    //     // CALCULATE NEW TOTAL PRICE
    //     const newTotalPrice = updatedCartItems.reduce((total, item) => {
    //         return total + (item.amount * item.quantity); // PRICE * QUANTITY
    //     }, 0)

    //     // UPDATE LOCALSTORAGE
    //     localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    //     localStorage.setItem('totalPrice', newTotalPrice.toFixed(2)); // SAVE UPDATED TOTAL PRICE

    //     return { updatedCartItems, newTotalPrice }; // RETURN UPDATED DATA
    // }
    
    // function updateCartUI(updatedCartItems) {
    //     // UPDATE CART PAGE
    //     const cartContainer = document.querySelector('.cart-items-container');
    //     cartContainer.innerHTML = ''; // CLEAR THE EXISTING ITEMS
    //     updatedCartItems.forEach(product => displayCartItems(product, cartContainer));

    //     // UPDATE CART SIDEBAR
    //     const cartSidebar = document.querySelector
    // }

    // function setupRemoveButtons() {
    //     const removeButtons = document.querySelectorAll('.remove-btn');
    //     removeButtons.forEach(button => { 
    //         button.addEventListener('click', (event) => { 
    //             const productId = event.target.closest('.card').id; // GET THE PRODUCT ID
    //             const updatedCartData = removeItemFromCart(productId); // REMOVE ITEM AND GET UPDATED DATA
    //             updateCartUI(updatedCartData); // UPDATE THE UI WITH NEW DATA
    //         });
    //     });
    // }
});