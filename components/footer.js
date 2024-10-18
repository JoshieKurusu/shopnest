class Footer extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <div class="container-fluid">
                    <a href="https://joshmarveycruz.netlify.app/" target="_blank">https://joshmarveycruz.netlify.app/</a>
                    <ul class="social-bar">
                        <li><a href="#"><i class="fa fa-link"></i></a></li>
                        <li><a href="#"><i class="fa fa-link"></i></a></li>
                        <li><a href="#"><i class="fa fa-link"></i></a></li>
                    </ul>
                    <p>&copy2024 by ShopNest. Proudly designed with <a href="https://www.wix.com/">Wix.com</a></p>
                </div>
            </footer>
        `;
    }
  }
  customElements.define('footer-component', Footer);