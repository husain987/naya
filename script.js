// Banner Carousel
const bannerContainer = document.querySelector('.banner-container');
const dots = document.querySelectorAll('.dot');
let currentBanner = 0;

function showBanner(index) {
    bannerContainer.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

setInterval(() => {
    currentBanner = (currentBanner + 1) % 3;
    showBanner(currentBanner);
}, 3000);

// Navigation scroll behavior
let lastScrollTop = 0;
const bottomNav = document.querySelector('.bottom-nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        bottomNav.style.transform = 'translateY(100%)';
        bottomNav.style.transition = 'transform 0.3s ease-in-out';
    } else {
        // Scrolling up
        bottomNav.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Add to Cart functionality with quantity selector
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const quantitySelector = document.createElement('div');
        quantitySelector.className = 'quantity-selector';
        quantitySelector.innerHTML = `
            <button class="minus">-</button>
            <span>1</span>
            <button class="plus">+</button>
        `;
        
        // Replace button with quantity selector
        this.replaceWith(quantitySelector);
        
        // Add quantity adjustment functionality
        const minusBtn = quantitySelector.querySelector('.minus');
        const plusBtn = quantitySelector.querySelector('.plus');
        const quantitySpan = quantitySelector.querySelector('span');
        let quantity = 1;
        
        minusBtn.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantitySpan.textContent = quantity;
            } else {
                // If quantity becomes 0, revert back to Add to Cart button
                const addToCartBtn = document.createElement('button');
                addToCartBtn.className = 'add-to-cart';
                addToCartBtn.textContent = 'Add to Cart';
                quantitySelector.replaceWith(addToCartBtn);
                
                // Re-add click listener to new button
                addToCartBtn.addEventListener('click', arguments.callee);
            }
        });
        
        plusBtn.addEventListener('click', () => {
            quantity++;
            quantitySpan.textContent = quantity;
        });
    });
});

// Category See All
document.querySelector('.categories-section .see-all').addEventListener('click', () => {
    window.location.href = 'categories.html';
});

// Product See All
document.querySelectorAll('.product-section .see-all').forEach(button => {
    button.addEventListener('click', () => {
        // Implement product expansion logic
    });
});

// Bottom Navigation active state
document.querySelectorAll('.bottom-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.bottom-nav a').forEach(l => 
            l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Product Modal Functionality
const productModal = document.getElementById('productModal');
const modalBackButton = productModal.querySelector('.back-button');
const modalShareButton = productModal.querySelector('.share-button');

// Add click event to all product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't open modal if clicking add to cart button
        if (e.target.classList.contains('add-to-cart') || 
            e.target.closest('.quantity-selector')) {
            return;
        }
        
        // Get product details
        const productName = card.querySelector('h3').textContent;
        const productWeight = card.querySelector('.weight').textContent;
        const currentPrice = card.querySelector('.current-price').textContent;
        const mrp = card.querySelector('.mrp').textContent;
        const discount = card.querySelector('.discount-badge').textContent;
        const imageUrl = card.querySelector('img').src;
        
        // Update modal content
        document.getElementById('modalProductName').textContent = productName;
        document.getElementById('modalWeight').textContent = productWeight;
        document.getElementById('modalCurrentPrice').textContent = currentPrice;
        document.getElementById('modalMRP').textContent = mrp;
        document.getElementById('modalDiscount').textContent = discount;
        document.getElementById('modalProductImage').src = imageUrl;
        
        // Set all product images
        const images = [imageUrl, imageUrl, imageUrl]; // Add more image URLs as needed
        const sliderWrapper = document.querySelector('.slider-wrapper');
        const sliderDots = document.querySelectorAll('.slider-dot');
        let currentSlide = 0;
        
        function showSlide(index) {
            sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
            sliderDots.forEach(dot => dot.classList.remove('active'));
            sliderDots[index].classList.add('active');
        }
        
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Add touch/swipe functionality for slider
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        
        sliderWrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            const totalSlides = sliderDots.length;
            
            if (Math.abs(swipeDistance) > 50) { // Minimum swipe distance
                if (swipeDistance > 0 && currentSlide > 0) {
                    // Swipe right
                    currentSlide--;
                } else if (swipeDistance < 0 && currentSlide < totalSlides - 1) {
                    // Swipe left
                    currentSlide++;
                }
                showSlide(currentSlide);
            }
        }
        
        currentSlide = 0;
        showSlide(0);
        
        // Show modal
        productModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Check if product is already in cart
        const existingQuantitySelector = card.querySelector('.quantity-selector');
        if (existingQuantitySelector) {
            // If product is in cart, show quantity selector in modal
            const modalAddBtn = document.getElementById('modalAddToCart');
            const quantity = existingQuantitySelector.querySelector('span').textContent;
            
            const newQuantitySelector = document.createElement('div');
            newQuantitySelector.className = 'quantity-selector';
            newQuantitySelector.innerHTML = `
                <button class="minus">−</button>
                <span>${quantity}</span>
                <button class="plus">+</button>
            `;
            
            modalAddBtn.replaceWith(newQuantitySelector);
        }
    });
});

