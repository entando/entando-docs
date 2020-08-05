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

Download custom resource definitions

``` bash
curl -L -C - https://raw.githubusercontent.com/entando/entando-releases/v6.2.0/dist/qs/custom-resources.tar.gz | tar -xz
```

Create custom resources

``` bash
sudo kubectl create -f dist/crd
```

Create namespace

``` bash
sudo kubectl create namespace entando
```

Download Helm chart (or [generate your own](https://github.com/entando-k8s/entando-helm-quickstart))

``` bash
curl -L -C - -O https://dev.entando.org/assets/v6.2/yaml/entando.yaml
```

Configure external access to your cluster with your VM IP

``` bash
IP=$(hostname -I | awk '{print $1}')
```

``` bash
sed -i "s/192.168.64.25/$IP/" entando.yaml
```

Deploy Entando

``` bash
sudo kubectl create -f entando.yaml
```

Check for quickstart-composite-app-deployer `Completed`

``` bash
sudo kubectl get pods -n entando --watch
```

Get URL to access Entando App Builder from your browser

``` bash
sudo kubectl get ingress -n entando -o jsonpath=\
'{.items[2].spec.rules[*].host}{.items[2].spec.rules[*].http.paths[2].path}{"\n"}'
```
