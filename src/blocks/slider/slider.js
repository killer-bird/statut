const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const slider = document.querySelector('.slider');
const track = document.querySelector('.slider_track')
const items = document.querySelectorAll('.slider_track__item');
const item = document.querySelector('.slider_track__item');
const dots = document.querySelectorAll('.slider__dots__item')

let pos = 0;
let current = 0;
let old = 0;
let sliderIndex = 0;


const sliderLen = slider.offsetWidth * items.length - slider.offsetWidth;
console.log(sliderLen, items)
const slide = (pos)=>{
    track.style.left = pos + 'px'
}


next.addEventListener('click', ()=>{
    pos-=slider.offsetWidth;
    dots[current].classList.remove("--active");
    console.log(pos, sliderLen)
    if(pos < -sliderLen){
        pos = 0;
        dots[current].classList.remove("--active");
        current = 0;
        dots[current].classList.add("--active");
    }else{
        current++;
        dots[current].classList.add("--active");
    }
    slide(pos)
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
    slide(pos)
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
            slide(pos)
        })
        
    })
})

const move = (e)=> {
    let offset = e.clientX - slider.getBoundingClientRect().left
    const point = 50
    let curr = e.clientX - old
    console.log(curr, point)
    if(curr >= point){
        console.log("right", curr)
       
        
        
    }
    if(curr<= -point){
        console.log("left", offset)
        pos -= slider.offsetWidth
        slide(pos)
        curr = 0;
          
    }
}

track.addEventListener('pointerdown', (e)=>{
    e.preventDefault
    track.ondragstart = ()=>false;
    old = e.clientX
    
    
    track.addEventListener("pointermove", move)
})
slider.addEventListener('dragstart', ()=>{
    return false
})
track.addEventListener('pointerup',()=>{
    document.removeEventListener("pointermove", move)
    console.log("remove")
})