const removeAllTag = document.querySelector('.remove_all');
removeAllTag.onclick = (e) => {
    const cartContainerTags = document.querySelectorAll('.cart_container')
    if(window.confirm('Do you want to remove all items?')) {
        Array.prototype.forEach.call(cartContainerTags, function( node ) {
            node.parentNode.removeChild( node );
        });
        localStorage.removeItem('cart');
        console.log('test')
    }
    console.log(cartContainerTags)
}



