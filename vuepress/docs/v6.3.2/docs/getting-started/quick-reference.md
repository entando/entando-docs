## Quick Reference

Just the steps, for advanced users.

---

Install [Multipass](https://multipass.run/#install)

Launch VM

``` bash
multipass launch --name ubuntu-lts --cpus 4 --mem 8G --disk 20G
```

Open Ubuntu shell

``` bash
multipass shell ubuntu-lts
```

Install k3s

``` bash
curl -sfL https://get.k3s.io | sh -
```

Check for node ready

``` bash
sudo kubectl get node
```

Deploy custom resource definitions

``` bash
sudo kubectl apply -n entando -f https://raw.githubusercontent.com/entando/entando-releases/v6.3.2/dist/ge-1-1-6/namespace-scoped-deployment/cluster-resources.yaml
```

Deploy namespace scoped assets

``` bash
sudo kubectl apply -n entando -f https://raw.githubusercontent.com/entando/entando-releases/v6.3.2/dist/ge-1-1-6/namespace-scoped-deployment/orig/namespace-resources.yaml
```

Create namespace

``` bash
sudo kubectl create namespace entando
```

Download Helm chart (or [generate your own](https://github.com/entando-k8s/entando-helm-quickstart))

``` bash
curl -sfL https://github.com/entando-k8s/entando-helm-quickstart/archive/v6.3.2.tar.gz | tar xvz
```

Configure external access to your cluster with your VM IP

``` bash
hostname -I | awk '{print $1}'
```

Edit the file in `sample-configmaps/entando-operator-config.yaml` and uncomment the value for `entando.default.routing.suffix:` and set the value to the IP address of your Ubuntu VM plus `.nip.io`. For example, `entando.default.routing.suffix: 192.168.64.21.nip.io`. Pay attention to yaml spacing

Deploy Entando

``` bash
sudo kubectl apply -f sample-configmaps/entando-operator-config.yaml -n entando
```

``` bash
sudo helm template quickstart ./ | sudo kubectl apply -n entando -f -
```

Check for `quickstart-composite-app-deployer` with a status of completed using the command below

``` bash
sudo kubectl get pods -n entando --watch
```

Get URL to access Entando App Builder from your browser

``` bash
sudo kubectl get ingress -n entando -o jsonpath='{.items[2].spec.rules[*].host}{.items[2].spec.rules[*].http.paths[1].path}{"\n"}'
```
