fetch('../../data/seasonalItem.json')
    .then((response) => response.json())
    .then(
        function (data) {
            console.log(data);
            const items = data.data;
            for(i=0; i < items.length; i++) {
                const item = items[i];
                // console.log(item.name);
                // console.log(item.price);
                const displayTag = document.querySelector('.seasonal_section .main_items div:nth-child('+(i+1)+')');
                console.log(displayTag);
                const itmeNameTag = displayTag.querySelector('.item_name');
                // console.log(itmeNameTag);
                const itemPriceTag = displayTag.querySelector('.item_price');
                const itemImgTag = displayTag.querySelector('.item_img');
                const addCartBtn = displayTag.querySelector('.button');
                itmeNameTag.innerHTML = item.name;
                itemPriceTag.innerHTML= numberWithCommas(item.price) + "円";
                itemImgTag.src = item.img;
                addCartBtn.setAttribute('data-item_number', item.itemId);
            }
        }
    );