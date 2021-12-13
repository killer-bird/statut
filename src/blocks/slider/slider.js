let pos = 0;
const show = 1;
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const slider = document.querySelector('.slider');
const items = document.querySelectorAll('.slider__item');
const item = document.querySelector('.slider__item');
const itemWidth = slider.offsetWidth / show;
const sliderLen = itemWidth * items.length;


items.forEach(item=>{
    item.style.minWidth = itemWidth + 'px';
    console.log('done')
})

next.addEventListener('click', ()=>{

    pos-=itemWidth
    items.forEach(item=>{
        item.style.left = pos + 'px'
    })

    
})
prev.addEventListener('click', ()=>{
    pos+=itemWidth
    items.forEach(item=>{
        item.style.left = pos + 'px'
    })

})