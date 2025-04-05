// Reusable function to fetch JSON data
async function fetchData(url) {
    try {
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// Function to render the carousel of product cards
function renderCarousel(products) {
    try {
        let carouselOutput = '';
        products.forEach(product => {
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
        addCarouselItemEventListeners();
        addQuickViewEventListeners(products);
        addToCartEventListeners(products);

        // Loop through each carousel image set the data-page attribute
        document.querySelectorAll('.carousel-item img').forEach((image, index) => {
            image.setAttribute('data-page', index + 1); // Setting data-page attribute
        })
    } catch (err) {
        console.log(err);
    }
}

// Function to initialize and manage the carousel
function initCarousel() {
    const wrapper = document.querySelector(".items");
    const carousel = document.querySelector(".carousel");
    const firstCardWidth = carousel.querySelector(".carousel-item").offsetWidth;
    const arrowBtns = document.querySelectorAll(".arrow-btns");
    const carouselChildrens = [...carousel.children];
    let isDragging = false, startX, startScrollLeft;
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    // Insert copies of cards for infinite scrolling
    const insertCopies = (cards, position) => {
        cards.forEach(card => {
            carousel.insertAdjacentHTML(position, card.outerHTML);
        });
    };
    insertCopies(carouselChildrens.slice(-cardPerView).reverse(), "afterbegin");
    insertCopies(carouselChildrens.slice(0, cardPerView), "beforeend");

    // Scroll the carousel to hide first few duplicate cards on Firefox
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    // Add event listeners for the arrow buttons
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        });
    });

    // Dragging functionality
    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };
    const dragging = (e) => {
        if (!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    const infiniteScroll = () => {
        // If the carousel is at the beginning, scroll to the end
        if (carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }
        // If the carousel is at the end, scroll to the beginning
        else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
}

// Function to add event listeners for carousel items
function addCarouselItemEventListeners() {
    const carouselItem = document.querySelectorAll(".carousel .carousel-item");
    carouselItem.forEach(buttons => {
        buttons.addEventListener('click', (event) => {
            // Get the static inner width of the browser
            let iW = window.innerWidth;
            const pageNumber = event.target.getAttribute('data-page');
            if (iW <= 767) {
                // * Change the URL to the actual link of the product page
                window.location = `/product.html?page=${pageNumber}`;
            }
        });
    });
}

// Function to add event listeners for quick view buttons
function addQuickViewEventListeners(products) {
    const quick_view = document.querySelectorAll(".quick-view-btn");
    quick_view.forEach(btn => {
        btn.addEventListener("click", (event) => {
            let targetID = event.target.id;
            const newModalContent = `
                <div class="modal-content" id="${products[targetID].id}">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-column-1">
                            <img src="${products[targetID].img}" alt="${products[targetID].name}">
                        </div>
                        <div class="modal-column-2">
                            <div class="col2-row-1">
                                <h4 class="product-name">${products[targetID].name}</h4>
                                <h4 class="product-amount">₱${products[targetID].amount}</h4>
                            </div>
                            <div class="col2-row-2">
                                <p>Quantity:</p>
                                <div class="input-group">
                                    <input type="number" id="input-quantity-number" aria-label="Quantity" max="99999" min="1" value="1">
                                    <div class="up-down-btns">
                                        <button type="button" class="btn fa fa-angle-up modal-increment"></button>
                                        <button type="button" class="btn fa fa-angle-down modal-decrement"></button>
                                    </div>
                                </div>
                            </div>
                            <div class="col2-row-3">
                                <button type="button" class="btn addToCartBtn" id="${products[targetID].id}">
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
            addQtyEventListeners(incrementSelector, decrementSelector, inputSelector); // Add increment/decrement event listeners for the modal
            addToCartEventListeners(products, containerSelector); // Add add to cart event listeners for the modal
        });
    });
}

// Consolidated function to add event listeners for increment/decrement buttons
function addQtyEventListeners(incrementSelector, decrementSelector, inputSelector) {
    const incrementButton = document.querySelector(incrementSelector);
    const inputField = document.querySelector(inputSelector);
    const decrementButton = document.querySelector(decrementSelector);
    let counter = parseInt(inputField.value, 10) || 1;

    const updateInputValue = () => {
        inputField.value = counter;
        inputField.setAttribute("value", counter);
    };

    incrementButton.addEventListener("click", () => {
        counter++;
        updateInputValue();
        if (counter >= 1) {
            decrementButton.removeAttribute("disabled");
            document.querySelector(".addToCartBtn").removeAttribute("disabled");
        }
        if (counter === 99999) {
            incrementButton.setAttribute("disabled", "disabled");
        } else {
            incrementButton.removeAttribute("disabled");
        }
    });

    decrementButton.addEventListener("click", () => {
        if (counter > 1) {
            counter--;
            incrementButton.removeAttribute("disabled");
            updateInputValue();
            document.querySelector(".addToCartBtn").removeAttribute("disabled");
        }
        if (counter === 1) {
            counter = 0;
            updateInputValue();
            decrementButton.setAttribute("disabled", "disabled");
            document.querySelector(".addToCartBtn").setAttribute("disabled", "disabled");
        } else {
            decrementButton.removeAttribute("disabled");
        }
    });
}

// Function to add event listeners for add to cart buttons
function addToCartEventListeners(products, containerSelector) {
    function handleAddToCart(event) {
        const addToCart = event.target;
        const modal = document.querySelector('#product-modal');
        const modalQuantityInput = modal.querySelector('#input-quantity-number');
        const modalQuantity = parseInt(modalQuantityInput.value);

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
                    <img class="product-img" id="${products[targetIDBtn].id}" src="${products[targetIDBtn].img}" alt="${products[targetIDBtn].name}">
                    <div class="card-body">
                        <h6 class="cart-product-name">${products[targetIDBtn].name}</h6>
                        <h6 class="cart-product-amount">₱${products[targetIDBtn].amount}</h6>
                        <div class="input-group cart-input-group" id="${products[targetIDBtn].id}">
                            <button type="button" class="btn fa fa-minus signs" id="minus"></button>
                            <input type="number" class="cart-input" id="${products[targetIDBtn].id}" aria-label="Quantity" max="99999" min="1" value="${modalQuantity}">
                            <button type="button" class="btn fa fa-plus signs" id="plus"></button>
                        </div>
                    </div>
                    <button type="button" class="btn-close remove-btn" aria-label="Close"></button>
                `;
                // Set the data-price attribute using the amount from the JSON file
                cartItem.setAttribute("data-price", products[targetIDBtn].amount);

                document.querySelector(containerSelector).appendChild(cartItem);
                addRemoveEventListeners(cartItem); // Add event listener for removing the item
                addQuantityEventListeners(cartItem); // Add event listeners for quantity changes

                if(window.innerWidth >= 768) {
                    $("#cartOffcanvas").offcanvas('show');
                }
            } catch (error) {
                console.error("Error adding item to cart:", error);
            }
            updateTotalPrice(); // Update total price when an item is added
            cartItemsCounter(); // Update cart item count

            // HIDE THE PRODUCT MODAL AFTER THE ANIMATION OF THE ADD TO CART BUTTON AND SHOW THE SIDEBAR/OFFCANVAS CART
            $("#product-modal").modal("hide");
        }, 1500);
    }

    const addToCartBtns = document.querySelectorAll(".addToCartBtn");
    addToCartBtns.forEach(addToCartBtn => {
        addToCartBtn.addEventListener('click', handleAddToCart);
    });
}

// Save cart data to localStorage
function saveCartData() {
    const cartItems = [];
    document.querySelectorAll('.card').forEach(cartItem => {
        const id = cartItem.getAttribute('id');
        const img = cartItem.querySelector('.product-img').src;
        const name = cartItem.querySelector('.cart-product-name').innerText;
        const amount = parseFloat(cartItem.querySelector('.cart-product-amount').innerText.replace('₱', ''));
        const quantity = parseInt(cartItem.querySelector('.cart-input').value);
        cartItems.push({ id, img, name, amount, quantity });
    });

    const total = document.querySelector('.total-amount').innerText;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', total);
}

// Load cart data from localStorage
function loadCartData() {
    const savedCartItems = localStorage.getItem('cartItems');
    const savedTotalPrice = localStorage.getItem('totalPrice');

    if (savedCartItems && savedTotalPrice) {
        const cartItems = JSON.parse(savedCartItems);

        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('card');
            cartItem.setAttribute('id', item.id);
            cartItem.innerHTML = `
                <img class="product-img" src="${item.img}" alt="${item.name}">
                <div class="card-body">
                    <h6 class="cart-product-name">${item.name}</h6>
                    <h6 class="cart-product-amount">₱${item.amount.toFixed(2)}</h6>
                    <div class="input-group cart-input-group" id="${item.id}">
                        <button type="button" class="btn fa fa-minus signs" id="minus"></button>
                        <input type="number" class="cart-input" aria-label="Quantity" max="99999" min="1" value="${item.quantity}">
                        <button type="button" class="btn fa fa-plus signs" id="plus"></button>
                    </div>
                </div>
                <button type="button" class="btn-close remove-btn" aria-label="Close"></button>
            `;
            document.querySelector('.item-list').appendChild(cartItem);
            addRemoveEventListeners(cartItem);
            addQuantityEventListeners(cartItem);
        });

        document.querySelector('.total-amount').innerText = savedTotalPrice;
    }
}

