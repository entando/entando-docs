<template>
  <body class="entando-labs">
    <nav class="navbar navbar-expand-lg sticky-top entando-navbar">
      <div class="container entando-container">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <div id="entando-toogle-button">
            <input type="checkbox">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <a class="navbar-brand" href="http://quickstart-entando-portal.cloudapps.entando.org/entando-de-app/en/homepage.page "></a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto entando-navbar-menu">
            <li class="nav-item dropdown jqui-slide">
              <a href="/docs" class="nav-link dropdown-toggle"">DOCS </a>
            </li>
            <li class="nav-item dropdown jqui-slide">
              <a href="https://forum.entando.org" class="nav-link dropdown-toggle" target="_blank">FORUM</a>
            </li>
            <li class="nav-item dropdown jqui-slide">
              <a href="#" class="nav-link dropdown-toggle">BLOG</a>
            </li>
            <li class="nav-item dropdown jqui-slide">
              <a href="http://quickstart-entando-portal.cloudapps.entando.org/entando-de-app/" class="nav-link dropdown-toggle link-home" target="_blank">ENTANDO.COM </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <section class="entando-banner entando-labs-banner">
      <div class=" container entando-container">
        <div class="row no-gutters">
          <div class="col-12 col-md-6 central-wrapper">
            <div class="entando-banner-text-wrapper">
              <h1>Begin Developing with Entando</h1>
              <p>Micro Frontend Platform for Kubernetes</p>
            </div>
            <div class="entando-banner-links">
              <a class="btn entando-banner-btn" href="#" target="_blank">GET STARTED</a>
              <a class="btn entando-banner-btn" href="https://github.com/entando" target="_blank">
                <i class="fab fa-github"></i> &nbsp; GITHUB </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="generic-banners margin get-started" style="background-color:#00A0DF;">
      <div class=" container entando-container">
        <div class="row row row-eq-height background">
          <div class="col-12 col-md-6">
            <div class="">
              <div class="box-content mt-0 mt-md-5">
                <h2>Get Started with Entando in 3 Easy Steps</h2>
                <p>New to Kubernetes and hypervisors? Check out our <span class="highlighted"> in-depth guide</span> where you’ll get hands-on experience and learn Kubernetes as you go for each step of the process.</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 px-1 px-md-3">
            <div class="accordion">
              <div class="accordion-title">
                <button class="btn-accordion" type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="true" aria-controls="collapseExample">
                  <div class="title-number">1</div>
                  <div class="title-text">Install Kubernetes</div>
                  <div class="accordion-icon"> <i class="fa-inverse fas fa-chevron-circle-down fa-fw fa-pull-right"></i></div>
                </button>
              </div>
              <div id="collapse1" class="collapse show" aria-labelledby="headingOne">
                <div class="card card-body">
                  <div class="">Install <span class="highlighted">Multipass</span></div>
                  <div class="">Launch Ubuntu VM </div>
                  <div class="bg-white color-primary">multipass launch --name ubuntu-lts --cpus 4 --mem 8G --disk 20G</div>
                  <div>
                  </div>
                </div>
              </div>



              <div class="accordion-title">
                <button class="btn-accordion collapsed" type="button" data-toggle="collapse" data-target="#collapse2" aria-expanded="false" aria-controls="collapseExample">
                  <div class="title-number">2</div>
                  <div class="title-text text-break">Prepare Kubernetes Environment</div>
                  <div class="accordion-icon"><i class="fas fa-chevron-circle-down fa-fw fa-pull-right"></i></div>
                </button>
              </div>
              <div id="collapse2" class="collapse" aria-labelledby="headingOne">
                <div class="card card-body">
                  <div class="">1.&nbsp;Download Entando custom resource definitions</div>
                  <div class="mx-4">
                    <div class="bg-white color-primary">wget -c https://es-entando.github.io/custom-resources.tar.gz -O - | tar -xz</div>
                  </div>
                  <div class="spacer"></div>
                  <div class="">2.&nbsp;Create custom resources in your env</div>
                  <div class="mx-4">
                    <div class="bg-white color-primary">sudo kubectl create -f custom-resources</div>
                  </div>
                  <div class="spacer"></div>
                  <div class="">3.&nbsp;Create namespace</div>
                  <div class="mx-4">
                    <div class="bg-white color-primary">wget https://es-entando.github.io/entando.yaml</div>
                  </div>
                  <div class="spacer"></div>
                  <div class="">4.&nbsp; Configure access to your cluster</div>
                  <div class="mx-4">
                    <div class="bg-white color-primary">IP=$(hostname -I | awk '{print $1}') sed -i "s/192.168.64.25/$IP/" entando.yaml</div>
                  </div>
                  <div>
                  </div>
                </div>
              </div>




              <div class="accordion-title">
                <button class="btn-accordion collapsed" type="button" data-toggle="collapse" data-target="#collapse3" aria-expanded="false" aria-controls="collapseExample">
                  <div class="title-number">3</div>
                  <div class="title-text">Deploy Entando</div>
                  <div class="accordion-icon"><i class="fa-inverse fas fa-chevron-circle-down fa-fw fa-pull-right"></i></div>
                </button>
              </div>
              <div id="collapse3" class="collapse" aria-labelledby="headingOne">
                <div class="card card-body">
                  <div class="bg-white color-primary">sudo kubectl create -f entando.yaml</div>
                  <div>
                  </div>
                </div>
              </div>

            </div> <!-- end accordion -->

          </div>
        </div>
      </div>
    </section>
    <section class="entando-labs-cards">
      <div class=" container entando-container grid-cards">
        <div class="card1">
          <div class="card">
            <div class="card-body">
              <div class="card-title">
                <div class="icon"><img style="padding: 10px 0" src="./img/Quick_Launch_Guide.svg"></img></div>
                <div class="title"><a href="#">Quick Launch Guide</a></div>
              </div> <!-- card-title -->
              <div class="container content ">
                <div class="row no-gutters">
                  <div class="col-6">
                    <p>What are micro frontends?<p>
                        <p>Create a React micro frontend</p>
                  </div>
                  <div class="col-6">
                    <p>Step-by-step full install guide </p>
                    <p>Rapid app development with blueprints</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="card2">
          <div class="card">
            <div class="card-body">
              <div class="card-title">
                <div class="icon"><img src="./img/Learn_to_use_Entando.svg"></img></div>
                <div class="title"><a href="#">Learn to Use Entando</a></div>
              </div><!-- card-title -->
              <div class="container content ">
                <div class="row no-gutters">
                  <div class="col-6">
                    <p>Create apps with the App Builder </p>
                    <p>Content Management</p>
                  </div>
                  <div class="col-6">
                    <p>Automate business processes</p>
                    <p>Entando architecture</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card3">
          <div class="card">
            <div class="card-body">
              <div class="container content-icon">
                <div class="icon">
                  <img src="./img/View_Docs.svg"></img>
                  <a href="#">View Docs</a>
                </div>
                <div class="icon">
                  <img src="./img/Get_Started.svg"></img>
                  <a href="#">Get Started</a>
                </div>
                <div class="icon">
                  <img src="./img/Ask_the_community.svg"></img>
                  <a href="#">Ask the community</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </body>
</template>

<script>
export default {
  mounted() {
    let dropdownAnimationScript = document.createElement('script')
    dropdownAnimationScript.setAttribute('src', './js/dropdownAnimation.js')
    document.head.appendChild(dropdownAnimationScript)

    let animationScript = document.createElement('script')
    animationScript.setAttribute('src', './js/animations.js')
    document.head.appendChild(animationScript)
  }
}
</script>

<style>
@import url(css/all.min.css);
@import url(css/bootstrap.min.css);
@import url(css/debug.css);
@import url(css/entando.css);
@import url(css/entando-labs.css);
@import url(css/media-queries.css);
</style>
