(window.webpackJsonp=window.webpackJsonp||[]).push([[554],{1756:function(e,t,a){"use strict";a.r(t);var s=a(36),n=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"build-and-publish-a-simple-bundle"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#build-and-publish-a-simple-bundle"}},[e._v("#")]),e._v(" Build and Publish a Simple Bundle")]),e._v(" "),a("h2",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),a("p",[e._v("In this tutorial you will learn how to create a simple Entando bundle and deploy it into the Entando Component Repository. This involves manually defining a bundle with a single widget, checking the bundle artifacts into Git, applying the Entando bundle custom resource to Kubernetes, and then installing the bundle into an application.")]),e._v(" "),a("h2",{attrs:{id:"prerequisites"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),a("ul",[a("li",[e._v("Use the "),a("RouterLink",{attrs:{to:"/v6.3.2/docs/reference/entando-cli.html#check-environment"}},[e._v("Entando CLI")]),e._v(" to verify all dependencies for this tutorial are installed (e.g. Java, npm, Git).")],1)]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("ent check-env develop\n")])])]),a("ul",[a("li",[e._v("Authenticated Git credentials, an empty Git repository and an available Entando instance are required for the commands below to execute without errors.")])]),e._v(" "),a("p",[e._v("Publishing a bundle can be simplified by using the "),a("code",[e._v("ent prj")]),e._v(" command and its publication system (pbs) convenience methods. Both the CLI and manual commands are provided.")]),e._v(" "),a("h2",{attrs:{id:"create-the-project-structure"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#create-the-project-structure"}},[e._v("#")]),e._v(" Create the project structure")]),e._v(" "),a("p",[e._v("First create a parent project directory (e.g. "),a("code",[e._v("example-bundle")]),e._v(") along with a child bundle directory. In a project generated by the Entando Component Generator the microservice and micro frontend source files live under the parent directory.")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("mkdir")]),e._v(" -p example-bundle/bundle"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" example-bundle/bundle\n")])])]),a("h2",{attrs:{id:"add-a-simple-widget"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#add-a-simple-widget"}},[e._v("#")]),e._v(" Add a simple widget")]),e._v(" "),a("p",[e._v("Create a widget directory")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("mkdir")]),e._v(" widgets\n")])])]),a("p",[e._v("Create a widget descriptor file within that directory")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("touch")]),e._v(" widgets/example-widget.yaml\n")])])]),a("p",[e._v("Populate the widget descriptor file "),a("code",[e._v("example-widget.yaml")]),e._v(" with a simple definition. Make sure to retain the correct YAML indentation of 2 or 4 spaces.")]),e._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("code")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" example"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("widget\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("titles")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n   "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("en")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" Example Widget\n   "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("it")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" Widget d'esempio\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("group")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" free\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("customUi")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" <h2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("Hi from Example Widget</h2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("\n")])])]),a("h2",{attrs:{id:"create-the-bundle-descriptor"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#create-the-bundle-descriptor"}},[e._v("#")]),e._v(" Create the bundle descriptor")]),e._v(" "),a("p",[e._v("The main file processed by the Entando Component Repository is "),a("code",[e._v("descriptor.yaml")]),e._v(", which describes all of the components within the bundle. The name of the bundle descriptor file must be "),a("code",[e._v("descriptor.yaml")]),e._v(" and it must be stored in the child bundle directory (e.g. "),a("code",[e._v("example-bundle/bundle")]),e._v(").")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("touch")]),e._v(" descriptor.yaml\n")])])]),a("p",[e._v("Populate the bundle descriptor file with the following YAML definition")]),e._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("code")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" example"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("bundle\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("description")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" This is an example of an Entando bundle\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("components")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("widgets")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" widgets/example"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("widget.yaml\n")])])]),a("p",[e._v("Component descriptor file names and locations (e.g. "),a("code",[e._v("widgets/example-widget.yaml")]),e._v(") are arbitrary since the bundle descriptor explicitly points to those files. Convention is to group components by type with all widgets in one directory, all page templates in another, etc.")]),e._v(" "),a("h2",{attrs:{id:"publish-the-bundle"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#publish-the-bundle"}},[e._v("#")]),e._v(" Publish the bundle")]),e._v(" "),a("p",[e._v("The bundle can be published using the CLI or the steps can be performed manually.")]),e._v(" "),a("h3",{attrs:{id:"cli-steps"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cli-steps"}},[e._v("#")]),e._v(" CLI steps")]),e._v(" "),a("ol",[a("li",[e._v("Change to the project directory if needed")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" example-bundle\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[e._v("Initialize the Entando project and accept the defaults")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("ent prj init\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[e._v("Initialize the publication system. This step requires the empty Git repository URL (ending in .git) and your Git credentials.")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("ent prj pbs-init\n")])])]),a("ol",{attrs:{start:"4"}},[a("li",[e._v("Publish the bundle to Git. By convention the first version is assigned the tag "),a("code",[e._v("v0.0.1")]),e._v(' but the prefix "v" is optional.')])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("ent prj pbs-publish\n")])])]),a("p",[e._v("Running just the command "),a("code",[e._v("ent prj pbs-publish")]),e._v(" will quickly push subsequent iterations of the bundle to Git. You will be asked to input the bundle version each time. To ensure that iterations are listed in the correct order you must be consistent with versioning format and alphanumeric precedence.")]),e._v(" "),a("ol",{attrs:{start:"5"}},[a("li",[e._v("The bundle can now be deployed into the Entando Component Repository with one command")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("ent prj deploy\n")])])]),a("p",[e._v("The "),a("code",[e._v("prj deploy")]),e._v(" command uses the Git repository URL and project name (e.g. "),a("code",[e._v("example-bundle")]),e._v(") to create the custom resource.")]),e._v(" "),a("ol",{attrs:{start:"6"}},[a("li",[e._v("Jump to "),a("a",{attrs:{href:"#install-the-bundle-into-an-application"}},[e._v("Install the bundle into an application")]),e._v(" to finish installing your bundle.")])]),e._v(" "),a("h3",{attrs:{id:"manual-steps"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#manual-steps"}},[e._v("#")]),e._v(" Manual steps")]),e._v(" "),a("ol",[a("li",[e._v("Change to the bundle directory if needed")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" example-bundle/bundle\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[e._v("Run the following commands to initialize Git and commit the files")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" init\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("add")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v(".")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" commit -m "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"Init Git repository"')]),e._v("\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[e._v("Add your remote repository as origin and push the bundle")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" remote "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("add")]),e._v(" origin https://your/remote/repository.git\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" push -u origin master\n")])])]),a("ol",{attrs:{start:"4"}},[a("li",[e._v("Publish a Git tag")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" tag -a "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"v0.0.1"')]),e._v(" -m "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"My first tag"')]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" push --tags\n")])])]),a("ol",{attrs:{start:"5"}},[a("li",[e._v("Now that you've published your bundle to Git you can create the Kubernetes custom resource for it.")])]),e._v(" "),a("p",[e._v("Install the bundler if you haven't previously done so")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("npm")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v(" -g  @entando/entando-bundler@6.3.2\n")])])]),a("p",[e._v("To generate the custom resource for your bundle run the "),a("code",[e._v("entando-bundler from-git")]),e._v(" command, then provide your remote Git repository URL via the "),a("code",[e._v("--repository")]),e._v(" option and the correct namespace via "),a("code",[e._v("--namespace")]),e._v(". You can also provide a thumbnail for your bundle with "),a("code",[e._v("--thumbnail-file")]),e._v(" or "),a("code",[e._v("--thumbnail-url")]),e._v(".")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("entando-bundler from-git --name"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("example-bundle --namespace"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("entando --repository"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("https://your/remote/repository.git --dry-run "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" example-bundle.yaml\n")])])]),a("p",[e._v("Now you can apply this definition to Kubernetes. You may need to first transfer the file to your VM (e.g using "),a("code",[e._v("multipass transfer")]),e._v(").")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl -n entando apply -f example-bundle.yaml\n")])])]),a("p",[e._v("You can confirm the presence of your custom resource with the command "),a("code",[e._v("kubectl get EntandoDeBundle -n entando")]),e._v(".")]),e._v(" "),a("h2",{attrs:{id:"install-the-bundle-into-an-application"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#install-the-bundle-into-an-application"}},[e._v("#")]),e._v(" Install the bundle into an application")]),e._v(" "),a("p",[e._v("Your bundle should appear in "),a("code",[e._v("App Builder")]),e._v(" → "),a("code",[e._v("Component Repository")]),e._v(" in your Entando instance. Clicking "),a("code",[e._v("Install")]),e._v(" should allow version selection if your bundle has multiple iterations.")]),e._v(" "),a("p",[e._v("The Entando platform will then download and install the components contained in the bundle. Once complete you should see the "),a("code",[e._v("Install")]),e._v(" button change to give you the option to "),a("code",[e._v("Uninstall")]),e._v(" that specific version. If you navigate to "),a("code",[e._v("Components")]),e._v(" → "),a("code",[e._v("Micro Frontends & Widgets")]),e._v(" you should find your custom widget within the "),a("code",[e._v("User")]),e._v(" section.")])])}),[],!1,null,null,null);t.default=n.exports}}]);