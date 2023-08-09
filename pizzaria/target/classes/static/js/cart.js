window.addEventListener('scroll', function() {
    var cartContainer = document.querySelector('.cart-container');
    var cart = document.getElementById('cart');
    var cartHeight = cart.offsetHeight;
    var windowHeight = window.innerHeight;
    var scrollPosition = window.pageYOffset;

    if (scrollPosition + windowHeight >= cartContainer.offsetTop + cartHeight) {
        cart.classList.add('cart-fixed');
    } else {
        cart.classList.remove('cart-fixed');
    }
});