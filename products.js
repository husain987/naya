// Load products based on selected category
document.addEventListener('DOMContentLoaded', () => {
    const selectedCategory = sessionStorage.getItem('selectedCategory');
    const categoryTitle = document.getElementById('categoryTitle');
    const productsGrid = document.querySelector('.products-grid');

    // Set category title
    categoryTitle.textContent = sessionStorage.getItem('categoryName') || 
        selectedCategory.replace('-', ' & ').split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');

    // Back button functionality
    document.querySelector('.back-button').addEventListener('click', () => {
        const previousPage = sessionStorage.getItem('previousPage') || 'categories.html';
        window.location.href = previousPage;
    });

    // Bottom navigation
    document.querySelectorAll('.bottom-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href') !== '#') {
                sessionStorage.setItem('previousPage', window.location.pathname);
            }
        });
    });

    // Load products
    loadProducts(selectedCategory);
});

// Product data by category
const productDatabase = {
    'fruits-vegetables': [
        {
            name: "Fresh Tomatoes",
            weight: "500 g",
            price: "₹40",
            mrp: "₹50",
            discount: "₹10 off",
            image: "https://www.jiomart.com/images/product/original/590003515/tomato-1-kg-product-images-o590003515-p590003515-0-202203170724.jpg"
        },
        {
            name: "Onions",
            weight: "1 kg",
            price: "₹35",
            mrp: "₹45",
            discount: "₹10 off",
            image: "https://www.jiomart.com/images/product/original/590003517/onion-1-kg-product-images-o590003517-p590003517-0-202203170629.jpg"
        },
        {
            name: "Fresh Potatoes",
            weight: "1 kg",
            price: "₹30",
            mrp: "₹40",
            discount: "₹10 off",
            image: "https://www.jiomart.com/images/product/original/590003516/potato-1-kg-product-images-o590003516-p590003516-0-202203170629.jpg"
        },
        {
            name: "Green Capsicum",
            weight: "500 g",
            price: "₹45",
            mrp: "₹55",
            discount: "₹10 off",
            image: "https://www.jiomart.com/images/product/original/590003523/capsicum-green-1-kg-product-images-o590003523-p590003523-0-202203170724.jpg"
        },
        {
            name: "Fresh Carrots",
            weight: "500 g",
            price: "₹35",
            mrp: "₹45",
            discount: "₹10 off",
            image: "https://www.jiomart.com/images/product/original/590003522/carrot-1-kg-product-images-o590003522-p590003522-0-202203170724.jpg"
        },
        {
            name: "Green Peas",
            weight: "500 g",
            price: "₹40",
            mrp: "₹50",
            discount: "₹10 off",
            image: "https://www.jiomart.com/images/product/original/590003524/green-peas-1-kg-product-images-o590003524-p590003524-0-202203170724.jpg"
        }
    ],
    'dairy-bread': [
        {
            name: "Amul Milk",
            weight: "500 ml",
            price: "₹25",
            mrp: "₹28",
            discount: "₹3 off",
            image: "https://www.jiomart.com/images/product/original/490001739/amul-taaza-toned-milk-1-l-product-images-o490001739-p490001739-0-202203150702.jpg"
        },
        {
            name: "Brown Bread",
            weight: "400 g",
            price: "₹45",
            mrp: "₹50",
            discount: "₹5 off",
            image: "https://www.jiomart.com/images/product/original/490573208/britannia-100-whole-wheat-bread-450-g-product-images-o490573208-p490573208-0-202203150156.jpg"
        },
        {
            name: "Amul Butter",
            weight: "100 g",
            price: "₹55",
            mrp: "₹60",
            discount: "₹5 off",
            image: "https://www.jiomart.com/images/product/original/490003834/amul-butter-100-g-carton-product-images-o490003834-p490003834-0-202203150702.jpg"
        },
        {
            name: "Paneer Fresh",
            weight: "200 g",
            price: "₹85",
            mrp: "₹95",
            discount: "₹10 off",
            image: "https://www.jiomart.com/images/product/original/490001796/amul-fresh-paneer-200-g-pouch-product-images-o490001796-p490001796-0-202203150702.jpg"
        },
        {
            name: "Eggs (6 pcs)",
            weight: "6 pieces",
            price: "₹42",
            mrp: "₹48",
            discount: "₹6 off",
            image: "https://www.jiomart.com/images/product/original/490001392/farm-eggs-table-tray-6-pcs-product-images-o490001392-p490001392-0-202203150702.jpg"
        }
    ],
    'atta-rice': [
        {
            name: "Aashirvaad Atta",
            weight: "5 kg",
            price: "₹303",
            mrp: "₹346",
            discount: "₹43 off",
            image: "https://www.bigbasket.com/media/uploads/p/l/126903_8-aashirvaad-atta-whole-wheat.jpg"
        },
        {
            name: "Basmati Rice",
            weight: "5 kg",
            price: "₹399",
            mrp: "₹499",
            discount: "₹100 off",
            image: "https://www.jiomart.com/images/product/original/490750659/india-gate-basmati-rice-regular-choice-5-kg-product-images-o490750659-p490750659-0-202203150440.jpg"
        },
        {
            name: "Fortune Chakki Atta",
            weight: "5 kg",
            price: "₹249",
            mrp: "₹299",
            discount: "₹50 off",
            image: "https://www.jiomart.com/images/product/original/491349660/fortune-chakki-fresh-atta-5-kg-product-images-o491349660-p491349660-0-202203150440.jpg"
        },
        {
            name: "Toor Dal",
            weight: "1 kg",
            price: "₹145",
            mrp: "₹160",
            discount: "₹15 off",
            image: "https://www.jiomart.com/images/product/original/490000166/toor-dal-1-kg-product-images-o490000166-p490000166-0-202203150156.jpg"
        },
        {
            name: "Moong Dal",
            weight: "1 kg",
            price: "₹155",
            mrp: "₹170",
            discount: "₹15 off",
            image: "https://www.jiomart.com/images/product/original/490000168/moong-dal-1-kg-product-images-o490000168-p490000168-0-202203150156.jpg"
        }
    ],
    'masala': [
        {
            name: "MDH Haldi Powder",
            weight: "100 g",
            price: "₹35",
            mrp: "₹40",
            discount: "₹5 off",
            image: "https://www.jiomart.com/images/product/original/490573246/mdh-haldi-powder-100-g-product-images-o490573246-p490573246-0-202203150156.jpg"
        },
        {
            name: "Everest Garam Masala",
            weight: "100 g",
            price: "₹75",
            mrp: "₹85",
            discount: "₹10 off",
            image: "https://www.jiomart.com/images/product/original/490573732/everest-garam-masala-100-g-product-images-o490573732-p490573732-0-202203150609.jpg"
        },
        {
            name: "Red Chilli Powder",
            weight: "100 g",
            price: "₹55",
            mrp: "₹65",
            discount: "₹10 off",
            image: "https://www.jiomart.com/images/product/original/490573733/mdh-deggi-mirch-powder-100-g-product-images-o490573733-p490573733-0-202203150609.jpg"
        },
        {
            name: "Coriander Powder",
            weight: "200 g",
            price: "₹45",
            mrp: "₹55",
            discount: "₹10 off",
            image: "https://www.jiomart.com/images/product/original/490573734/mdh-dhania-powder-100-g-product-images-o490573734-p490573734-0-202203150609.jpg"
        },
        {
            name: "Cumin Seeds",
            weight: "100 g",
            price: "₹65",
            mrp: "₹75",
            discount: "₹10 off",
            image: "https://www.jiomart.com/images/product/original/490573735/mdh-jeera-whole-100-g-product-images-o490573735-p490573735-0-202203150609.jpg"
        }
    ],
    'tea-coffee': [
        {
            name: "Tata Tea Premium",
            weight: "500 g",
            price: "₹265",
            mrp: "₹285",
            discount: "₹20 off",
            image: "https://www.jiomart.com/images/product/original/490001629/tata-tea-premium-500-g-product-images-o490001629-p490001629-0-202203150702.jpg"
        },
        {
            name: "Nescafe Classic",
            weight: "200 g",
            price: "₹525",
            mrp: "₹545",
            discount: "₹20 off",
            image: "https://www.jiomart.com/images/product/original/490001626/nescafe-classic-coffee-200-g-product-images-o490001626-p490001626-0-202203150702.jpg"
        }
    ],
    'cleaning': [
        {
            name: "Surf Excel",
            weight: "1 kg",
            price: "₹199",
            mrp: "₹220",
            discount: "₹21 off",
            image: "https://www.jiomart.com/images/product/original/490001628/surf-excel-quick-wash-detergent-powder-1-kg-product-images-o490001628-p490001628-0-202203150702.jpg"
        },
        {
            name: "Vim Dishwash Bar",
            weight: "200 g",
            price: "₹20",
            mrp: "₹25",
            discount: "₹5 off",
            image: "https://www.jiomart.com/images/product/original/490001627/vim-dishwash-bar-200-g-product-images-o490001627-p490001627-0-202203150702.jpg"
        }
    ]
};

