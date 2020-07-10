# Local Development Tips and Tricks
Here you'll find a list of tips and tricks for local development environments. Please feel free to 
provide your own or to discuss others on the [forum](https://forum.entando.org). 

## JHipster
**Q:** How can I run JHipster on Windows? 

**A:** 1) Run it under cmd or Powershell, 2) Using Git Bash, run `winpty jhipster.cmd`, 3) Use Ubuntu bash via WSL (1 or 2) or VM in Multipass

## Kubernetes
Per [Getting Started](../../docs/getting-started/) we've recommended using Multipass as
a quick way to spin up an Ubuntu VM and host a local Kubernetes cluster. Practically speaking most
teams utilize a shared Kubernetes cluster, managed by an operations team and installed either on premise
or your cloud provider of choice, for full integration testing, CI/CD, DevOps, etc. but there are many times
when a local environment is useful. 

## Windows development
### Hyper-V IP changes
**Q:** By design, Windows Hyper-V changes the IP address assigned to a VM (Multipass or other) when Windows 
is restarted. How do I deal with this?

**A:** The basic issue is that Windows Hyper-V makes it difficult to set
a static IP for a VM. See this [forum post](https://techcommunity.microsoft.com/t5/windows-insider-program/hyper-v-default-switch-ip-address-range-change-ver-1809-build/m-p/261431) for details. 
 
Locally the problem is that the ENTANDO_DEFAULT_ROUTING_SUFFIX (in your entando.yaml or similar) is based on the 
VM IP address. That setting is used to generate ingress routes so it's not a simple fix to
rewire those settings once Entando is installed. In production settings there's generally a dedicated network layer to manage IPs/routing 
(both on premise and cloud) but those options are generally not readily available in a local setup. Here are a 
few options short of modifying your router/switch settings: 

#### Option 1: Reinstall Entando
Okay, this is a terrible option since you already installed it once and don't want to do it again every 
time Windows surprises you with an update. Nevertheless, it works so it's worth mentioning.

#### Option 2: Manually update your hosts file
This is the simplest option but a bit annoying to do after every restart. 
You need two pieces of information for this workaround and you'll need administrator access to do this.

1. Determine the original IP used for your VM. This is included in the `ENTANDO_DEFAULT_ROUTING_SUFFIX` or you can 
see it included in the ingress names. Run ` kubectl -n entando get ingress` and you should see something 
like this:
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

3. As a Windows administrator, edit your hosts file (`C:\Windows\System32\drivers\etc\hosts`) to map any needed URLs from 
the old IP to the new IP. This will bypass .nip.io lookups.

```
172.31.118.12 quickstart-entando.192.168.235.100.nip.io
172.31.118.12 quickstart-kc-entando.192.168.235.100.nip.io
172.31.118.12 quickstart-eci-entando.192.168.235.100.nip.io
``` 

4. You should now be able to access your Entando URLs via the new IP. If Entando was stalled starting up, it should
continue starting up as soon as the external address is functional again. 

#### Option 3: Add a Windows route.
This is a little more involved but it means repairing your network settings can be done with a single command
after the initial setup per VM. (Exercise for the reader, if you build a bat/cmd script to automate this repair, please
share with the class!)

These steps are based on [this blog](https://tekbloq.com/2018/10/24/how-to-add-a-static-route-to-the-windows-routing-table/) 
combined with a netplan entry in Ubuntu to claim a static IP at the VM level. You'll need to run all of these steps before
installing Entando the first time but then just steps #1 and #2 after subsequent Windows restarts. 

1. Determine the interface address to Hyper-V, e.g. 32 below. Use cmd `route print` and look for the Interface entry for Hyper-V
```
Interface List
 32...00 15 5d 86 45 20 ......Hyper-V Virtual Ethernet Adapter
```

2. Using elevated privileges, add a persistent route to map an unclaimed IP (it's up to you to determine an IP unused on 
your local network but ping is useful). We use -p to indicate a persistent route but since Hyper-V's interface can also change
after restart it's not very persistent. 
``` 
route -p add [YOUR-PREFERRED-IP] mask 255.255.255.255 0.0.0.0 IF [HYPER-V-INTERFACE]
route -p add 192.168.99.1 mask 255.255.255.255 0.0.0.0 IF 32
```
3. Verify your setting took by using `route print 192*`. This is useful after restart to see if the route needs
to be added again.

4. Next, configure your VM to claim the same address. Shell into the VM using `winpty multipass shell [YOUR-VM-NAME]`. 

5. Change to the root user to make the following steps simpler: `sudo -i`

6. Determine your network adaptor via `ip link`, e.g. eth0. You just need the name and it's often second in the list, after the loopback adapter.
``` bash
ubuntu@primary:~$ ip link
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DEFAULT group default qlen 1000
    link/ether 00:15:5d:00:1a:0c brd ff:ff:ff:ff:ff:ff
```

7. `cd /etc/netplan`

8. Create a netplan entry starting with 0 so it's loaded first: `vi 0-entando.yaml`  

``` yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    [YOUR-NETWORK-ADAPTOR]:
      dhcp4: no
      addresses: 
        - [YOUR-PREFERRED-IP]/24
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

9. Apply the changes via `netplan apply`

10. Verify connectivity via `ping 192.168.99.1` from the VM. You should get a response rather than a timeout.

11. (Optional) Run a python server to verify you can access the VM from the host at `http://192.168.99.1:8000.` 
It may take a minute or so before the server is ready. If you can access it you can use this IP 
address to configure your Entando installation.

12. You should now be able to install Entando using the preferred IP. If Entando was stalled 
starting up (and already configured this way), it should continue starting up as soon as the 
external address is functional again. 

#### Option 4: Use a non-IP based domain name for your cluster.
This has been discussed but isn't available in Entando 6.2.  
    