// Function to add event listeners for removing items from the cart
function addRemoveEventListeners(cartItem) {
    const removeBtn = cartItem.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
        cartItem.remove();
        updateTotalPrice(); // Update total price when an item is removed
        cartItemsCounter(); // Update cart item count when an item is removed
    });
}

// Function to add event listeners for quantity changes
function addQuantityEventListeners(cartItem) {
    const incrementBtn = cartItem.querySelector(".fa-plus");
    const decrementBtn = cartItem.querySelector(".fa-minus");
    const quantityInput = cartItem.querySelector(".cart-input");

    incrementBtn.addEventListener("click", () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
        updateTotalPrice(); // Update total price when quantity changes
        cartItemsCounter(); // Update item count display when quantity changes
    });

    decrementBtn.addEventListener("click", () => {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
            updateTotalPrice(); // Update total price when quantity changes
            cartItemsCounter(); // Update item count display when quantity changes
        }
    });

    quantityInput.addEventListener("change", () => {
        if (quantityInput.value < 1) {
            quantityInput.value = 1;
        }
        updateTotalPrice(); // Update total price when quantity changes
        cartItemsCounter(); // Update item count display when quantity changes
    });
}

// Function to update the total price
function updateTotalPrice() {
    const cartItems = document.querySelectorAll(".card");
    const total = document.querySelector(".total-amount");
    let sum = 0;

    cartItems.forEach(cartItem => {
        const price = parseFloat(cartItem.querySelector(".cart-product-amount").innerText.replace("₱", ""));
        const quantity = parseInt(cartItem.querySelector(".cart-input").value);
        sum += price * quantity;
    });

    total.innerHTML = "$" + sum.toFixed(2);
}

