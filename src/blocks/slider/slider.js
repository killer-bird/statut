const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const slider = document.querySelector('.slider');
const track = document.querySelector('.slider_track')
const items = document.querySelectorAll('.slider_track__item');
const item = document.querySelector('.slider_track__item');
const dots = document.querySelectorAll('.slider__dots__item')


let old = 0;


let sliderIndex = 0;


const sliderLen = slider.offsetWidth * items.length - slider.offsetWidth;

const slide = (pos)=>{
    track.style.left = pos + 'px'
}


next.addEventListener('click', ()=>{
    dots[sliderIndex].classList.remove("--active");
    sliderIndex++
    console.log(sliderIndex)
    if(sliderIndex > items.length -1){
        sliderIndex = 0
        dots[sliderIndex].classList.add("--active");
    }else{
        
        dots[sliderIndex].classList.add("--active");
    }
    slide(sliderIndex * -slider.offsetWidth)
})


prev.addEventListener('click', ()=>{
    dots[sliderIndex].classList.remove("--active");
    sliderIndex--
    console.log(sliderIndex)
    if( sliderIndex < 0 ){
        
        sliderIndex = 3;
        dots[sliderIndex].classList.add("--active");
    }else{
        
        
        dots[sliderIndex].classList.add("--active");
    }
    console.log(sliderIndex * slider.offsetWidth)
    slide(sliderIndex * -slider.offsetWidth)
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
            slide(index * -slider.offsetWidth)
        })
        
    })
})

track.ondragstart = () => false;

const moveEvent = (e)=> {

    // console.log("eventMove", e.clientX, old)
    // if(e.clientX > old){
    //     
    //     old = e.clientX
    // }
    // if(e.clientX < old){
    //     sliderIndex--
    //     old = e.clientX
    // }
    
    let offset = e.clientX - slider.getBoundingClientRect().left
    const point = 50
    let curr = e.clientX - old   
    console.log(curr, point)

    if(curr >= point){
        console.log("right", curr) 
        sliderIndex++ 
    }
    if(curr<= -point){
        console.log("left", offset)
        sliderIndex--       
    }
    slide(sliderIndex * -slider.offsetWidth)

    endEvent()
}
const startEvent = (e)=>{
    console.log("eventStarted")
    
    // track.addEventListener('touchmove', moveEvent)
    track.addEventListener('pointerdown', moveEvent)
}
const endEvent = ()=>{
    console.log("event ended")
    document.removeEventListener('touchmove', moveEvent);
    document.removeEventListener('mousemove', moveEvent);
    document.removeEventListener('touchend', endEvent);
    document.removeEventListener('pointerup', endEvent);
}

track.addEventListener('touchstart', startEvent);
track.addEventListener('pointerdown', startEvent);

track.addEventListener('touchend', endEvent);
track.addEventListener('pointerup', endEvent);





track.addEventListener