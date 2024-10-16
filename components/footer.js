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
            <style>
                footer .container-fluid {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    padding: 26px 10px;
                    a {
                        text-decoration: none;
                        color: #000;
                        font-size: clamp(0.875rem, 0.149vw + 0.845rem, 0.938rem);
                        line-height: clamp(1.645rem, 0.28vw + 1.589rem, 1.763rem);
                        font-family: "Raleway", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
                    }
                    .social-bar {
                        margin: 21px 0;
                        padding: 0;
                        display: inline-flex;
                        li {
                            list-style: none;
                            a i {
                                font-size: 20px;
                                letter-spacing: 10px;
                            }
                        }
                    }
                    p {
                        margin: 0;
                        font-size: clamp(0.75rem, 0.298vw + 0.69rem, 0.875rem);
                        line-height: clamp(1.343rem, 0.533vw + 1.236rem, 1.566rem);
                        font-family: "Raleway", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
                    }
                }
                @media (min-width: 768px) {
                    footer .container-fluid {
                        padding: 31px 0;
                        ul {
                            margin: 20px 0 43px;
                        }
                    }
                }
            </style>
        `;
    }
  }
  customElements.define('footer-component', Footer);