// Function to count cart items and toggle display
function cartItemsCounter() {
    const cartItemCounter = document.querySelectorAll('.cart-input-group .cart-input');
    let itemCounterText = document.getElementById('items-count');
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
    });

    // Toggle cart display based on item count
    if(cartCounter === 0) {
        itemList.style.display = 'none';
        subtotal.style.display = 'none';
        emptyText.style.display = 'block';
        offcanvasFooter.style.display = 'none';
    } else {
        itemList.style.display = 'block';
        subtotal.style.display = 'block';
        emptyText.style.display = 'none';
        offcanvasFooter.style.display = 'flex';
    }
}

// If the product images on the cart clicked redirect it to the product page
function productImages() {
    const productImage = document.querySelectorAll('.product-img');
    productImage.forEach(productImg => {
        productImg.addEventListener('click', () => {
            // * change the https://127.0.0.1:5500/product.html to actual link of the product page
            window.location = "https://joshiekurusu.github.io/shopnest/product.html";
        });
    });
}

// MULTIPLE LIKE OR HEART BUTTON WITH COUNTER FOR THE BLOG
function heartButton() {
    const likeButtons = document.querySelectorAll(".like-btn");
    
    likeButtons.forEach(button => {
        const postId = button.getAttribute('data-post-id');
        const counter = button.previousElementSibling;

        // Check if there's a saved like count in local storage
        const savedLikes = localStorage.getItem(postId);
        if (savedLikes) {
            counter.textContent = savedLikes;
            button.classList.toggle('fa-heart-o', savedLikes == "0");
            button.classList.toggle('fa-heart', savedLikes > "0");
            counter.style.visibility = savedLikes > "0" ? "visible" : "hidden";
        }

        button.addEventListener('click', () => {
            function toggleLike() {
                button.classList.toggle("fa-heart-o");
                button.classList.toggle("fa-heart");
            }

            if (button.classList.contains('fa-heart-o')) {
                toggleLike();
                counter.textContent = parseInt(counter.textContent) + 1;
                if (counter.textContent >= 1) {
                    counter.style.visibility = "visible";
                }
                localStorage.setItem(postId, counter.textContent); // Update local storage
            } else if (button.classList.contains('fa-heart')) {
                toggleLike();
                counter.textContent = parseInt(counter.textContent) - 1;
                if (counter.textContent == 0) {
                    counter.style.visibility = "hidden";
                }
                localStorage.setItem(postId, counter.textContent); // Update local storage
            } else {
                console.log("error");
            }
        });
    });
}

