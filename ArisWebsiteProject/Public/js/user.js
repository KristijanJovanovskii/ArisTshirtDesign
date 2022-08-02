let loader = document.querySelector('.loader');

const becomeUserElement = document.querySelector('.become-user');
const productListingElement = document.querySelector('.product-listing');
const applyForm = document.querySelector('.apply-form');
const showApplyFormBtn = document.querySelector('#apply-btn');

window.onload = () => {
    if(sessionStorage.user){
        let user = JSON.parse(sessionStorage.user);
        if(compareToken(user.authToken, user.email)){
            if(!user){
                becomeUserElement.classList.remove('hide');
            } else{
                productListingElement.classList.remove('hide');
            }
        } else{
            location.replace('/login');
        }
        
    } else{
        location.replace('/login');
    }
}

showApplyFormBtn.addEventListener('click', () => {
    becomeUserElement.classList.add('hide');
    applyForm.classList.remove('hide');
})

// form submission

const applyFormButton = document.querySelector('#apply-form-btn');
const userName = document.querySelector('#client-name');
const about = document.querySelector('#about');
const number = document.querySelector('#number');
const tac = document.querySelector('#terms');

applyFormButton.addEventListener('click', () => {
    if(!userName.value.length || !about.value.length || !number.value.length){
        showAlertToken('fill all the inputs');
    } else if(!tac.checked){
        showAlertToken('you must agree to our terms');
    } else{
        //making server request
        loader.style.display = 'block';
        sendDataToken('/user', {
            name: userName.value,
            about: about.value,
            number: number.value,
            tac: tac.checked,
            email: JSON.parse(sessionStorage.user).email
        })
    }
})
