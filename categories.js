document.addEventListener('DOMContentLoaded', () => {
    // Handle subcategory clicks
    document.querySelectorAll('.subcategory-item').forEach(item => {
        item.addEventListener('click', () => {
            const categoryId = item.dataset.category;
            const categoryName = item.querySelector('span').textContent;
            
            // Store category info for products page
            sessionStorage.setItem('selectedCategory', categoryId);
            sessionStorage.setItem('categoryName', categoryName);
            sessionStorage.setItem('previousPage', 'categories.html');
            
            // Navigate to products page
            window.location.href = 'products.html';
        });
    });

    // Back button functionality
    document.querySelector('.back-button').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Bottom navigation functionality
    document.querySelectorAll('.bottom-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href') !== '#') {
                sessionStorage.setItem('previousPage', window.location.pathname);
            }
        });
    });

    // Add touch feedback
    const items = document.querySelectorAll('.subcategory-item');
    items.forEach(item => {
        item.addEventListener('touchstart', () => {
            item.style.backgroundColor = '#f0f0f0';
        });
        
        item.addEventListener('touchend', () => {
            item.style.backgroundColor = '#f8f8f8';
        });
    });
}); 