// Function to render the blog posts
function renderBlogPosts(posts) {
    const blogPost = document.getElementById('blog-post');
    let postList = ''; 
    try {
        posts.forEach(post => {
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
                                            <path d="M15.3812,6.495914 L12.678933,8.77258837 C12.619133,8.84477644 12.509933,8.85722265 12.4354,8.7990705 C12.4215333,8.79001308 12.4094,8.7809 ...">
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
                                <button type="button" class="btn like-btn fa fa-heart-o" data-post-id="${post.postId}"></button>
                            </div>
                        </div>
                    </div>
                    <hr class="solid bottom">
                </article>
            `;
        });
        blogPost.innerHTML = postList;
    } catch (error) {
        console.error(error);
    }
}

// Function to increment the view counter and save to localStorage
function updateViewCounter(postId) {
    // Increment the view count in the `information` object
    information.posts[postId].views += 1;

    // Save the updated view count to localStorage
    localStorage.setItem('postViews', JSON.stringify(information.posts));

    // Update the view count display
    document.querySelector('.viewers-counter').innerText = information.posts[postId].views;
}

// VIEWS COUNTER WHEN A CERTAIN POST IS VISITED BASED ON THE ACTIVE CLASS
function viewCounter() {
    const viewsCount = document.querySelectorAll('.viewers-counter');
    viewsCount.forEach(viewCount => {
        if (blogPost.classList.contains('blog-post')) {
            viewCount.textContent = parseInt(viewCount.textContent) + 1;
        }
    });
}

// Fetch the JSON data and render the carousel
fetchData('content.json').then(data => {
    renderCarousel(data.products);
    initCarousel();
    productImages(); // Call the function to bind click events to product images
    heartButton(); // Call the heartButton function after the blog posts are rendered
});

// Ensure to call loadCartData on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCartData(); // Additional initializations if needed

    // Function to load the view counts from localStorage when the page loads
    function loadViewCounts() {
        const savedPostViews = localStorage.getItem('postViews');
        if (savedPostViews) {
            information.posts = JSON.parse(savedPostViews);
        }
    }

    // Function to toggle active class on the blog post container
    function toggleActiveClass() {
        blogPost.classList.toggle('blog-post');
        blogPost.classList.toggle('blog-post-list');
    }

    // Function to handle click events on images and post descriptions
    function handlePostClick(event) {
        let targetPostID = event.target.id;
        // console.log(targetPostID);
        try {
            toggleActiveClass();
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
                            </div>
                        </div>
                    </div>
                    <div class="blog-post-body">
                        <h2>${information.posts[targetPostID].postTitle}</h2>
                        <p>${information.posts[targetPostID].postParagraph1}</p>
                        <p>${information.posts[targetPostID].postParagraph2}</p>
                        <p>${information.posts[targetPostID].postParagraph3}</p>
                        <p>${information.posts[targetPostID].postParagraph4}</p>
                        <p>${information.posts[targetPostID].postParagraph5}</p>
                        <p>${information.posts[targetPostID].postParagraph6}</p>
                        <div class="post-social-bar">
                            <button class="fa fa-facebook"></button>
                            <button class="fa fa-twitter"></button>
                            <button class="fa fa-linkedin"></button>
                            <button class="fa fa-copy"></button>
                        </div>
                    </div>
                    <hr class="solid top">
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
                                <button type="button" class="btn like-btn fa fa-heart-o" data-post-id="${information.posts[targetPostID].postId}"></button>
                            </div>
                        </div>
                    </div>
                    <hr class="solid bottom">
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
            heartButton(); // Call the heartButton function here
            viewCounter();
            updateViewCounter(targetPostID); // Update view counter
        } catch (error) {
            console.error(error);
            blogPostsList(); // Properly return the blog posts list on error
        }
    }

    // Add event listeners to images and post descriptions
    const imgPost = document.querySelectorAll(".blog-post img");
    const postDescription = document.querySelectorAll(".post-description");

    imgPost.forEach(img => img.addEventListener("click", handlePostClick));
    postDescription.forEach(desc => desc.addEventListener("click", handlePostClick));

    loadViewCounts(); // Load the view counts from localStorage when the page loads

    // Render the items in the category page
    function renderProductItems() {
        getContent().then(items => {
            const productList = document.querySelector('.product-list');
            const sortType = document.querySelectorAll('.dropdown-item');
            const productCounter = document.querySelector('.product-counter');
            const offcanvasProductCounter = document.querySelector('.offcanvas-product-counter');
            const dropdownSelected = document.querySelector('.dropdown-selected');
    
            function renderProductList() {
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
                updateProductCounter(); // Update product counter after rendering
            }
    
            function updateProductCounter() {
                const activeCount = document.querySelectorAll('.product-list .card.is-active').length;
                productCounter.innerText = `${activeCount} products`;
                offcanvasProductCounter.innerText = `(${activeCount} products)`;
            }
    
            sortType.forEach(type => {
                type.addEventListener('click', () => {
                    sortType.forEach(sort => sort.classList.remove('active'));
                    type.classList.add('active');
                    dropdownSelected.innerText = type.innerText;
                });
            });
    
            renderProductList();
        });
    }
    renderProductItems();

    // Initial Setup
    const categoryBtns = document.querySelectorAll('.category-option');
    const categoryTitle = document.querySelector('.header-title');
    const categoryImg = document.querySelector('.header-img');
    const categoryParagraph = document.querySelector('.header-paragraph');
    const sidebarProductType = document.querySelector('.product-type');
    const pageTitle = document.querySelector('.page-title');
    pageTitle.innerText = categoryTitle.innerText;

    // Helper Function
    function updateCategoryDisplay(imgDisplay, productTypeDisplay, marginTop, titleText, paragraphText) {
        categoryImg.style.display = imgDisplay;
        sidebarProductType.style.display = productTypeDisplay;
        categoryTitle.style.marginTop = marginTop;
        categoryTitle.innerText = titleText;
        categoryParagraph.innerText = paragraphText;
        pageTitle.innerText = titleText;
    }

    // Category Functions
    const categories = {
        'category-btn1': { display: 'block', productTypeDisplay: 'block', marginTop: '24px', title: 'All Products', paragraph: "This is your category description. It's a great place to tell customers what this category is about, connect with your audience and draw attention to your products." },
        'category-btn2': { display: 'none', productTypeDisplay: 'none', marginTop: '0', title: 'Eco-Friendly Fashion', paragraph: "A collection of trendy apparel and accessories made from sustainable materials, promoting ethical practices in the fashion industry." },
        'category-btn3': { display: 'none', productTypeDisplay: 'none', marginTop: '0', title: 'Minimalist Essentials', paragraph: "A collection of timeless and versatile fashion pieces that can be easily mixed matched, perfect for creating a minimalist wardrobe." },
        'category-btn4': { display: 'none', productTypeDisplay: 'none', marginTop: '0', title: 'Vegan Leather Accessories', paragraph: "A collection of stylish accessories made from high-quality vegan leather, offering a cruelty-free alternative to traditional leather products." }
    };

    // Event Listeners for Category Buttons
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
                    productCard.classList.toggle('is-active', productCard.classList.contains(catOptionId.replace('category-btn', '').toLowerCase()) || catOptionId === 'category-btn1');
                });

                productCardCounter();
            }
        });
    });

    // Function to Count Products
    function productCardCounter() {
        const activeCount = document.querySelectorAll('.product-list .card.is-active').length;
        productCounter.innerText = `${activeCount} products`;
        offcanvasProductCounter.innerText = `(${activeCount} products)`;
    }

    // Count Checkboxes Function
    function countCheckboxes() {
        const offcanvasCheckboxes = document.getElementsByName('offcanvasCollection');
        const checkboxCounter = document.querySelector('.checkbox-counter');
        let counter = 0;

        offcanvasCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('click', () => {
                counter += checkbox.checked ? 1 : -1;
                checkboxCounter.style.display = counter > 0 ? 'block' : 'none';
                checkboxCounter.innerText = `(${counter})`;
            });
        });
    }

    countCheckboxes();

    function validateRange() {
        const minimumValue = document.querySelectorAll(".min-price-value");
        const maximumValue = document.querySelectorAll(".max-price-value");
        const sliderFill = document.querySelectorAll(".slider-fill");
        const inputRange = document.querySelectorAll("input[type=range]");
        
        inputRange.forEach(range => range.addEventListener('input', () => {
            const isLargeScreen = window.innerWidth >= 768;
            let minPrice = parseFloat(inputRange[isLargeScreen ? 0 : 2].value);
            let maxPrice = parseFloat(inputRange[isLargeScreen ? 1 : 3].value);

            if (minPrice > maxPrice) [minPrice, maxPrice] = [maxPrice, minPrice];

            const minPercentage = ((minPrice - 449.99) / 4270) * 100;
            const maxPercentage = ((maxPrice - 449.99) / 4270) * 100;

            sliderFill.forEach(slider => {
                slider.style.left = `${minPercentage}%`;
                slider.style.width = `${maxPercentage - minPercentage}%`;
            });

            minimumValue.forEach(minValue => minValue.innerText = `₱${minPrice}`);
            maximumValue.forEach(maxValue => maxValue.innerText = `₱${maxPrice}`);
        }));
    }

    validateRange(); // Call to initialize values

    // Redirect to Product Page When Image is Clicked
    function setupProductImageClick() {
        const categoryProductImage = document.querySelectorAll('.product-list .card img');
        categoryProductImage.forEach(categoryProductImg => {
            categoryProductImg.addEventListener('click', () => {
                window.location = 'https://joshiekurusu.github.io/shopnest/product.html';
            });
        });
    }

    setupProductImageClick();

    function renderProductDetails() {
        getContent().then(details => {
            const productDetail = document.querySelector('.product .container-fluid .row-2');
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
            });

            productDetail.innerHTML = itemDetail;
        }).catch(error => console.error(error));
    }

    renderProductDetails();

    // Display Product Name on Product Title Header
    function displayProductName() {
        const productNames = document.querySelectorAll('.product-item');
        const productTitle = document.querySelector('.product-title');

        productNames.forEach(names => {
            const productName = names.querySelector('.product-name');
            if (!names.classList.contains('hidden')) {
                productTitle.textContent = productName.innerText;
            }
        });
    }

    try {
        displayProductName();
    } catch (err) {
        console.error(err);
    }

    // Pagination for the Product Page
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

    // Call the function for the product page
    addQtyEventListeners('.increment', '.decrement', '#input-qty');

    // Call the function for the modal
    addQtyEventListeners('.modal-increment', '.modal-decrement', '#input-quantity-number');

    // Call the function for the product page
    addToCartEventListeners(products, '.item-list');

    // Assuming you have a different container for the modal
    addToCartEventListeners(products, '.modal-item-list');
});