function loadProducts(category) {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = ''; // Clear existing products
    
    const products = productDatabase[category] || [];
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<div class="no-products">No products available</div>';
        return;
    }
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="discount-badge">${product.discount}</div>
        <img src="${product.image}" alt="${product.name}">
        <div class="product-details">
            <h3>${product.name}</h3>
            <p class="weight">${product.weight}</p>
            <div class="price">
                <span class="current-price">${product.price}</span>
                <span class="mrp">MRP ${product.mrp}</span>
            </div>
            <button class="add-to-cart">Add to Cart</button>
        </div>
    `;

    // Add click handler for product details
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('add-to-cart') && 
            !e.target.closest('.quantity-selector')) {
            showProductModal(product);
        }
    });

    // Add quantity selector functionality
    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        const quantitySelector = createQuantitySelector();
        this.replaceWith(quantitySelector);
    });

    return card;
}

function showProductModal(product) {
    const modal = document.getElementById('productModal');
    
    // Update modal content
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalWeight').textContent = product.weight;
    document.getElementById('modalCurrentPrice').textContent = product.price;
    document.getElementById('modalMRP').textContent = `MRP ${product.mrp}`;
    document.getElementById('modalDiscount').textContent = product.discount;
    document.getElementById('modalProductImage').src = product.image;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function createQuantitySelector() {
    const quantitySelector = document.createElement('div');
    quantitySelector.className = 'quantity-selector';
    quantitySelector.innerHTML = `
        <button class="minus">−</button>
        <span>1</span>
        <button class="plus">+</button>
    `;

    let quantity = 1;
    const quantitySpan = quantitySelector.querySelector('span');
    
    quantitySelector.querySelector('.minus').addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity;
        } else {
            const addBtn = document.createElement('button');
            addBtn.className = 'add-to-cart';
            addBtn.textContent = 'Add to Cart';
            quantitySelector.replaceWith(addBtn);
            
            addBtn.addEventListener('click', function() {
                this.replaceWith(createQuantitySelector());
            });
        }
    });

    quantitySelector.querySelector('.plus').addEventListener('click', () => {
        quantity++;
        quantitySpan.textContent = quantity;
    });

    return quantitySelector;
} 