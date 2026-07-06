'use strict';
const s=document.querySelectorAll('.show-modal');
const  modal=document.querySelector('.modal');
s.forEach(element => {
    element.addEventListener('click',
    function(){
        // document.querySelector('.hidden').style.display='block';
        // document.querySelector('.overlay').style.display='block';
        modal.classList.remove("hidden");
        document.querySelector('.overlay').classList.remove("hidden");
        
    }
)
});

document.querySelector('.close-modal').addEventListener('click',
    function(){
        document.querySelector('.overlay').classList.add('hidden');
        modal.classList.add("hidden");
        
    }
) 
document.querySelector('.overlay').addEventListener('click',
    function(){
         document.querySelector('.overlay').classList.add('hidden');
        document .querySelector('.modal').classList.add('hidden');
    }
) 
document.addEventListener('keydown',function(e){
    if (e.key=='Escape'&& !modal.classList.contains('hidden'))
    { 
           document.querySelector('.overlay').classList.add('hidden');
        document .querySelector('.modal').classList.add('hidden');
    }
console.log(e);
})