// Close modal on back button click
modalBackButton.addEventListener('click', () => {
    productModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
});

// Share functionality
let isSharing = false; // Add flag to track sharing state

modalShareButton.addEventListener('click', async () => {
    // If already sharing, return early
    if (isSharing) return;
    
    try {
        isSharing = true; // Set flag before sharing
        const productName = document.getElementById('modalProductName').textContent;
        await navigator.share({
            title: productName,
            text: `Check out ${productName} on our app!`,
            url: window.location.href
        });
    } catch (err) {
        // Only log if it's not a user cancellation
        if (err.name !== 'AbortError') {
            console.log('Share failed:', err);
        }
    } finally {
        // Reset flag after sharing completes or fails
        isSharing = false;
    }
});

// Update modal add to cart functionality
document.getElementById('modalAddToCart').addEventListener('click', function() {
    const quantitySelector = document.createElement('div');
    quantitySelector.className = 'quantity-selector';
    quantitySelector.innerHTML = `
        <button class="minus">−</button>
        <span>1</span>
        <button class="plus">+</button>
    `;
    
    // Replace button with quantity selector
    this.replaceWith(quantitySelector);
    
    // Add quantity adjustment functionality
    const minusBtn = quantitySelector.querySelector('.minus');
    const plusBtn = quantitySelector.querySelector('.plus');
    const quantitySpan = quantitySelector.querySelector('span');
    let quantity = 1;
    
    minusBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity;
        } else {
            // If quantity becomes 0, revert back to Add button
            const addBtn = document.createElement('button');
            addBtn.className = 'add-to-cart';
            addBtn.id = 'modalAddToCart';
            addBtn.textContent = 'Add';
            quantitySelector.replaceWith(addBtn);
            
            // Re-add click listener to new button
            addBtn.addEventListener('click', arguments.callee);
        }
    });
    
    plusBtn.addEventListener('click', () => {
        quantity++;
        quantitySpan.textContent = quantity;
    });
});

// Handle subcategory clicks
document.querySelectorAll('.subcategory-item').forEach(item => {
    item.addEventListener('click', () => {
        const categoryId = item.dataset.category;
        // Store the category ID in sessionStorage for the products page
        sessionStorage.setItem('selectedCategory', categoryId);
        window.location.href = 'products.html';
    });
});

// Back button functionality
document.querySelector('.category-header .back-button')?.addEventListener('click', () => {
    window.history.back();
});

// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input, .category-header .search-bar input');
    if (!searchInput) return;
    
    // Create search overlay
    const searchOverlay = document.createElement('div');
    searchOverlay.className = 'search-overlay';
    searchOverlay.innerHTML = `
        <div class="search-overlay-header">
            <button class="back-button">
                <i class="material-icons">arrow_back</i>
            </button>
            <div class="search-overlay-input">
                <input type="text" placeholder="Search for products...">
                <i class="material-icons">search</i>
            </div>
        </div>
        <div class="search-suggestions"></div>
    `;
    document.body.appendChild(searchOverlay);
    
    const overlayInput = searchOverlay.querySelector('input');
    const suggestionsContainer = searchOverlay.querySelector('.search-suggestions');

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Sample product database if not available
    const sampleProducts = {
        'fruits-vegetables': [
            {
                name: "Fresh Tomatoes",
                weight: "500 g",
                price: "₹40",
                mrp: "₹50",
                discount: "₹10 off",
                image: "https://www.jiomart.com/images/product/original/590003515/tomato-1-kg-product-images-o590003515-p590003515-0-202203170724.jpg"
            },
            // Add all products from products.js database
            ...productDatabase['fruits-vegetables'] || []
        ]
    };

    // Use the full product database
    const database = productDatabase || sampleProducts;
    
    // Create search index
    const searchIndex = [];
    
    Object.entries(database).forEach(([category, products]) => {
        products.forEach(product => {
            searchIndex.push({
                ...product,
                category,
                categoryName: category.replace('-', ' & ').split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
            });
        });
    });

    // Show suggestions based on input
    function showSuggestions(query) {
        if (query.length < 2) {
            showTrendingSearches();
            return;
        }

        const suggestions = searchIndex.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 10);

        if (suggestions.length > 0) {
            suggestionsContainer.innerHTML = suggestions.map(product => {
                const name = product.name;
                const index = name.toLowerCase().indexOf(query.toLowerCase());
                const highlightedName = 
                    name.slice(0, index) +
                    `<span class="highlight">${name.slice(index, index + query.length)}</span>` +
                    name.slice(index + query.length);

                return `
                    <div class="suggestion-item" data-category="${product.category}">
                        <i class="material-icons suggestion-icon">search</i>
                        <div class="suggestion-text">${highlightedName}</div>
                    </div>
                `;
            }).join('');
        } else {
            showNoResults(query);
        }
    }

    // Show trending searches
    function showTrendingSearches() {
        suggestionsContainer.innerHTML = `
            <div class="trending-searches">
                <h3>Popular Searches</h3>
                <div class="trending-items">
                    <div class="trending-item">Fresh Vegetables</div>
                    <div class="trending-item">Milk</div>
                    <div class="trending-item">Bread</div>
                    <div class="trending-item">Rice</div>
                    <div class="trending-item">Tea</div>
                    <div class="trending-item">Snacks</div>
                </div>
            </div>
        `;
    }

    function showNoResults(query) {
        suggestionsContainer.innerHTML = `
            <div class="no-results">
                <img src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" 
                     alt="No Results" style="width: 120px; margin-bottom: 15px;">
                <p>No matches found for "${query}"</p>
                <small>Try searching for something else</small>
            </div>
        `;
    }

    // Handle search input focus
    searchInput.addEventListener('focus', () => {
        searchOverlay.classList.add('active');
        overlayInput.focus();
        document.body.style.overflow = 'hidden';
    });

    // Handle overlay input
    overlayInput.addEventListener('input', debounce((e) => {
        const query = e.target.value.trim();
        showSuggestions(query);
    }, 200));

    // Handle back button
    searchOverlay.querySelector('.back-button').addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        overlayInput.value = '';
        searchInput.value = '';
        searchInput.blur();
        document.body.style.overflow = '';
    });

    // Handle suggestion clicks
    suggestionsContainer.addEventListener('click', (e) => {
        const suggestionItem = e.target.closest('.suggestion-item');
        if (suggestionItem) {
            const category = suggestionItem.dataset.category;
            sessionStorage.setItem('selectedCategory', category);
            window.location.href = 'products.html';
        }

        const trendingItem = e.target.closest('.trending-item');
        if (trendingItem) {
            overlayInput.value = trendingItem.textContent;
            showSuggestions(trendingItem.textContent);
        }
    });
}); 