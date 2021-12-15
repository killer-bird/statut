const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const slider = document.querySelector('.slider');
const track = document.querySelector('.slider_track')
const items = document.querySelectorAll('.slider_track__item');
const item = document.querySelector('.slider_track__item');
const dots = document.querySelectorAll('.slider__dots__item')


let old = 0;
let dragging = false;
let sliderIndex = 0;


const sliderLen = slider.offsetWidth * items.length - slider.offsetWidth;

const slide = ()=>{
    if(sliderIndex > items.length -1){
        sliderIndex = 0
    }
    if(sliderIndex < 0){
        
        sliderIndex = 3
    }
   
    dots[sliderIndex].classList.add("--active");
    track.style.left = sliderIndex * -slider.offsetWidth + 'px'
    console.log("slide")
}


next.addEventListener('click', ()=>{
    dots[sliderIndex].classList.remove("--active");
    sliderIndex++
    slide()
})


prev.addEventListener('click', ()=>{
    dots[sliderIndex].classList.remove("--active");
    sliderIndex--
    slide()
})


dots.forEach((dot, index)=>{
    dot.addEventListener('click', (e)=>{
        if(e.target.classList.contains('--active')){
            return
        }
        items.forEach(item=>{
            dots[sliderIndex].classList.remove("--active");
            sliderIndex = index;
            dots[sliderIndex].classList.add("--active");
            slide()
        })
        
    })
})

track.ondragstart = () => false;

const moveEvent = (e)=> {
    if(dragging){

        console.log("move")
        dots[sliderIndex].classList.remove("--active");
        if(e.clientX > old){
            sliderIndex--
            old = e.clientX
        }
        if(e.clientX < old){
            sliderIndex++
            old = e.clientX
            
        }
        slide()
        endEvent()
    }

}
const startEvent = (e)=>{
    console.log("eventStarted")
    dragging = true
    old = e.clientX
    track.addEventListener('pointermove', moveEvent)
}
const endEvent = ()=>{
    dragging = false
    console.log("event ended")
    document.removeEventListener('pointermove', moveEvent);
    document.removeEventListener('pointerup', endEvent);
}

track.addEventListener('pointerdown', startEvent);
track.addEventListener('pointerup', endEvent);




