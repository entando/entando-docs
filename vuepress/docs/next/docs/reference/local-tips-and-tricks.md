---
sidebarDepth: 2
redirectFrom: /next/tutorials/devops/local-tips-and-tricks.html
--- 
# Development Tips and Tricks
We've collected a list of tips and tricks for optimizing your local quickstart or [Getting Started](../../docs/getting-started/) development environment. We invite you to ask questions, collaborate with the community, and share your own favorite 
practices over on the [Entando forum](https://forum.entando.org).

## Quickstart Management
Here are a few common questions about the quickstart environment which uses Multipass to launch an Ubuntu VM, install K3s Kubernetes into it, and then deploy Entando.
 
### Multipass
1. **How can I shell into a Multipass VM?** `multipass shell <VM-NAME>`. If you don't provide a VM-NAME, multipass will use the default name `primary` and even launch it for you if it doesn't exist. 
1. **What do I need to do after restarting my laptop?** By default Multipass is installed as a service and will restart automatically. If Multipass isn't running, you'll need to first start the service, and then you can start your VM via `multipass start <VM-NAME>`. Kubernetes will start automatically along with any installed pods, including Entando. It can take a few minutes for all of the pods to start completely but you can use `sudo kubectl -n entando pods --watch` to observe the progress. 
1. **How can I idle or pause my Entando instance?** You can use either `multipass stop <VM-NAME>` or `multipass suspend <VM-NAME>`, if you'd rather preserve the VM state. You can then use `multipass start <VM-NAME>` to start the VM. 
1. **What else can Multipass do?** You can run `multipass help` or refer to the [Multipass docs](https://multipass.run/docs) for more information on Multipass.

### Entando in Kubernetes
1. **How can I install a new copy of Entando into an existing VM?** The quickstart deploys Kubernetes resources into a dedicated namespace, `entando` by default. You can simply delete the namespace, `sudo kubectl delete namespace entando`, if you want to delete all of its resources. You can then re-create the namespace and re-install by applying the Helm template for your environment. Alternatively, you can use `ent quickstart --vm-reuse=true` but you'll need to set other `ent quickstart` options so check the `ent` help.
1. **How can I shell into a running pod or view its logs?** You can use the standard Kubernetes commands, e.g. `sudo kubectl exec -it <POD-NAME> -c <CONTAINER-NAME -- bash` or `sudo kubectl logs <POD-NAME> <CONTAINER-NAME>`
1. **What do I if Entando doesn't start completely?** The most common cause for this is a networking problem. See the [Network issues](#network-issues) section below for details. If all else fails reach out to the Entando team on Slack or in the Forums. 

## Shared Servers
We've recommended using Multipass as a way to quickly spin up an Ubuntu VM to host a local Kubernetes cluster for test purposes. There are many times when a local environment is useful but most teams utilize a shared Kubernetes cluster managed by an operations team and installed either on premise or with a cloud provider for full integration testing, CI/CD, DevOps, etc. 

## Network Issues
A local Entando 6.3 quickstart installation (e.g. what you'll get if you follow the [Getting Started](../../docs/getting-started/) guide) may use a set of local domain names to enable accessing Entando services. Your IP address will vary but may look something like this:
```
quickstart-entando.192.168.99.1.nip.io
quickstart-kc-entando.192.168.99.1.nip.io
quickstart-eci-entando.192.168.99.1.nip.io
```
The base domain configured via the ENTANDO_DEFAULT_ROUTING_SUFFIX (e.g. in your entando.yaml) is based on a fixed IP address and that address is configured during the initial installation. That setting is used to generate ingress routes to map incoming URLs to individual services. In production environments there's generally a dedicated network layer to manage IPs/routing (both on premise and cloud) but those options are often not readily available in a local setup. Here are a couple common issues that can prevent Entando from starting in a local environment:

### `.nip.io isn't allowed`
 - This could be because of firewall settings or corporate security policies. The simplest workaround is to manually edit your /etc/hosts file and map the necessary domains to the IP of your local virtual machine.
```
 192.168.99.1 quickstart-kc-entando.192.168.99.1.nip.io
 192.168.99.1 quickstart-eci-entando.192.168.99.1.nip.io
 192.168.99.1 quickstart-entando.192.168.99.1.nip.io
```
- If you add microservices to your installation, you may need to add additional mappings for the new ingresses.
- See [this section below](#option-2-manually-update-your-hosts-file) for detailed steps on Windows.

### `The IP address changed after the initial install`
- The workaround noted above (e.g. update your /etc/hosts file) can also be used here. Simply update the IP address in the first column to use the current IP of your virtual machine. 
- On Windows this can happen simply because your laptop restarted. See [Windows Hyper-V IP Changes](#hyper-v-ip-changes) below. 

## Windows Development
### Hyper-V IP Changes
**Q:** My Entando installation stops working when I restart Windows. How can I fix this?

**A:** The basic issue is that Windows Hyper-V makes it difficult to set a static IP for a VM. (See this [forum post](https://techcommunity.microsoft.com/t5/windows-insider-program/hyper-v-default-switch-ip-address-range-change-ver-1809-build/m-p/261431) for details.) As discussed [above](#network-issues), Entando's ingress routes rely on an fixed IP address and will break if the IP address changes after initial installation. Here are a few options to solve this issue, short of modifying your router or network switch settings: 

#### Option 1: Single host routing
The simplest way to deal with the peculiarities of Hyper-V IP assignments is to avoid it by using the Windows-specific mshome.net addresses. This allows you to access a VM by using an address like `<VM-NAME>.mshome.net`. If you set up your enviroment using the [Automatic Install](../getting-started/#automatic-install) instructions, then the ent CLI will select the single host option for you and the address will be `entando.mshome.net`. You can accomplish the same thing yourself using the `ent quickstart` script but see its `--help` for the current set of options.

#### Option 2: Manually update your hosts file
The next simplest option to re-enable external access to your cluster is to update your hosts file after each Windows restart.
 
You need two pieces of information for this workaround and you'll need administrator access to do this.

1. Determine the original IP used for your VM. This is included in the `ENTANDO_DEFAULT_ROUTING_SUFFIX` or you can see it included in the ingress names. Run ` kubectl -n entando get ingress` and you should see something like this:
````
NAME                          CLASS    HOSTS                                           
quickstart-kc-ingress         <none>   quickstart-kc-entando.192.168.235.100.nip.io  
quickstart-eci-ingress        <none>   quickstart-eci-entando.192.168.235.100.nip.io  
quickstart-ingress            <none>   quickstart-entando.192.168.235.100.nip.io    
````

2. Determine the current IP using `hostname -I` in the VM or by running `multipass list` from Windows:
```
$ multipass list
Name                    State             IPv4             Image
primary                 Running           172.31.118.12   Ubuntu 18.04 LTS
```

3. As a Windows administrator, edit your hosts file `(C:\Windows\System32\drivers\etc\hosts)` to map any needed URLs from the old IP to the new IP. This will bypass .nip.io lookups.

```
172.31.118.12 quickstart-kc-entando.192.168.235.100.nip.io
172.31.118.12 quickstart-eci-entando.192.168.235.100.nip.io
172.31.118.12 quickstart-entando.192.168.235.100.nip.io
``` 

4. You should now be able to access your Entando URLs via the new IP. If your Entando installation stalled during startup, it should continue starting up as soon as the external address is functional again. 

#### Option 3: Add a Windows route
This option is a little more involved the first time but it means repairing your network settings can be done very easily later. In this case you'll pick a static IP, configure a Windows route to map it to the Hyper-V interface, and claim the IP in the Ubuntu VM via a netplan entry. 

 You'll need to run all of these steps before installing Entando the first time but then just steps #1 and #2 after subsequent Windows restarts. 

1. Determine an IP that is unused on your local network. You can use ping or other tools for this but in the following steps we assume that your selected IP is 192.168.99.1.

2. Determine the interface address to Hyper-V, e.g. 32 below. Use cmd `route print` and look for the Interface entry for Hyper-V:
```
Interface List
 32...00 15 5d 86 45 20 ......Hyper-V Virtual Ethernet Adapter
```

3. Using elevated privileges, add a persistent route to map your IP to the Hyper-V interface: 
``` 
route -p add [YOUR-IP] mask 255.255.255.255 0.0.0.0 IF [HYPER-V-INTERFACE]
route -p add 192.168.99.1 mask 255.255.255.255 0.0.0.0 IF 32
```
4. Verify the route was added by using `route print 192.168.99.1`. This command is useful after restart to check if the route needs to be created again.

5. Next, configure your VM to claim the same address. Shell into the VM using `winpty multipass shell [YOUR-VM-NAME]`. 

6. Change to the root user to make the following steps simpler: `sudo -i`

7. Determine your network adapter via `ip link`, e.g. eth0. You just need the name. It's often second in the list after the loopback adapter.
``` bash
ubuntu@primary:~$ ip link
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DEFAULT group default qlen 1000
    link/ether 00:15:5d:00:1a:0c brd ff:ff:ff:ff:ff:ff
```

8. `cd /etc/netplan`

9. Create a netplan entry starting with 0 so it's loaded first: `vi 0-entando.yaml`  

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

10. Apply the changes via `netplan apply`

11. Verify connectivity via `ping 192.168.99.1` from the VM. You should get a response rather than a timeout.

12. (Optional) Run a python server to verify you can access the VM from the host at `http://192.168.99.1:8000.` It may take a minute or so before the server is ready.
```
python3 -m http.server 8000
```

13. You should now be able to install Entando using the static IP. If your Entando installation stalled during startup and was previously configured using the static IP, it should continue starting up as soon as the external address is functional again. 

#### Option 4: Reinstall Entando
We're including this option because it works and requires no additional configuration. If you plan to regularly work with Entando we recommend developing against a centralized and shared Kubernetes instance rather than running a full stack locally. If you need a cluster locally we recommend using option 1 or 2.

### JHipster
**Q:** How can I run JHipster on Windows? 

**A:** JHipster requires a TTY interface for its menus to function correctly. Here are a few options to satisfy that requirement on Windows:
* Run `jhipster` under cmd or Powershell 
* Using Git Bash, run `winpty jhipster.cmd`
* Use Ubuntu bash via WSL (1 or 2) or within the Multipass VM

### Multipass with VirtualBox
Multipass supports the use of VirtualBox on Windows as an alternative to using Hyper-V, say if you're using Windows Home. See the Multipass documentation on how to configure it to work with VirtualBox. 

In order to get Entando working correctly with this setup you will need to add a port forwarding rule so you can access Entando from your host system. 
* Create your VM within Multipass.

* Go to the Oracle VM VirtualBox Manager and edit the `Network` settings for the VM. 
* Go to the `Advanced` options and click `Port Forwarding Rules`
* Add a new rule. 
  * `Name`: your choice
  * `Protocol`: TCP
  * `Host IP`: leave this blank
  * `Host Port`: 80
  * `Guest IP`: leave this blank
  * `Guest Port`: 80
  * Click OK
* At this point any requests to port 80 on your localhost should be forwarded to the VM.
* You can now identify the IP of your host and use that to configure the `ENTANDO_DEFAULT_ROUTING_SUFFIX` in your yaml file, e.g. `192.168.64.25.nip.io`. You should not use the non-routable address (e.g. 10.0.2.15) identified from within the guest VM itself, but rather use the IP of the host.
