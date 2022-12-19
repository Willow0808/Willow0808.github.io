document.addEventListener('DOMContentLoaded',function(){
    var btns = document.querySelectorAll('.plusbtn');
    for(var i = 0; i < btns.length; i++){
        btns[i].addEventListener('click',function(e){
            quantity = e.target.closest("div").querySelector(".count")
            let num = parseInt(quantity.innerHTML)
            num = num + 1
            quantity.innerHTML = num
        },false);
    }
},false);

document.addEventListener('DOMContentLoaded',function(){
    var btns = document.querySelectorAll('.minusbtn');
    for(var i = 0; i < btns.length; i++){
        btns[i].addEventListener('click',function(e){
            quantity = e.target.closest("div").querySelector(".count")
            let num = parseInt(quantity.innerHTML)
            num = num - 1
            if(num < 0){
                num = 0
            }
            quantity.innerHTML = num
        },false);
    }
},false);
