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
        <div><a :href="path('/docs/')">DOCS</a></div>
        <div><a :href="path('/tutorials/')">TUTORIALS</a></div>
        <div><a href="https://forum.entando.org/">FORUM</a></div>
        <div><a href="https://www.entando.com/page/en/blog">BLOG</a></div>
      </div>
    </div>
    <div class="secondary-header layout-container">
      <div class="nav width-container">
        <ul>
          <li><a :href="path('/docs/')">DOCS</a></li>
          <li><a :href="path('/tutorials/')">TUTORIALS</a></li>
          <li><a href="https://forum.entando.org/" target="_blank">FORUM</a></li>
          <li><a href="https://www.entando.com/page/en/blog" target="_blank">BLOG</a></li>
        </ul>
      </div>
    </div>
    <!-- Start open-shift main content    -->
    <div v-if="openshift" class="main-content">
      <div class="layout-container" >
        <div class="get-started-grid width-container">
          <div class="get-started-left openshift">
            <img src="./assets/logo-openshift.png" alt="openshift"/>
          </div>
          <div class="get-started-right">
            <p>Greetings, OpenShift users! See the links below to get started with your Entando journey or click <a :href="path('/tutorials/backend-developers/generate-microservices-and-micro-frontends.html')">here</a> to learn how Entando can be used to generate micro frontends and microservices within OpenShift.</p>
          </div>
        </div>
      </div>
      <div class="begin-developing layout-container openshift-bkgd">
        <div class="width-container">
          <h1>Begin Developing</h1>
          <h1>with Entando</h1>
          <p>Micro Frontend Platform for OpenShift</p>
          <div class="button-container">
            <a :href="path('/tutorials/devops/installation/open-shift/openshift-install.html')">GET STARTED</a>
            <a href="https://github.com/entando/" target="_blank"><img src="./assets/github.svg" />GITHUB</a>
            <a href="https://join.slack.com/t/entandocommunity/shared_invite/zt-g609owdv-2K~YRh8zrI6lqlWo4aFWUw" target="_blank"><img src="./assets/slack-icon-white.png" />TEAM SLACK</a>
          </div>
        </div>
      </div>
      <div class="layout-container">
        <div class="get-started-grid width-container">
          <div class="get-started-left">
            <h2>Get Started<br class="br-lg"> with Entando in<br> 3 Easy Steps</h2>
            <p>New to Entando? Check out our <a :href="path('/docs/')">Documents</a> and <a :href="path('/tutorials/')">Tutorials</a> where you’ll get hands-on experience with the platform.</p>
          </div>
          <div class="get-started-right">

            <h3 id="step-1" @click="toggleStepOne($event)">Connect to OpenShift</h3>
            <div>
              <p>Deploy a local OpenShift instance. Alternatively, request the default hostname and credentials from your managed cluster administrator.</p>
              <div class="instruction">
                <ul>
                  <li>
                    <a href="https://docs.okd.io/3.11/minishift/getting-started/installing.html">OpenShift 3.11 (Minishift)</a>
                  </li>
                  <li>
                    <a href="https://developers.redhat.com/products/codeready-containers/download">OpenShift 4 (Code Ready Containers)</a>
                  </li>
                </ul>
              </div>
              <p>Note the IP address of your instance</p>
              <div class="instruction">minishift ip</div>
              <p>or</p>
              <div class="instruction">crc ip</div>
              <p>Login to OpenShift from the command line</p>
              <div class="instruction">oc login</div>
            </div>

            <hr class="get-started-separator" />

            <h3 id="step-2" @click="toggleStepTwo($event)">Prepare OpenShift</h3>
            <div style="display:none">
              <p>Download the Entando Custom Resource Definitions (CRDs)</p>
              <div class="instruction">
                curl -L -C - https://raw.githubusercontent.com/entando/entando-releases/{{activeVersionTag}}/dist/qs/custom-resources.tar.gz | tar -xz
              </div>
              <p>Install the Entando CRDs</p>
              <div class="instruction">
                oc create -f dist/crd
              </div>
              <p>Create the Entando project</p>
              <div class="instruction">
                oc new-project entando
              </div>
              <p>Download Helm chart. Note: if you have OpenShift 3.11, use entando-okd3.yaml for the remaining steps.</p>
              <div class="instruction">
                curl -L -C - -O https://raw.githubusercontent.com/entando/entando-releases/{{activeVersionTag}}/dist/qs/entando-okd4.yaml
              </div>
              <p>Set an environment variable using the IP address from Step 1. For a managed cluster address, you can remove .nip.io from the value.</p>
              <div class="instruction">
                IP=MY_OPENSHIFT_IP.nip.io
              </div>
              <p>Update the Helm chart using your IP</p>
              <div class="instruction">
                sed -i "s/192.168.64.25.nip.io/$IP/" entando-okd4.yaml
              </div>
            </div>

            <hr class="get-started-separator" />

            <h3 id="step-3" @click="toggleStepThree($event)">Deploy Entando</h3>
            <div style="display:none">
              <p>Create Kubernetes objects to define your cluster's desired state</p>
              <div class="instruction">
                oc create -f entando-okd4.yaml
              </div>
              <p>Watch the installation until the cluster is ready for use, indicated by a pod named <span>quickstart-server-*</span> with 3/3 in the READY column and RUNNING in the STATUS column. Use CTRL-C to stop watching the deployment</p>
              <div class="instruction">
                oc get pods -n entando --watch
              </div>
              <p>Get the URL to access Entando from your local browser, e.g. <span>quickstart-entando.192.168.64.25.nip.io/app-builder/</span></p>
              <div class="instruction">
                oc get ingress -n entando -o jsonpath='{.items[2].spec.rules[*].host}{.items[2].spec.rules[*].http.paths[2].path}{"\n"}'
              </div>
              <p>Login to the <span>Entando App Builder</span> with username:<span>admin</span>, password: <span>adminadmin</span></p>
              <p>See the <a :href="path('/docs/')">Docs</a> and <a :href="path('/tutorials/')">Tutorials</a> to continue your journey with Entando.</p>
            </div>

            <hr class="get-started-separator" />

            <div class="spacer"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- End open-shift main content    -->
    <!-- Start default/jhipster main content    -->
    <div v-else class="main-content">
      <div v-if="jhipster" class="layout-container" >
        <div class="get-started-grid width-container">
          <div class="get-started-left jhipster">
            <img src="./assets/logo-jhipster.svg" alt="jhipster"/>
            JHipster
          </div>
          <div class="get-started-right">
            <p>Greetings, Java Hipster! See the links below to get started with your Entando journey or click <a :href="path('/tutorials/backend-developers/generate-microservices-and-micro-frontends.html')">here</a> to learn how Entando leverages JHipster to generate micro frontends and microservices.</p>
          </div>
        </div>
      </div>
      <div class="begin-developing layout-container" v-bind:class="{'jhipster-bkgd': jhipster}">
        <div class="width-container">
          <h1>Begin Developing</h1>
          <h1>with Entando</h1>
          <p>Micro Frontend Platform for Kubernetes</p>
          <div class="button-container">
            <a :href="path('/docs/getting-started/')">GET STARTED</a>
            <a href="https://github.com/entando/" target="_blank"><img src="./assets/github.svg" />GITHUB</a>
            <a href="https://join.slack.com/t/entandocommunity/shared_invite/zt-g609owdv-2K~YRh8zrI6lqlWo4aFWUw" target="_blank"><img src="./assets/slack-icon-white.png" />TEAM SLACK</a>
          </div>
        </div>
      </div>

      <div class="layout-container">
        <div class="get-started-grid width-container">
          <div class="get-started-left">
            <h2>Get Started<br class="br-lg"> with Entando in<br> 2 Easy Steps</h2>
            <p>New to Kubernetes and hypervisors? Check out our <a :href="path('/docs/getting-started/')">in-depth guide</a> where you’ll get hands-on experience, and learn Kubernetes as you go for each step of the process.</p>
          </div>

          <div class="get-started-right">

            <h3 id="step-1" @click="toggleStepOne($event)">Install Multipass</h3>
            <div>
              <p>Install Multipass as a quick way to setup an Ubuntu VM</p>
              <div class="instruction">
                 <a href="https://multipass.run/#install" target="_blank">https://multipass.run/#install</a>
              </div>
            </div>

            <hr class="get-started-separator" />

            <h3 id="step-2" @click="toggleStepTwo($event)">Install Entando</h3>
            <div style="display:none">
              <p>Install the Entando CLI</p>
              <div class="instruction">
                curl -sfL https://get.entando.org | bash
              </div>
              <p>The progress of the install will be displayed on the console and can take 10 minutes or so depending on the time needed to download the Docker images.</p>
              <p>Once complete, the installer will give you the URL to access the <span>Entando App Builder</span>.</p>
              <p>Login with username:<span>admin</span> and password: <span>adminadmin</span></p>
              <p>See the <a :href="path('/docs/')">Docs</a> and <a :href="path('/tutorials/')">Tutorials</a> to continue your journey with Entando!</p>
            </div>
            <hr class="get-started-separator" />

            <div class="spacer"></div>
          </div>
        </div>
      </div>

    </div>
    <Tracking/>
  </div>
