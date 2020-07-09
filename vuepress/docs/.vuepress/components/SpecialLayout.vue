<template>
  <div id="dev-entando">

    <div class="primary-header layout-container">
      <nav class="nav width-container">
        <div>
          <a class="logo" href="http://www.entando.com">
            <img src="./assets/entando_square_logo.svg" />
          </a>
          <a class="logo" href="/">
            <img src="./assets/entando_developers.png" />
          </a>
        </div>
        <ul>
          <li>
            <a href="http://www.entando.com/page/en/platform-overview">PRODUCTS</a>
          </li>
          <li>
            <a href="http://www.entando.com/page/en/subscriptions">SERVICES</a>
          </li>
          <li>
            <a href="http://www.entando.com/page/en/webinars">RESOURCES</a>
          </li>
          <li>
            <a href="http://www.entando.com/page/en/partners">PARTNERS</a>
          </li>
          <li>
            <a href="http://www.entando.com/page/en/blog">NEWS</a>
          </li>
        </ul>

        <div class="top-right-links">
          <a href="https://www.entando.com/en/login_form.page">
            LOGIN  <img src="./assets/account.svg">
          </a>
        </div>

        <div class="hamburger-menu" @click="toggleHamburgerMenu()"></div>
      </nav>
      <div class="hamburger-menu-content">
        <div>
          <a href="http://www.entando.com">ENTANDO.COM</a>
        </div>
        <div>
          <a href="http://www.entando.com/page/en/platform-overview">PRODUCTS</a>
        </div>
        <div>
          <a href="http://www.entando.com/page/en/subscriptions">SERVICES</a>
        </div>
        <div>
          <a href="http://www.entando.com/page/en/webinars">RESOURCES</a>
        </div>
        <div>
          <a href="http://www.entando.com/page/en/partners">PARTNERS</a>
        </div>
        <div>
          <a href="http://www.entando.com/page/en/blog">NEWS</a>
        </div>
        <hr>
        <div><a href="https://www.entando.com/en/login_form.page">LOGIN</a></div>
        <hr>
        <div><a href="/v6.1/docs/">DOCS</a></div>
        <div><a href="/v6.1/tutorials/">TUTORIALS</a></div>
        <div><a href="https://forum.entando.org/">FORUM</a></div>
        <div><a href="https://www.entando.com/page/en/blog">BLOG</a></div>
      </div>
    </div>
    <div class="secondary-header layout-container">
      <div class="nav width-container">
        <ul>
          <li><a href="/v6.1/docs/">DOCS</a></li>
          <li><a href="/v6.1/tutorials/">TUTORIALS</a></li>
          <li><a href="https://forum.entando.org/" target="_blank">FORUM</a></li>
          <li><a href="https://www.entando.com/page/en/blog" target="_blank">BLOG</a></li>
        </ul>
      </div>
    </div>
    <div class="main-content">
      <div class="begin-developing layout-container">
        <div class="width-container">
          <h1>Begin Developing</h1>
          <h1>with Entando</h1>
          <p>Micro Frontend Platform for Kubernetes</p>
          <div class="button-container">
            <a href="/v6.1/docs/getting-started/">GET STARTED</a>
            <a href="https://github.com/entando/" target="_blank"><img src="./assets/github.svg" />GITHUB</a>
          </div>
        </div>
      </div>

      <div class="layout-container">
        <div class="get-started-grid width-container">
          <div class="get-started-left">
            <h2>Get Started<br class="br-lg"> with Entando in<br> 3 Easy Steps</h2>
            <p>New to Kubernetes and hypervisors? Check out our <a href="/v6.1/docs/getting-started/">in-depth guide</a> where you’ll get hands-on experience, and learn Kubernetes as you go for each step of the process.</p>
          </div>

          <div class="get-started-right">

            <h3 id="step-1" @click="toggleStepOne($event)">Install Kubernetes</h3>
            <div>
              <p>Install <a href="https://multipass.run/#install">Multipass</a></p>
              <p>Launch VM</p>
              <div class="instruction">
                multipass launch --name ubuntu-lts --cpus 4 <span>\<br></span>--mem 8G --disk 20G
              </div>
              <p>Open a shell</p>
              <div class="instruction">
                multipass shell ubuntu-lts
              </div>
              <p>Install k3s</p>
              <div class="instruction">
                curl -sfL https://get.k3s.io | sh -
              </div>
            </div>

            <hr class="get-started-separator" />

            <h3 id="step-2" @click="toggleStepTwo($event)">Prepare Kubernetes</h3>
            <div style="display:none">
              <p>Download Entando custom resource definitions</p>
              <div class="instruction">
                curl -L -C - <span class="hide-xl">\<br></span>https://dev.entando.org/assets/yaml/custom-resources.tar.gz <span class="hide-xl">\<br></span>| tar -xz
              </div>
              <p>Create custom resources</p>
              <div class="instruction">
                sudo kubectl create -f custom-resources
              </div>
              <p>Create namespace</p>
              <div class="instruction">
                sudo kubectl create namespace entando
              </div>
              <p>Download Helm chart</p>
              <div class="instruction">
                curl -L -C - -O <span>\<br></span>https://dev.entando.org/assets/yaml/entando.yaml
              </div>
              <p>Configure access to your cluster</p>
              <div class="instruction">
                IP=$(hostname -I | awk '{print $1}')<br>
                sed -i "s/192.168.64.25/$IP/" entando.yaml
              </div>
            </div>

            <hr class="get-started-separator" />

            <h3 id="step-3" @click="toggleStepThree($event)">Deploy Entando</h3>
            <div style="display:none">
              <p>Create Kubernetes objects to define your cluster's desired state</p>
              <div class="instruction">
                sudo kubectl create -f entando.yaml
              </div>
            </div>

            <hr class="get-started-separator" />

            <div class="spacer"></div>

          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isStepOneOpen: true,
      isStepTwoOpen: false,
      isStepThreeOpen: false,
    }
  },
  methods: {
    toggleStepOne: function(event) {
      if (this.isStepOneOpen) {
        event.target.nextElementSibling.style.display = 'none';
        event.target.style.backgroundImage = "url('/theme/1.svg'), url('/theme/up-arrow.svg')";
      }
      else {
        event.target.nextElementSibling.style.display = 'block';
        event.target.style.backgroundImage = "url('/theme/1.svg'), url('/theme/down-arrow.svg')";

        document.getElementById("step-2").nextElementSibling.style.display = 'none';
        document.getElementById("step-2").style.backgroundImage = "url('/theme/2.svg'), url('/theme/up-arrow.svg')";
        document.getElementById("step-3").nextElementSibling.style.display = 'none';
        document.getElementById("step-3").style.backgroundImage = "url('/theme/3.svg'), url('/theme/up-arrow.svg')";

        this.isStepTwoOpen = false;
        this.isStepThreeOpen = false;
      }
      this.isStepOneOpen = !this.isStepOneOpen;
    },
    toggleStepTwo: function(event) {
      if (this.isStepTwoOpen) {
        event.target.nextElementSibling.style.display = 'none';
        event.target.style.backgroundImage = "url('/theme/2.svg'), url('/theme/up-arrow.svg')";
      }
      else {
        event.target.nextElementSibling.style.display = 'block';
        event.target.style.backgroundImage = "url('/theme/2.svg'), url('/theme/down-arrow.svg')";

        document.getElementById("step-1").nextElementSibling.style.display = 'none';
        document.getElementById("step-1").style.backgroundImage = "url('/theme/1.svg'), url('/theme/up-arrow.svg')";
        document.getElementById("step-3").nextElementSibling.style.display = 'none';
        document.getElementById("step-3").style.backgroundImage = "url('/theme/3.svg'), url('/theme/up-arrow.svg')";

        this.isStepOneOpen = false;
        this.isStepThreeOpen = false;
      }
      this.isStepTwoOpen = !this.isStepTwoOpen;
    },
    toggleStepThree: function(event) {
      if (this.isStepThreeOpen) {
        event.target.nextElementSibling.style.display = 'none';
        event.target.style.backgroundImage = "url('/theme/3.svg'), url('/theme/up-arrow.svg')";
      }
      else {
        event.target.nextElementSibling.style.display = 'block';
        event.target.style.backgroundImage = "url('/theme/3.svg'), url('/theme/down-arrow.svg')";

        document.getElementById("step-1").nextElementSibling.style.display = 'none';
        document.getElementById("step-1").style.backgroundImage = "url('/theme/1.svg'), url('/theme/up-arrow.svg')";
        document.getElementById("step-2").nextElementSibling.style.display = 'none';
        document.getElementById("step-2").style.backgroundImage = "url('/theme/2.svg'), url('/theme/up-arrow.svg')";

        this.isStepOneOpen = false;
        this.isStepTwoOpen = false;
      }
      this.isStepThreeOpen = !this.isStepThreeOpen;
    },
    toggleHamburgerMenu: function() {
      document.getElementById('dev-entando').classList.toggle('hamburger-view');
    },
  }
}
</script>

<style>
  @import url('css/main.css');
</style>
