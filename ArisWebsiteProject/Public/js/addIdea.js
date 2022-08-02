let user = JSON.parse(sessionStorage.user || null);
let loader = document.querySelector('.loader');

// cheking user is logged in or not
window.onload = () => {
    if(user){
        if(!compareToken(user.authToken, user.email)){
                location.replace('/login');
        }
    } else{
        location.replace('/login');
    }
}       

// upload imagde handle
let uploadImages = document.querySelector('.fileupload');
let imagePaths = []; // will store all uploaded paths;

const number = document.querySelector('#user-number');
const userEmail = document.querySelector('#user-Email');
const numberOfPeaces = document.querySelector('#peaces');

uploadImages.forEach((fileupload, index) => {
    fileupload.addEventListener('change', () => {
        const file = fileupload.files[0];
        let imageUrl;

        if(file.type.includes('image')){
            //means user uploaded an image
            fetch('/s3url').then(res => res.json())
            .then(url => {
                fetch(url,{
                    method: 'PUT',
                    headers: new Headers({'Content-Type': 'multipart/from data'}),
                    body: file
                }).then(res => {
                    imageUrl = url.split("?")[0];
                    imagePaths[index] = imageUrl;
                    let label = document.querySelector(`lable[for=${fileupload.id}]`
                    );
                    label.style.backgroundImage = `url(${imageUrl})`;
                    let productImage = document.querySelector('.product-image');
                    productImage.getElementsByClassName.backgroundImage = `url(${imageUrl})`;
                })
            })
        }
    })
})
