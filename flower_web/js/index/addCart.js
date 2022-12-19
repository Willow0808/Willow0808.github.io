const addCartTags = [...document.querySelectorAll('.seasonal_section .button')];
// const addCartTags = [...document.getElementsByClassName('button')];
// console.log(addCartTags)

for(i=0; i<addCartTags.length; i++) {
    const addCartTag = addCartTags[i];
    // console.log(addCartTag)
    const addCart = function (e) {
        console.log(e);
        console.log(e.target);
        const itemNumber = e.target.getAttribute('data-item_number');
        const storedItems = JSON.parse(localStorage.getItem('cart'));
        console.log("is array?", Array.isArray(storedItems));
        console.log(storedItems);
        if(Array.isArray(storedItems) && storedItems.length > 0) {
            console.log("length", storedItems.length)
            storedItems.push(itemNumber);
            console.log("insertedItem", storedItems)
            localStorage.setItem('cart', JSON.stringify(storedItems));
        } else {
            const arrayItemNumber = [itemNumber];
            localStorage.setItem('cart', JSON.stringify(arrayItemNumber));
        }
    }
    addCartTag.onclick = (e) => {
        if(window.confirm('Do you want to add this item?')) {
            addCart(e);
        }
    };
}

