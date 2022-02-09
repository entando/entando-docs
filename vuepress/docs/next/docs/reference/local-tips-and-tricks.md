---
sidebarDepth: 2
--- 
# Development Tips and Tricks
We've collected a list of tips and tricks to optimize your local quickstart or [Getting Started](../../docs/getting-started/) development environment. We invite you to ask questions, collaborate with the community, and share your own favorite 
practices over on the [Entando forum](https://forum.entando.org).

## Quickstart Management
Here are a few common questions about the quickstart environment. The quickstart environment uses Multipass to launch an Ubuntu VM, where K3s Kubernetes is then installed and from which Entando is deployed.

### General
**Q: How can I remove a quickstart environment?** 

**A:** If you want to completely remove the VM created by Multipass, you can use `multipass delete <VM-NAME>` (where the default VM-NAME for a quickstart is `entando`) and then `multipass purge` to recover the resources. If you just want to shutdown Entando but keep the VM, you can use `multipass shell <VM-NAME>` to shell into the VM and then remove the namespace via `sudo kubectl delete namespace entando`. 

**Q: What if the installation fails due to timeout?**

**A:** A Docker Hub policy limiting download bandwidth may cause the quickstart installation to fail with timeout errors. The workaround is a two step process:

1. Delete the `entando` namespace
```
ent k delete namespace entando
```

2. Run the following
```
ent quickstart "entando" "quickstart" --simple --debug=1 --yes --with-vm --release=v6.3.2
```
 
The namespace will be recreated, preserving the images already pulled, so it's unlikely the installation time will exceed the timeout threshold again.

### Multipass
**Q: How can I shell into a Multipass VM?** 

**A:** `multipass shell <VM-NAME>`. If you don't provide a VM-NAME, Multipass will use the default name `primary`, and even launch it for you if it doesn't exist. 

**Q: What do I need to do after restarting my laptop?** 

**A:** By default, Multipass is installed as a service and will restart automatically. If Multipass isn't running, you'll need to first initialize this service; then you can start your VM via `multipass start <VM-NAME>`. Kubernetes will launch automatically along with any installed pods, including Entando. It can take a few minutes for all of the pods to fully initialize, but you can use `sudo kubectl -n entando get pods --watch` to observe the progress. 

**Q: How can I pause or idle my Entando instance?** 

**A:** You can pause with `multipass stop <VM-NAME>`, or idle with `multipass suspend <VM-NAME>` to preserve the VM state. You can then use `multipass start <VM-NAME>` to start the VM. 

**Q: What else can Multipass do?** 

**A:** You can run `multipass help` or refer to the [Multipass docs](https://multipass.run/docs) for more information on Multipass.

### Entando in Kubernetes
**Q: How can I install a new copy of Entando into an existing VM?** 

**A:** By default, the quickstart installation deploys Kubernetes resources into a dedicated namespace called `entando`. If you want to remove all of the resources in `entando`, you can simply delete the namespace with `sudo kubectl delete namespace entando`. You can then re-create the namespace and re-install the resources by applying the Helm template for your environment. Alternatively, you can achieve this with `ent quickstart --vm-reuse=true`, but you'll need to set other `ent quickstart` options, so check the `ent` help.

**Q: How can I shell into a running pod or view its logs?** 

**A:** You can use the standard Kubernetes commands, e.g. `sudo kubectl exec -it <POD-NAME> -c <CONTAINER-NAME -- bash` or `sudo kubectl logs <POD-NAME> <CONTAINER-NAME>`.

**Q: What do I do if Entando doesn't fully initialize?** 

**A:** The most common cause of this is a networking problem. See the [Network issues](#network-issues) section below for details. If all else fails, reach out to the Entando team on Slack or in the Forums. 

## Shared Servers
We recommend using Multipass to quickly spin up an Ubuntu VM to host a local Kubernetes cluster for test purposes. A local environment is often useful, but most teams utilize a shared Kubernetes cluster. This shared cluster is managed by an operations team, and installed either on premise or with a cloud provider for full integration testing, CI/CD, DevOps, etc. 

## Network Issues
A local Entando 7 quickstart installation (e.g. what you'll get if you follow the [Getting Started](../../docs/getting-started/) guide) may use a set of local domain names to enable access to Entando services. Your IP address will vary, but may look something like this:
```
quickstart-entando.192.168.99.1.nip.io
quickstart-kc-entando.192.168.99.1.nip.io
quickstart-eci-entando.192.168.99.1.nip.io
```
The base domain configured via the ENTANDO_DEFAULT_ROUTING_SUFFIX (e.g. in your entando.yaml) borrows a fixed IP address that is created during the initial installation. This domain is used to generate ingress routes to map incoming URLs to individual services. In production environments there's generally a dedicated network layer to manage IPs/routing (both on premise and in the cloud), but this is not readily available in most local setups. Below are a couple of common issues that can prevent Entando from initializing in a local environment:

### `.nip.io isn't allowed`
 - This could be due to firewall settings or corporate security policies. The simplest workaround is to manually edit your /etc/hosts file and map the necessary domains to the IP of your local virtual machine.
```
 192.168.99.1 quickstart-kc-entando.192.168.99.1.nip.io
 192.168.99.1 quickstart-eci-entando.192.168.99.1.nip.io
 192.168.99.1 quickstart-entando.192.168.99.1.nip.io
```
- If you add microservices to your installation, you may need to add additional mappings for the new ingresses.
- See [this section below](#option-2-manually-update-your-hosts-file) for detailed steps to perform this on Windows.

### `The IP address changed after the initial install`
- Restarting a Windows computer can cause this (see [Windows Hyper-V IP Changes](#hyper-v-ip-changes) below), and the workaround noted above (e.g. update your /etc/hosts file) also applies. Simply update the IP address in the first column to use the current IP of your virtual machine. 

## Customizing NGINX

In some situations the default NGINX ingress configuration doesn't work well for Entando. For instance, JWT tokens can be too large, proxy-buffer-size can be too small, etc. A 502 Bad Gateway error can indicate that this config needs to be modified.

To configure the NGINX controller globally (for the entire cluster), we need to edit the default NGINX's ConfigMap, which is ingress-nginx-controller in the ingress-nginx namespace. Add the following inside the data parameter:

```
apiVersion: v1
data:
  allow-snippet-annotations: "true"
  proxy-buffer-size: 24k
kind: ConfigMap
```

Refer to the NGINX sections in each of the cloud install guides (EKS, AKS, GKE) for more information:

* [Amazon Elastic Kubernetes Service (EKS)](../../tutorials/getting-started/eks-install.md#appendix-a-troubleshooting)
* [Azure Kubernetes Service (AKS)](../../tutorials/getting-started/azure-install.md#deploy-nginx-ingress-controller)
* [Google Kubernetes Engine (GKE)](../../tutorials/getting-started/gke-install.md#cluster-setup)

## Windows Development
### Multipass loses control of VMs
**Q: What do I do if Multipass cannot access my VMs?**

**A:** The most common symptoms include an `IP=UNKNOWN` entry when issuing a `multipass list`, and when attempts to stop or shell into the VM consistently fail. 

Internet Connection Sharing (ICS) is a Windows service that provides Internet connectivity to virtual machines, and its `hosts.ics` file can occasionally get corrupted. Restarting the host laptop or desktop should remedy this, but a quicker and simpler fix is to shutdown any VMs using the hypervisor (Hyper-V or VirtualBox), remove the `hosts.ics` file from `Windows/System32/drivers/etc` using elevated privileges, and then restart the VM(s). You can examine the `hosts.ics` file first to check if it is well-formed, with clean IP to VM-NAME mappings insteaad of spurious numbers or letters.

### Hyper-V IP changes
**Q: My Entando installation stops working when I restart Windows. How can I fix this?**

**A:** The basic issue is that Windows Hyper-V makes it difficult to set a static IP for a VM (see this [forum post](https://techcommunity.microsoft.com/t5/windows-insider-program/hyper-v-default-switch-ip-address-range-change-ver-1809-build/m-p/261431) for details). As discussed [above](#network-issues), Entando's ingress routes rely on a fixed IP address and will break if the IP address changes after initial installation. Here are a few options to solve this issue, short of modifying your router or network switch settings: 

#### Option 1: Single host routing
The simplest way to deal with the peculiarities of Hyper-V IP assignment is to avoid it, instead using Windows-specific mshome.net addresses. This allows you to access a VM with an address like `<VM-NAME>.mshome.net`. If you set up your enviroment using the [Automatic Install](../getting-started/#automatic-install) instructions, then the ent CLI will select the single host option and the address will be `entando.mshome.net`. You can accomplish the same thing yourself using the `ent quickstart` script, but see its `--help` for the current set of options.

#### Option 2: Manually update your hosts file
The next simplest option to re-enable external access to your cluster is to update your hosts file after each Windows restart.
 
You need two pieces of information for this workaround, and you'll also need administrator access.

1. Determine the original IP used for your VM. This is included in the `ENTANDO_DEFAULT_ROUTING_SUFFIX`, or you can find it included in the ingress names. Run ` kubectl -n entando get ingress` to see something like this:
````
NAME                          CLASS    HOSTS                                           
quickstart-kc-ingress         <none>   quickstart-kc-entando.192.168.235.100.nip.io  
quickstart-eci-ingress        <none>   quickstart-eci-entando.192.168.235.100.nip.io  
quickstart-ingress            <none>   quickstart-entando.192.168.235.100.nip.io    
````

2. Determine the current IP using `hostname -I` in the VM, or by running `multipass list` from Windows:
```
$ multipass list
Name                    State             IPv4             Image
primary                 Running           172.31.118.12   Ubuntu 18.04 LTS
```

3. As a Windows administrator, edit your hosts file `(C:\Windows\System32\drivers\etc\hosts)` to map any required URLs from the old IP to the new IP. This will bypass .nip.io lookups.

```
172.31.118.12 quickstart-kc-entando.192.168.235.100.nip.io
172.31.118.12 quickstart-eci-entando.192.168.235.100.nip.io
172.31.118.12 quickstart-entando.192.168.235.100.nip.io
``` 

4. You should now be able to access your Entando URLs via the new IP. If your Entando installation stalled during startup, it should continue initializing as soon as the external address is functional again. 

#### Option 3: Add a Windows route
This option is initially a little more involved, but future repairs to your network settings can then be made very easily. You'll need to choose a static IP, configure a Windows route to map it to the Hyper-V interface, and claim the IP in the Ubuntu VM via a netplan entry. 

 When implementing this option for the first time, all steps must be executed before installing Entando. Subsequent Windows restarts require steps #1 and #2, only. 

1. Determine an IP that is unused on your local network (e.g. via ping). The following steps assume that IP 192.168.99.1 is selected.

2. Determine the interface address to Hyper-V (e.g. 32 below). Use cmd `route print` and find the Interface entry for Hyper-V:
```
Interface List
 32...00 15 5d 86 45 20 ......Hyper-V Virtual Ethernet Adapter
```

3. Using elevated privileges, add a persistent route to map your IP to the Hyper-V interface: 
``` 
route -p add [YOUR-IP] mask 255.255.255.255 0.0.0.0 IF [HYPER-V-INTERFACE]
route -p add 192.168.99.1 mask 255.255.255.255 0.0.0.0 IF 32
```
4. Verify the route was added via `route print 192.168.99.1`. This command is useful after restart to check if the route needs to be created again.

5. Configure your VM to claim the same address. Shell into the VM using `winpty multipass shell [YOUR-VM-NAME]`. 

6. Change to the root user to make the following steps simpler: `sudo -i`

7. Determine your network adapter name via `ip link`, e.g. eth0. It's often second in the list after the loopback adapter.
``` bash
ubuntu@primary:~$ ip link
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DEFAULT group default qlen 1000
    link/ether 00:15:5d:00:1a:0c brd ff:ff:ff:ff:ff:ff
```

8. Navigate to your netplan directory: `cd /etc/netplan`

9. Create a netplan entry starting with 0 (so it's indexed and loaded first): `vi 0-entando.yaml`  

``` yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    [YOUR-NETWORK-ADAPTER]:
      dhcp4: no
      addresses: 
        - [YOUR-IP]/24
```
Example:

``` yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      dhcp4: no
      addresses: 
        - 192.168.99.1/24
```

10. Apply the changes with `netplan apply`

11. From the VM, verify connectivity via `ping 192.168.99.1`. You should receive a response and not a timeout.

12. (Optional) Run a Python server to verify you can access the VM from the host at `http://192.168.99.1:8000.` It may take a minute or so before the server is ready.
```
python3 -m http.server 8000
```

13. You should now be able to install Entando using the static IP. If your Entando installation stalled during startup, and was previously configured with a static IP, it should continue initializing as soon as the external address is functional again. 

#### Option 4: Reinstall Entando
We're including this option because it works and requires no additional configuration. If you plan to regularly work with Entando we recommend developing against a centralized and shared Kubernetes instance rather than running a full stack locally. If you require a local cluster we recommend using option 1 or 2.

### JHipster
**Q: How can I run JHipster on Windows?** 

**A:** JHipster requires a TTY interface for its menus to function correctly. Here are a few options to satisfy that requirement on Windows:
* Run `jhipster` under cmd or Powershell 
* Using Git Bash, run `winpty jhipster.cmd`
* Use Ubuntu bash via WSL (1 or 2), or within the Multipass VM

### Multipass with VirtualBox
**Q: How do I run Multipass with VirtualBox?**

**A:** Multipass supports the use of VirtualBox on Windows as an alternative to Hyper-V. Refer to the Multipass documentation for VirtualBox configuration instructions. 

For Entando to work correctly with VirtualBox you will need to add a port forwarding rule to access Entando from your host system. 
* Create your VM within Multipass
* Go to the Oracle VM VirtualBox Manager to edit the `Network` settings for the VM
* Go to the `Advanced` options and click `Port Forwarding Rules`
* Add a new rule
  * `Name`: your choice
  * `Protocol`: TCP
  * `Host IP`: leave this blank
  * `Host Port`: 80
  * `Guest IP`: leave this blank
  * `Guest Port`: 80
  * Click OK
* Any requests to port 80 on your localhost should be forwarded to the VM.
* Use the IP of your host to configure the `ENTANDO_DEFAULT_ROUTING_SUFFIX` in your YAML file, e.g. `192.168.64.25.nip.io`. You must use the host ID and not the non-routable address identified from within the guest VM, e.g. 10.0.2.15.
