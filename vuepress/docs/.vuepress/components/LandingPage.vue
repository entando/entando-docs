<template>
  <div
      id="dev-entando">
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
        <p>Application Composition Platform for OpenShift</p>
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
            <p>If you're on OpenShift 4.6 or higher you can use the Red Hat-certified Entando Operator to install an Entando Application. You can find those instructions <a :href="path('/tutorials/devops/installation/open-shift/openshift-install-by-operator.html')">here</a> or proceed with the manual steps below.</p>
            <p>Deploy a local OpenShift instance. Alternatively, request the default hostname and credentials from your managed cluster administrator.</p>
            <div class="language-sh"><pre><ul><li><a href="https://docs.okd.io/3.11/minishift/getting-started/installing.html" target="_blank">OpenShift 3.11 (Minishift)</a></li><li><a href="https://developers.redhat.com/products/codeready-containers/download" target="_blank">OpenShift 4 (Code Ready Containers)</a></li></ul></pre>
            </div>
            <p>Note the IP address of your instance</p>
            <div class="language-sh"><pre>minishift ip</pre></div>
            <p>or</p>
            <div class="language-sh"><pre>crc ip</pre></div>
            <p>Login to OpenShift from the command line</p>
            <div class="language-sh"><pre>oc login</pre></div>
          </div>

          <hr class="get-started-separator" />

          <h3 id="step-2" @click="toggleStepTwo($event)">Prepare OpenShift</h3>
          <div style="display:none">
            <p>Download the Entando Custom Resource Definitions (CRDs)</p>
            <div class="language-sh"><pre>curl -L -C - https://raw.githubusercontent.com/entando/entando-releases/{{activeVersionTag}}/dist/qs/custom-resources.tar.gz | tar -xz</pre></div>
            <p>Install the Entando CRDs</p>
            <div class="language-sh"><pre>oc create -f dist/crd</pre></div>
            <p>Create the Entando project</p>
            <div class="language-sh"><pre>oc new-project entando</pre></div>
            <p>Download Helm chart. Note: if you have OpenShift 3.11, use entando-okd3.yaml for the remaining steps.</p>
            <div class="language-sh"><pre>curl -L -C - -O https://raw.githubusercontent.com/entando/entando-releases/{{activeVersionTag}}/dist/qs/entando-okd4.yaml</pre></div>
            <p>Set an environment variable using the IP address from Step 1. For a managed cluster address, you can remove .nip.io from the value.</p>
            <div class="language-sh"><pre>IP=MY_OPENSHIFT_IP.nip.io</pre></div>
            <p>Update the Helm chart using your IP</p>
            <div class="language-sh"><pre>sed -i "s/192.168.64.25.nip.io/$IP/" entando-okd4.yaml</pre></div>
          </div>

          <hr class="get-started-separator" />

          <h3 id="step-3" @click="toggleStepThree($event)">Deploy Entando</h3>
          <div style="display:none">
            <p>Create Kubernetes objects to define your cluster's desired state</p>
            <div class="language-sh"><pre>oc create -f entando-okd4.yaml</pre></div>
            <p>Watch the installation until the cluster is ready for use, indicated by a pod named <span>quickstart-server-*</span> with 3/3 in the READY column and RUNNING in the STATUS column. Use CTRL-C to stop watching the deployment</p>
            <div class="language-sh"><pre>oc get pods -n entando --watch</pre></div>
            <p>Get the URL to access Entando from your local browser, e.g. <span>quickstart-entando.192.168.64.25.nip.io/app-builder/</span></p>
            <div class="language-sh"><pre>oc get ingress -n entando -o jsonpath='{.items[2].spec.rules[*].host}{.items[2].spec.rules[*].http.paths[2].path}{"\n"}'</pre></div>
            <p>Login to the <span>Entando App Builder</span> with username:<span>admin</span>, password: <span>adminadmin</span></p>
            <p>Choose an action from the <a :href="path('/docs/getting-started/#next-steps')">Next Steps</a> list to continue your journey with Entando!</p>
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
        <p>Application Composition Platform for Kubernetes</p>
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
          <p>New to Kubernetes and hypervisors? Check out our <a :href="path('/docs/getting-started/')">in-depth guide</a> where you’ll get hands-on experience, and learn Kubernetes as you go through each step of the process.</p>
        </div>

        <div class="get-started-right">

          <h3 id="step-1" @click="toggleStepOne($event)">Install Multipass</h3>
          <div>
            <p>Install Multipass as a quick way to setup an Ubuntu VM</p>
            <div class="language-sh">
              <pre><a href="https://multipass.run/#install" target="_blank">https://multipass.run/#install</a></pre>
            </div>
          </div>

          <hr class="get-started-separator" />

          <h3 id="step-2" @click="toggleStepTwo($event)">Install Entando</h3>
          <div style="display:none">
            <p>Install Entando into Kubernetes on Ubuntu using the Entando CLI</p>
            <div class="language-sh">
              <pre>curl -sfL https://get.entando.org | bash</pre>
            </div>
            <p>The progress of the install will be displayed on the console and can take 10 minutes or so depending on the time needed to download the Docker images.</p>
            <p>Once complete, the installer will give you the URL to access the <span>Entando App Builder</span>.</p>
            <p>Login with username: <span>admin</span> and password: <span>adminadmin</span></p>
            <p>Choose an action from the <a :href="path('/docs/getting-started/#next-steps')">Next Steps</a> list to continue your journey with Entando!</p>
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
  props: ['jhipster','openshift'],

  data: function() {
    return {
      activeVersionPath: "/v6.3.2",
      activeVersionTag: "v6.3.2",
      isStepOneOpen: true,
      isStepTwoOpen: false,
      isStepThreeOpen: false,
      isSidebarOpen: false
    }
  },

  methods: {
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
  }
}
</script>
<style>
@import url('css/main.css');
</style>
