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
sudo curl -sfL https://get.k3s.io | sh -
```

Check for node ready

``` bash
sudo kubectl get node
```

Download custom resource definitions

``` bash
wget -c https://es-entando.github.io/custom-resources.tar.gz -O - | tar -xz
```

Create custom resources

``` bash
sudo kubectl create -f custom-resources
```

Create namespace

``` bash
sudo kubectl create namespace entando
```

Download Helm Chart

``` bash
wget https://docs.entando.com/assets/yaml/entando.yaml
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
