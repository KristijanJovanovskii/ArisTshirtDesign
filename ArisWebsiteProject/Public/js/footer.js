const createFooter = () => {
    let footer = document.querySelector('footer');

    footer.innerHTML = `
    <div class="footer-content">
        <img src="img/aris original_2022-03-06_19-46-29-286.png" class="logo" alt="">
        <div class="footer-ul-container">
            <ul class="category">
                <li class="category-title">men</li>
                <li><a href="#" class="footer-link">t-shirts</a></li>
                <li><a href="#" class="footer-link">hoodies</a></li>
            </ul>
            <ul class="category">
                <li class="category-title">woman</li>
                <li><a href="#" class="footer-link">t-shirts</a></li>
                <li><a href="#" class="footer-link">hoodies</a></li>
            </ul>
            <ul class="category">
                <li class="category-title">pet</li>
                <li><a href="#" class="footer-link">t-shirts</a></li>
                <li><a href="#" class="footer-link">hoodies</a></li>
            </ul>
        </div>
    </div>
    <p class="footer-title">about us</p>
    <p class="info">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis esse fugiat explicabo nulla culpa placeat quo tempora natus non officia?
    </p>
    <p class="info">support emails -help@aris.com, customersupport@aris.com</p>
    <p class="info">telephone - 000 000 000</p>
    <div class="footer-social-container">
        <div>
            <a href="#" class="social-link">terms & serveces</a>
            <a href="#" class="social-link">privacy page</a>
        </div>
        <div>
            <a href="#" class="social-link">instagram</a>
            <a href="#" class="social-link">facebook</a>
        </div>
    </div>
    <p class="footer-credit">Aris Design</p>

    
    `;
}

createFooter();