(window.webpackJsonp=window.webpackJsonp||[]).push([[572],{1772:function(e,t,a){"use strict";a.r(t);var s=a(36),n=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"installation-on-tanzu-kubernetes-grid"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#installation-on-tanzu-kubernetes-grid"}},[e._v("#")]),e._v(" Installation on Tanzu Kubernetes Grid")]),e._v(" "),a("h2",{attrs:{id:"prerequisites"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),a("ul",[a("li",[e._v("An installed instance of Tanzu")]),e._v(" "),a("li",[e._v("A load balancer with an external IP or inbound DNS name for your cluster")])]),e._v(" "),a("h3",{attrs:{id:"tanzu-configuration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tanzu-configuration"}},[e._v("#")]),e._v(" Tanzu Configuration")]),e._v(" "),a("p",[e._v("Ensure that the storage class in your Tanzu installation is marked as the "),a("code",[e._v("default")]),e._v(". The default storage class will include a marker as the default in the name column. For example,")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl get sc\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("NAME                 PROVISIONER             RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE\nstandard (default)   kubernetes.io/gce-pd    Delete          Immediate              true                   23h\n")])])]),a("p",[e._v("Patch the storage type for your cluster if necessary. If you are using a master Kubernetes instance you may need to patch the storage class in that instance.\nA default storage class can be assigned by adding this annotation to the storage class:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('metadata:\n  annotations:\n    storageclass.kubernetes.io/is-default-class: "true"\n')])])]),a("p",[e._v("See "),a("a",{attrs:{href:"#appendix-a-persistent-volumes-and-storage"}},[e._v("Appendix A")]),e._v(" for more advanced storage class configurations.")]),e._v(" "),a("h4",{attrs:{id:"patch-tanzu-file-system-types"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#patch-tanzu-file-system-types"}},[e._v("#")]),e._v(" Patch Tanzu File System Types")]),e._v(" "),a("p",[e._v("If your are running on Tanzu Kubernetes Grid 1.2.1 you need to patch the fs-type on the vsphere controller deployment. Details can be found in the "),a("a",{attrs:{href:"https://docs.vmware.com/en/VMware-Tanzu-Kubernetes-Grid/1.2.1/rn/VMware-Tanzu-Kubernetes-Grid-121-Release-Notes.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Tanzu\nKuberetes Grid Release notes"),a("OutboundLink")],1),e._v("\nunder the heading\n"),a("code",[e._v("Pods using PersistentVolumeClaim do not start or remain in the CrashLoopBackOff status, and Grafana and Harbor extension deployments fail")])]),e._v(" "),a("p",[e._v("This issue will present in an Entando deployment as a failure to create persistent volume claims in the Keycloak or\nServer pods on deployment.")]),e._v(" "),a("p",[e._v("To fix any existing clusters that you deployed perform the following steps:")]),e._v(" "),a("ol",[a("li",[e._v("Update the vsphere-csi-controller configuration.")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('kubectl patch deployment -n kube-system vsphere-csi-controller --type=json -p=\'[{"op": "add", "path": "/spec/template/spec/containers/4/args/-", "value": "--default-fstype=ext4"}]\'\n')])])]),a("ol",{attrs:{start:"2"}},[a("li",[e._v("Delete the vsphere-csi-controller pod.")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl delete pod -n kube-system -l app=vsphere-csi-controller\n")])])]),a("p",[e._v("Deleting the pod causes it to be recreated with the new configuration.")]),e._v(" "),a("h2",{attrs:{id:"deploy-the-nginx-ingress-controller"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deploy-the-nginx-ingress-controller"}},[e._v("#")]),e._v(" Deploy the NGINX Ingress Controller")]),e._v(" "),a("ol",[a("li",[e._v("Deploy NGINX")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("helm install --name ingress-nginx ingress-nginx/ingress-nginx\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[e._v("Watch for the nginx pod to be in a status of Running. For example")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl get pods\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("NAME                                            READY   STATUS    RESTARTS   AGE\npod/ingress-nginx-controller-66dc9984d8-z5x46   1/1     Running   0          116m\npod/kuard-86664f98c9-7kqb5                      1/1     Running   0          74m\npod/kuard-86664f98c9-bx4zz                      1/1     Running   0          74m\npod/kuard-86664f98c9-fs27d                      1/1     Running   0          74m\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[e._v("Note the value of the "),a("code",[e._v("EXTERNAL-IP")]),e._v(" for the nginx controller")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl get services\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("NAME                                         TYPE           CLUSTER-IP       EXTERNAL-IP      PORT(S)                      AGE\nservice/ingress-nginx-controller             LoadBalancer   100.66.153.199   192.168.100.50   80:30575/TCP,443:31235/TCP   116m\nservice/ingress-nginx-controller-admission   ClusterIP      100.70.59.21     <none>           443/TCP                      116m\nservice/kuard                                ClusterIP      100.64.49.203    <none>           80/TCP                       74m\nservice/kubernetes                           ClusterIP      100.64.0.1       <none>           443/TCP                      42h\n")])])]),a("p",[e._v("In the example above the EXTERNAL-IP used in the setup below is 192.168.100.50.")]),e._v(" "),a("h2",{attrs:{id:"setup-and-deploy"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#setup-and-deploy"}},[e._v("#")]),e._v(" Setup and Deploy")]),e._v(" "),a("ol",[a("li",[e._v("Create a namespace for your Entando deployment")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl create namespace entando\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[e._v("Download and unpack the entando-helm-quickstart:")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("curl -sfL https://github.com/entando-k8s/entando-helm-quickstart/archive/v6.3.2.tar.gz | tar xvz\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[a("p",[e._v("Download the Custom Resource Definitions (CRDs) and deploy them\n"),a("EntandoCode",[e._v("kubectl apply -f https://raw.githubusercontent.com/entando/entando-releases/"+e._s(e.$site.themeConfig.entando.fixpack.v632)+"/dist/ge-1-1-6/namespace-scoped-deployment/cluster-resources.yaml")])],1)]),e._v(" "),a("li",[a("p",[e._v("Install namespace scoped resources\n"),a("EntandoCode",[e._v("kubectl apply -n entando -f https://raw.githubusercontent.com/entando/entando-releases/"+e._s(e.$site.themeConfig.entando.fixpack.v632)+"/dist/ge-1-1-6/namespace-scoped-deployment/orig/namespace-resources.yaml")])],1)]),e._v(" "),a("li",[a("p",[e._v("In the entando-helm-quickstart edit this file "),a("code",[e._v("sample-configmaps/entando-operator-config.yaml")])])]),e._v(" "),a("li",[a("p",[e._v("Add these properties to the file (taking note of correct yaml spacing):")])])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('  entando.requires.filesystem.group.override: "true"\n  entando.ingress.class: "nginx"\n')])])]),a("ol",{attrs:{start:"6"}},[a("li",[e._v("Find this property in the file "),a("code",[e._v("entando.default.routing.suffix:")])]),e._v(" "),a("li",[e._v("Change the value to "),a("code",[e._v("<your nginx ip>.nip.io")]),e._v(". For example, "),a("code",[e._v("entando.default.routing.suffix: 35.232.231.65.nip.io")])])]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("Depending on your configuration, network, and intended DNS address an application can also be deployed using a single hostname rather\nthan depending on wildcard DNS resolution.")])]),e._v(" "),a("ol",{attrs:{start:"8"}},[a("li",[e._v("Deploy the operator configuration")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl apply -f sample-configmaps/entando-operator-config.yaml -n entando\n")])])]),a("ol",{attrs:{start:"9"}},[a("li",[e._v("Open the "),a("code",[e._v("values.yaml")]),e._v(" file in the entando-helm-quickstart")]),e._v(" "),a("li",[e._v("Change the dbms from "),a("code",[e._v("embedded")]),e._v(" to "),a("code",[e._v("postgresql")])]),e._v(" "),a("li",[e._v("Deploy your Entando application")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("helm template --name=quickstart ./ | kubectl apply -n entando -f -\n")])])]),a("ol",{attrs:{start:"12"}},[a("li",[e._v("Watch the deployment for completion")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl get pods -n entando --watch\n")])])]),a("p",[e._v("This step is complete when the "),a("code",[e._v("quickstart-composite-app-deployer")]),e._v(" with a status of completed. For example,")]),e._v(" "),a("ol",{attrs:{start:"13"}},[a("li",[e._v("The final deployment will look like this from "),a("code",[e._v("kubectl get pods -n entando")])])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("NAME                                                 READY   STATUS    RESTARTS   AGE\nentando-operator-5cdf787869-t5xrg                    1/1     Running   0          10m\nquickstart-kc-server-deployment-5f9d7897c6-7jnq5     1/1     Running   0          9m20s\nquickstart-eci-k8s-svc-deployment-699b47595d-wxmmb   1/1     Running   0          7m2s\nquickstart-server-deployment-75bb794647-bt6xk        1/1     Running   0          6m10s\nquickstart-ab-deployment-7d78b79c-q7r6z              1/1     Running   0          3m48s\nquickstart-cm-deployment-86bc545b6f-vtg2c            1/1     Running   0          3m30s\n")])])]),a("h2",{attrs:{id:"appendix-a-persistent-volumes-and-storage"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#appendix-a-persistent-volumes-and-storage"}},[e._v("#")]),e._v(" Appendix A - Persistent Volumes and Storage")]),e._v(" "),a("p",[e._v("In addition to using a default storage class as described above some installations define different storage for clustered and non-clustered persistent volumes.\nIn order to scale Entando server pods across multiple nodes a persistent storage with support for "),a("code",[e._v("ReadWriteMany")]),e._v(" is required. You can configure your Entando instance to take advantage of provisioned clustered storage with these properties;")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("entando.k8s.operator.default.clustered.storage.class: <your clustered storage class>\nentando.k8s.operator.default.non.clustered.storage.class: <your non-clustered storage class>\n")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);