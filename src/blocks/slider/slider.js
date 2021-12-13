const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const slider = document.querySelector('.slider');
const items = document.querySelectorAll('.slider__item');
const item = document.querySelector('.slider__item');
const dots = document.querySelectorAll('.slider__dots__item')

let pos = 0;
let current = 0;

const sliderLen = slider.offsetWidth * items.length - slider.offsetWidth;

const rangeKeeper = (val)=>{
    if(val > 0){
        return -Math.abs(sliderLen)
    }
    if(val < sliderLen) {
        return 0
    }
}
items.forEach(item=>{
    item.style.minWidth = slider.offsetWidth + 'px';
    console.log('done');
})

next.addEventListener('click', ()=>{
    pos-=slider.offsetWidth;
    dots[current].classList.remove("--active");
    
    if(pos < -sliderLen){
        pos = 0;
        dots[current].classList.remove("--active");
        current = 0;
        dots[current].classList.add("--active");
    }else{
        current++;
        dots[current].classList.add("--active");
    }
    items.forEach(item=>{
        item.style.left = pos + 'px';
    })
    console.log(current)
    
})
prev.addEventListener('click', ()=>{
    pos+=slider.offsetWidth;
    dots[current].classList.remove("--active");
    
    if( pos > 0 ){
        pos = -sliderLen;
        dots[current].classList.remove("--active");
        current = 3;
        dots[current].classList.add("--active");
    }else{
        current--;
        dots[current].classList.add("--active");
    }
    items.forEach(item=>{
        item.style.left = pos + 'px';
    })

})
dots.forEach((dot, index)=>{
    dot.addEventListener('click', (e)=>{
        if(e.target.classList.contains('--active')){
            return
        }
        items.forEach(item=>{
            pos = index * -slider.offsetWidth;
            dots[current].classList.remove("--active");
            current = index;
            dots[current].classList.add("--active");
            item.style.left = pos + 'px';
        })
        
    })
})