</template>

<script>
import EntandoCodeCopy from './EntandoCodeCopy'
import Vue from 'vue'

export default {
  data: function() {
    return {
      activeVersionPath: "/v6.3",
      activeVersionTag: "v6.3.0",
      isStepOneOpen: true,
      isStepTwoOpen: false,
      isStepThreeOpen: false,
    }
  },
  props: ['jhipster','openshift'],
  updated () {
    this.update()
  },
  methods: {
    //This code is copied from CodeCopy plugin and can be removed if/when this layout merges into the theme
    update() {
      setTimeout(() => {
        document.querySelectorAll('.instruction').forEach(el => {
          if (el.classList.contains('code-copy-added')) return
          let ComponentClass = Vue.extend(EntandoCodeCopy)
          let instance = new ComponentClass()

          let options = {
            align: 'top',
            color: '#27b1ff',
            backgroundColor: '#0075b8',
            backgroundTransition: true,
            successText: 'Copied!',
            staticIcon: true
          }
          instance.options = { ...options }
          instance.code = el.innerText
          instance.parent = el
          instance.$mount()
          el.classList.add('code-copy-added')
          el.appendChild(instance.$el)
        })
      }, 100)
    },
    path: function(path) {
      return this.activeVersionPath + path;
    },
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
        const step3 = document.getElementById("step-3");
        if (step3) {
          step3.nextElementSibling.style.display = 'none';
          step3.style.backgroundImage = "url('/theme/3.svg'), url('/theme/up-arrow.svg')";
        }

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
        const step3 = document.getElementById("step-3");
        if (step3) {
          step3.nextElementSibling.style.display = 'none';
          step3.style.backgroundImage = "url('/theme/3.svg'), url('/theme/up-arrow.svg')";
        }

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
.code-copy-added:hover>.code-copy svg {
  opacity: .75;
}
</style>
<style>
  @import url('css/main.css');
</style>
