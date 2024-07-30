document.addEventListener('DOMContentLoaded', function() {
    const buyNowButtons = document.querySelectorAll('.buy-now');
    const cartCount = document.getElementById('cart-count');
    const cartList = document.querySelector('.cart-list');
    const totalPriceElement = document.getElementById('total-price');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    function updateCartPage() {
        if (cartList) {
            cartList.innerHTML = '';
            let total = 0;
            if (cart.length === 0) {
                cartList.innerHTML = '<p>No items in cart.</p>';
            } else {
                cart.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.classList.add('cart-item');
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <h3>${item.name}</h3>
                        <p>Rs.${item.price}</p>
                        <p>Quantity: ${item.quantity}</p>
                        <button class="remove" data-name="${item.name}">Remove</button>
                    `;
                    cartList.appendChild(cartItem);
                    total += item.price * item.quantity;
                });
            }
            totalPriceElement.textContent = total;
        }
    }

    function addToCart(product) {
        const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartPage();
    }

    function removeFromCart(productName) {
        cart = cart.filter(item => item.name !== productName);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartPage();
    }

    buyNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productItem = this.parentElement;
            const product = {
                name: productItem.getAttribute('data-name'),
                price: parseFloat(productItem.getAttribute('data-price')),
                image: productItem.querySelector('img').src,
                quantity: 1
            };
            addToCart(product);
        });
    });

    if (cartList) {
        cartList.addEventListener('click', function(event) {
            if (event.target.classList.contains('remove')) {
                const productName = event.target.getAttribute('data-name');
                removeFromCart(productName);
            }
        });
    }

    updateCartCount();
    updateCartPage();

    // Slider functionality
    const slider = document.querySelector('.slider');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const slides = document.querySelectorAll('.slider img');
    let currentIndex = 0;

    function showSlide(index) {
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Auto-move slider
    setInterval(nextSlide, 3000); // Adjust the time interval as needed
});
