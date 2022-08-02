const productImges = document.querySelectorAll(".product-images img");
const productImgesSlide = document.querySelector(".image-slider");

let activateImageSlide = 0;

productImges.forEach((item, i) => {
    item.addEventListener('click' , () => {
        productImges[activateImageSlide].classList.remove('active');
        item.classList.add('active');
        productImgesSlide.style.backgroundImage = `url('${item.src}')`;
        activateImageSlide = i;
    })
})

// toggle size buttons

const sizeBtns = document.querySelectorAll('.size-radio-btn');
let checkedBtn = 0;

sizeBtns.forEach((item, i) => {
    item.addEventListener('click', () => {
        sizeBtns[checkedBtn].classList.remove('check');
        item.classList.add('check');
        checkedBtn = i;

    })
})