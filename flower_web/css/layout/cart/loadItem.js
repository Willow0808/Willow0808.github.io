const itemListTag = document.querySelector('.item_list');
console.log(itemListTag);

const storedItems = JSON.parse(localStorage.getItem('cart')) ?? [];
console.log(storedItems);

const getStoredItems = () => {
    return JSON.parse(localStorage.getItem('cart'));
}

const removeItem = (evt) => {
    console.log(evt);
    const removeTag = evt.target.closest('.remove');
    const cartContainer = removeTag.closest('.cart_container');
    const removeIndex = removeTag.getAttribute('data-item_index');
    const removeItemNumber = removeTag.getAttribute('data-item_number');
    // console.log(cartContainer);
    // console.log("removeItemNumber", removeItemNumber);
    if(window.confirm("Do you want to remove?")) {
        const currentStoredItems = getStoredItems();
        const newStoreItems = [];
        for(i=0; i<currentStoredItems.length;  i++) {
            if(currentStoredItems[i] != removeItemNumber) {
                newStoreItems.push(currentStoredItems[i]);
            }
        }
        console.log(newStoreItems);
        localStorage.setItem('cart', JSON.stringify(newStoreItems));
        cartContainer.remove();
    }
}

const plusCount = (evt) => {
    console.log(evt);
    const plusTag = evt.target;
    const counterTag = plusTag.closest('.counter');
    const itemNumber = parseInt(counterTag.getAttribute("data-item_number")).toString();
    const countNumberTag = counterTag.querySelector('.count_number');
    countNumberTag.innerText = parseInt(countNumberTag.innerText) + 1;
    const currentStoredItems = getStoredItems();
    currentStoredItems.push(itemNumber.toString());
    console.log(currentStoredItems);
    localStorage.setItem('cart', JSON.stringify(currentStoredItems));
}

const minusCount = (evt) => {
    console.log(evt);
    const minusTag = evt.target;
    const counterTag = minusTag.closest('.counter');
    const itemNumber = parseInt(counterTag.getAttribute("data-item_number")).toString();
    const countNumberTag = counterTag.querySelector('.count_number');
    if(countNumberTag.innerText > 0) {
        const currentCount = parseInt(countNumberTag.innerText);
        countNumberTag.innerText = currentCount - 1; 
        const currentStoredItems = getStoredItems();
        const deleteIndex = currentStoredItems.lastIndexOf(itemNumber, 1);
        currentStoredItems.splice(deleteIndex, 1);
        console.log(currentStoredItems);
        localStorage.setItem('cart', JSON.stringify(currentStoredItems));
    }
}

const loadItemToCart = (itemNumber, indexNumber, count) => {
    fetch('../../data/items/'+itemNumber+'.json')
    .then((response) => response.json())
    .then(
        function (data) {
            console.log(data);
            const itemInfo = data.data;
            const itemAreaTag = document.createElement('div');
            itemListTag.appendChild(itemAreaTag);
            itemAreaTag.outerHTML = `
            <div class="cart_container">
                    <div class="productI">
                        <img width="200px" style="margin-right:70px; border-radius: 10%;" 
                        src="../${itemInfo.img}" alt="">
                    </img>
                    </div>
                    <div class="description"  style= "margin-top:auto; margin-bottom: auto;">
                        <p style="font-weight:bold; color:gray;">${itemInfo.name}</p>
                            <span class="price1">価格</span>
                            <span itemprop="price" content="1980" class="price2">${numberWithCommas(itemInfo.price)}円</span>
                            <span class="tax_postage">(税込)</span>
                    <div class="saveremove">
                            <div class="save"><u>Save for later(準備中)</u></div>
                            <div class="remove" data-item_index="${indexNumber}" data-item_number="${itemNumber}"><u>Remove</u></div>
                        </div>
                        <p>個数</p>
                    <div class="counter" data-item_number="${itemNumber}">
                        <button id="btn" class="plusbtn">+</button>
                        <div class="count_number">${count}</div>
                        <button id="btn" class="minusbtn">-</button>    
                        </div>          
                    </div>
                </div>
            `;

            const removeTag = document.querySelector(`div.remove[data-item_number='${indexNumber}']`);
            console.log(removeTag);
            removeTag.onclick = removeItem;

            const countTag = document.querySelector(`div.counter[data-item_number='${itemNumber}'`);
            console.log("countTag", countTag);
            const plusBtn = countTag.querySelector('.plusbtn');
            const minusBtn = countTag.querySelector('.minusbtn');
            console.log("plusBtn", plusBtn);
            console.log("minusBtn", minusBtn);

            plusBtn.onclick = plusCount;
            minusBtn.onclick = minusCount;
        }
    )
}

const renewItemInfo = {};
for(i =0; i<storedItems.length ;i++) {
    if(typeof renewItemInfo[storedItems[i]] === "undefined") {
        renewItemInfo[storedItems[i]] = 1;
    } else {
        renewItemInfo[storedItems[i]] = renewItemInfo[storedItems[i]] + 1;
    }
}

console.log('renewItemInfo', renewItemInfo);

let index = 0;
for (const itemNumber in renewItemInfo) {
    index++;
    loadItemToCart(itemNumber, itemNumber, renewItemInfo[itemNumber]);
}