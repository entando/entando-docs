(window.webpackJsonp=window.webpackJsonp||[]).push([[539],{1729:function(t,e,s){"use strict";s.r(e);var a=s(36),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"development-tips-and-tricks"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#development-tips-and-tricks"}},[t._v("#")]),t._v(" Development Tips and Tricks")]),t._v(" "),s("p",[t._v("We've collected a list of tips and tricks to optimize your local quickstart or "),s("RouterLink",{attrs:{to:"/v6.3.2/docs/getting-started/"}},[t._v("Getting Started")]),t._v(" development environment. We invite you to ask questions, collaborate with the community, and share your own favorite\npractices over on the "),s("a",{attrs:{href:"https://forum.entando.com",target:"_blank",rel:"noopener noreferrer"}},[t._v("Entando forum"),s("OutboundLink")],1),t._v(".")],1),t._v(" "),s("h2",{attrs:{id:"quickstart-management"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#quickstart-management"}},[t._v("#")]),t._v(" Quickstart Management")]),t._v(" "),s("p",[t._v("Here are a few common questions about the quickstart environment. The quickstart environment uses Multipass to launch an Ubuntu VM, where K3s Kubernetes is then installed and from which Entando is deployed.")]),t._v(" "),s("h3",{attrs:{id:"general"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#general"}},[t._v("#")]),t._v(" General")]),t._v(" "),s("p",[s("strong",[t._v("Q: How can I remove a quickstart environment?")])]),t._v(" "),s("p",[s("strong",[t._v("A:")]),t._v(" If you want to completely remove the VM created by Multipass, you can use "),s("code",[t._v("multipass delete <VM-NAME>")]),t._v(" (where the default VM-NAME for a quickstart is "),s("code",[t._v("entando")]),t._v(") and then "),s("code",[t._v("multipass purge")]),t._v(" to recover the resources. If you just want to shutdown Entando but keep the VM, you can use "),s("code",[t._v("multipass shell <VM-NAME>")]),t._v(" to shell into the VM and then remove the namespace via "),s("code",[t._v("sudo kubectl delete namespace entando")]),t._v(".")]),t._v(" "),s("p",[s("strong",[t._v("Q: What if the installation fails due to timeout?")])]),t._v(" "),s("p",[s("strong",[t._v("A:")]),t._v(" A Docker Hub policy limiting download bandwidth may cause the quickstart installation to fail with timeout errors. The workaround is a two step process:")]),t._v(" "),s("ol",[s("li",[t._v("Delete the "),s("code",[t._v("entando")]),t._v(" namespace")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("ent k delete namespace entando\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[t._v("Run the following\n"),s("EntandoCode",[t._v(' ent quickstart "entando" "quickstart" --simple --debug=1 --yes --with-vm --release='+t._s(t.$site.themeConfig.entando.fixpack.v632))])],1)]),t._v(" "),s("p",[t._v("The namespace will be recreated, preserving the images already pulled, so it's unlikely the installation time will exceed the timeout threshold again.")]),t._v(" "),s("h3",{attrs:{id:"multipass"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#multipass"}},[t._v("#")]),t._v(" Multipass")]),t._v(" "),s("p",[s("strong",[t._v("Q: How can I shell into a Multipass VM?")])]),t._v(" "),s("p",[s("strong",[t._v("A:")]),t._v(" "),s("code",[t._v("multipass shell <VM-NAME>")]),t._v(". If you don't provide a VM-NAME, Multipass will use the default name "),s("code",[t._v("primary")]),t._v(", and even launch it for you if it doesn't exist.")]),t._v(" "),s("p",[s("strong",[t._v("Q: What do I need to do after restarting my laptop?")])]),t._v(" "),s("p",[s("strong",[t._v("A:")]),t._v(" By default, Multipass is installed as a service and will restart automatically. If Multipass isn't running, you'll need to first initialize this service; then you can start your VM via "),s("code",[t._v("multipass start <VM-NAME>")]),t._v(". Kubernetes will launch automatically along with any installed pods, including Entando. It can take a few minutes for all of the pods to fully initialize, but you can use "),s("code",[t._v("sudo kubectl -n entando get pods --watch")]),t._v(" to observe the progress.")]),t._v(" "),s("p",[s("strong",[t._v("Q: How can I pause or idle my Entando instance?")])]),t._v(" "),s("p",[s("strong",[t._v("A:")]),t._v(" You can pause with "),s("code",[t._v("multipass stop <VM-NAME>")]),t._v(", or idle with "),s("code",[t._v("multipass suspend <VM-NAME>")]),t._v(" to preserve the VM state. You can then use "),s("code",[t._v("multipass start <VM-NAME>")]),t._v(" to start the VM.")]),t._v(" "),s("p",[s("strong",[t._v("Q: What else can Multipass do?")])]),t._v(" "),s("p",[s("strong",[t._v("A:")]),t._v(" You can run "),s("code",[t._v("multipass help")]),t._v(" or refer to the "),s("a",{attrs:{href:"https://multipass.run/docs",target:"_blank",rel:"noopener noreferrer"}},[t._v("Multipass docs"),s("OutboundLink")],1),t._v(" for more information on Multipass.")]),t._v(" "),s("h3",{attrs:{id:"entando-in-kubernetes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#entando-in-kubernetes"}},[t._v("#")]),t._v(" Entando in Kubernetes")]),t._v(" "),s("p",[s("strong",[t._v("Q: How can I install a new copy of Entando into an existing VM?")])]),t._v(" "),s("p",[s("strong",[t._v("A:")]),t._v(" By default, the quickstart installation deploys Kubernetes resources into a dedicated namespace called "),s("code",[t._v("entando")]),t._v(". If you want to remove all of the resources in "),s("code",[t._v("entando")]),t._v(", you can simply delete the namespace with "),s("code",[t._v("sudo kubectl delete namespace entando")]),t._v(". You can then re-create the namespace and re-install the resources by applying the Helm template for your environment. Alternatively, you can achieve this with "),s("code",[t._v("ent quickstart --vm-reuse=true")]),t._v(", but you'll need to set other "),s("code",[t._v("ent quickstart")]),t._v(" options, so check the "),s("code",[t._v("ent")]),t._v(" help.")]),t._v(" "),s("p",[s("strong",[t._v("Q: How can I shell into a running pod or view its logs?")])]),t._v(" "),s("p",[s("strong",[t._v("A:")]),t._v(" You can use the standard Kubernetes commands, e.g. "),s("code",[t._v("sudo kubectl exec -it <POD-NAME> -c <CONTAINER-NAME -- bash")]),t._v(" or "),s("code",[t._v("sudo kubectl logs <POD-NAME> <CONTAINER-NAME>")]),t._v(".")]),t._v(" "),s("p",[s("strong",[t._v("Q: What do I do if Entando doesn't fully initialize?")])]),t._v(" "),s("p",[s("strong",[t._v("A:")]),t._v(" The most common cause of this is a networking problem. See the "),s("a",{attrs:{href:"#network-issues"}},[t._v("Network issues")]),t._v(" section below for details. If all else fails, reach out to the Entando team on Slack or in the Forums.")]),t._v(" "),s("h2",{attrs:{id:"shared-servers"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#shared-servers"}},[t._v("#")]),t._v(" Shared Servers")]),t._v(" "),s("p",[t._v("We recommend using Multipass to quickly spin up an Ubuntu VM to host a local Kubernetes cluster for test purposes. A local environment is often useful, but most teams utilize a shared Kubernetes cluster. This shared cluster is managed by an operations team, and installed either on premise or with a cloud provider for full integration testing, CI/CD, DevOps, etc.")]),t._v(" "),s("h2",{attrs:{id:"network-issues"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#network-issues"}},[t._v("#")]),t._v(" Network Issues")]),t._v(" "),s("p",[t._v("A local Entando 6.3 quickstart installation (e.g. what you'll get if you follow the "),s("RouterLink",{attrs:{to:"/v6.3.2/docs/getting-started/"}},[t._v("Getting Started")]),t._v(" guide) may use a set of local domain names to enable access to Entando services. Your IP address will vary, but may look something like this:")],1),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("quickstart-entando.192.168.99.1.nip.io\nquickstart-kc-entando.192.168.99.1.nip.io\nquickstart-eci-entando.192.168.99.1.nip.io\n")])])]),s("p",[t._v("The base domain configured via the ENTANDO_DEFAULT_ROUTING_SUFFIX (e.g. in your entando.yaml) borrows a fixed IP address that is created during the initial installation. This domain is used to generate ingress routes to map incoming URLs to individual services. In production environments there's generally a dedicated network layer to manage IPs/routing (both on premise and in the cloud), but this is not readily available in most local setups. Below are a couple of common issues that can prevent Entando from initializing in a local environment:")]),t._v(" "),s("h3",{attrs:{id:"nip-io-isn-t-allowed"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nip-io-isn-t-allowed"}},[t._v("#")]),t._v(" "),s("code",[t._v(".nip.io isn't allowed")])]),t._v(" "),s("ul",[s("li",[t._v("This could be due to firewall settings or corporate security policies. The simplest workaround is to manually edit your /etc/hosts file and map the necessary domains to the IP of your local virtual machine.")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v(" 192.168.99.1 quickstart-kc-entando.192.168.99.1.nip.io\n 192.168.99.1 quickstart-eci-entando.192.168.99.1.nip.io\n 192.168.99.1 quickstart-entando.192.168.99.1.nip.io\n")])])]),s("ul",[s("li",[t._v("If you add microservices to your installation, you may need to add additional mappings for the new ingresses.")]),t._v(" "),s("li",[t._v("See "),s("a",{attrs:{href:"#option-2-manually-update-your-hosts-file"}},[t._v("this section below")]),t._v(" for detailed steps to perform this on Windows.")])]),t._v(" "),s("h3",{attrs:{id:"the-ip-address-changed-after-the-initial-install"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#the-ip-address-changed-after-the-initial-install"}},[t._v("#")]),t._v(" "),s("code",[t._v("The IP address changed after the initial install")])]),t._v(" "),s("ul",[s("li",[t._v("Restarting a Windows computer can cause this (see "),s("a",{attrs:{href:"#hyper-v-ip-changes"}},[t._v("Windows Hyper-V IP Changes")]),t._v(" below), and the workaround noted above (e.g. update your /etc/hosts file) also applies. Simply update the IP address in the first column to use the current IP of your virtual machine.")])]),t._v(" "),s("h2",{attrs:{id:"windows-development"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#windows-development"}},[t._v("#")]),t._v(" Windows Development")]),t._v(" "),s("h3",{attrs:{id:"multipass-loses-control-of-vms"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#multipass-loses-control-of-vms"}},[t._v("#")]),t._v(" Multipass loses control of VMs")]),t._v(" "),s("p",[s("strong",[t._v("Q: What do I do if Multipass cannot access my VMs?")])]),t._v(" "),s("p",[s("strong",[t._v("A:")]),t._v(" The most common symptoms include an "),s("code",[t._v("IP=UNKNOWN")]),t._v(" entry when issuing a "),s("code",[t._v("multipass list")]),t._v(", and when attempts to stop or shell into the VM consistently fail.")]),t._v(" "),s("p",[t._v("Internet Connection Sharing (ICS) is a Windows service that provides Internet connectivity to virtual machines, and its "),s("code",[t._v("hosts.ics")]),t._v(" file can occasionally get corrupted. Restarting the host laptop or desktop should remedy this, but a quicker and simpler fix is to shutdown any VMs using the hypervisor (Hyper-V or VirtualBox), remove the "),s("code",[t._v("hosts.ics")]),t._v(" file from "),s("code",[t._v("Windows/System32/drivers/etc")]),t._v(" using elevated privileges, and then restart the VM(s). You can examine the "),s("code",[t._v("hosts.ics")]),t._v(" file first to check if it is well-formed, with clean IP to VM-NAME mappings insteaad of spurious numbers or letters.")]),t._v(" "),s("h3",{attrs:{id:"hyper-v-ip-changes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#hyper-v-ip-changes"}},[t._v("#")]),t._v(" Hyper-V IP changes")]),t._v(" "),s("p",[s("strong",[t._v("Q: My Entando installation stops working when I restart Windows. How can I fix this?")])]),t._v(" "),s("p",[s("strong",[t._v("A:")]),t._v(" The basic issue is that Windows Hyper-V makes it difficult to set a static IP for a VM (see this "),s("a",{attrs:{href:"https://techcommunity.microsoft.com/t5/windows-insider-program/hyper-v-default-switch-ip-address-range-change-ver-1809-build/m-p/261431",target:"_blank",rel:"noopener noreferrer"}},[t._v("forum post"),s("OutboundLink")],1),t._v(" for details). As discussed "),s("a",{attrs:{href:"#network-issues"}},[t._v("above")]),t._v(", Entando's ingress routes rely on a fixed IP address and will break if the IP address changes after initial installation. Here are a few options to solve this issue, short of modifying your router or network switch settings:")]),t._v(" "),s("h4",{attrs:{id:"option-1-single-host-routing"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#option-1-single-host-routing"}},[t._v("#")]),t._v(" Option 1: Single host routing")]),t._v(" "),s("p",[t._v("The simplest way to deal with the peculiarities of Hyper-V IP assignment is to avoid it, instead using Windows-specific mshome.net addresses. This allows you to access a VM with an address like "),s("code",[t._v("<VM-NAME>.mshome.net")]),t._v(". If you set up your enviroment using the "),s("RouterLink",{attrs:{to:"/v6.3.2/docs/getting-started/#automatic-install"}},[t._v("Automatic Install")]),t._v(" instructions, then the ent CLI will select the single host option and the address will be "),s("code",[t._v("entando.mshome.net")]),t._v(". You can accomplish the same thing yourself using the "),s("code",[t._v("ent quickstart")]),t._v(" script, but see its "),s("code",[t._v("--help")]),t._v(" for the current set of options.")],1),t._v(" "),s("h4",{attrs:{id:"option-2-manually-update-your-hosts-file"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#option-2-manually-update-your-hosts-file"}},[t._v("#")]),t._v(" Option 2: Manually update your hosts file")]),t._v(" "),s("p",[t._v("The next simplest option to re-enable external access to your cluster is to update your hosts file after each Windows restart.")]),t._v(" "),s("p",[t._v("You need two pieces of information for this workaround, and you'll also need administrator access.")]),t._v(" "),s("ol",[s("li",[t._v("Determine the original IP used for your VM. This is included in the "),s("code",[t._v("ENTANDO_DEFAULT_ROUTING_SUFFIX")]),t._v(", or you can find it included in the ingress names. Run "),s("code",[t._v(" kubectl -n entando get ingress")]),t._v(" to see something like this:")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("NAME                          CLASS    HOSTS                                           \nquickstart-kc-ingress         <none>   quickstart-kc-entando.192.168.235.100.nip.io  \nquickstart-eci-ingress        <none>   quickstart-eci-entando.192.168.235.100.nip.io  \nquickstart-ingress            <none>   quickstart-entando.192.168.235.100.nip.io    \n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[t._v("Determine the current IP using "),s("code",[t._v("hostname -I")]),t._v(" in the VM, or by running "),s("code",[t._v("multipass list")]),t._v(" from Windows:")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("$ multipass list\nName                    State             IPv4             Image\nprimary                 Running           172.31.118.12   Ubuntu 18.04 LTS\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[t._v("As a Windows administrator, edit your hosts file "),s("code",[t._v("(C:\\Windows\\System32\\drivers\\etc\\hosts)")]),t._v(" to map any required URLs from the old IP to the new IP. This will bypass .nip.io lookups.")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("172.31.118.12 quickstart-kc-entando.192.168.235.100.nip.io\n172.31.118.12 quickstart-eci-entando.192.168.235.100.nip.io\n172.31.118.12 quickstart-entando.192.168.235.100.nip.io\n")])])]),s("ol",{attrs:{start:"4"}},[s("li",[t._v("You should now be able to access your Entando URLs via the new IP. If your Entando installation stalled during startup, it should continue initializing as soon as the external address is functional again.")])]),t._v(" "),s("h4",{attrs:{id:"option-3-add-a-windows-route"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#option-3-add-a-windows-route"}},[t._v("#")]),t._v(" Option 3: Add a Windows route")]),t._v(" "),s("p",[t._v("This option is initially a little more involved, but future repairs to your network settings can then be made very easily. You'll need to choose a static IP, configure a Windows route to map it to the Hyper-V interface, and claim the IP in the Ubuntu VM via a netplan entry.")]),t._v(" "),s("p",[t._v("When implementing this option for the first time, all steps must be executed before installing Entando. Subsequent Windows restarts require steps #1 and #2, only.")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("Determine an IP that is unused on your local network (e.g. via ping). The following steps assume that IP 192.168.99.1 is selected.")])]),t._v(" "),s("li",[s("p",[t._v("Determine the interface address to Hyper-V (e.g. 32 below). Use cmd "),s("code",[t._v("route print")]),t._v(" and find the Interface entry for Hyper-V:")])])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("Interface List\n 32...00 15 5d 86 45 20 ......Hyper-V Virtual Ethernet Adapter\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[t._v("Using elevated privileges, add a persistent route to map your IP to the Hyper-V interface:")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("route -p add [YOUR-IP] mask 255.255.255.255 0.0.0.0 IF [HYPER-V-INTERFACE]\nroute -p add 192.168.99.1 mask 255.255.255.255 0.0.0.0 IF 32\n")])])]),s("ol",{attrs:{start:"4"}},[s("li",[s("p",[t._v("Verify the route was added via "),s("code",[t._v("route print 192.168.99.1")]),t._v(". This command is useful after restart to check if the route needs to be created again.")])]),t._v(" "),s("li",[s("p",[t._v("Configure your VM to claim the same address. Shell into the VM using "),s("code",[t._v("winpty multipass shell [YOUR-VM-NAME]")]),t._v(".")])]),t._v(" "),s("li",[s("p",[t._v("Change to the root user to make the following steps simpler: "),s("code",[t._v("sudo -i")])])]),t._v(" "),s("li",[s("p",[t._v("Determine your network adapter name via "),s("code",[t._v("ip link")]),t._v(", e.g. eth0. It's often second in the list after the loopback adapter.")])])]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("ubuntu@primary:~$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ip")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("link")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(": lo: "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("LOOPBACK,UP,LOWER_UP"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" mtu "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("65536")]),t._v(" qdisc noqueue state UNKNOWN mode DEFAULT group default qlen "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),t._v("\n    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(": eth0: "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("BROADCAST,MULTICAST,UP,LOWER_UP"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" mtu "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1500")]),t._v(" qdisc mq state UP mode DEFAULT group default qlen "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),t._v("\n    link/ether 00:15:5d:00:1a:0c brd ff:ff:ff:ff:ff:ff\n")])])]),s("ol",{attrs:{start:"8"}},[s("li",[s("p",[t._v("Navigate to your netplan directory: "),s("code",[t._v("cd /etc/netplan")])])]),t._v(" "),s("li",[s("p",[t._v("Create a netplan entry starting with 0 (so it's indexed and loaded first): "),s("code",[t._v("vi 0-entando.yaml")])])])]),t._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("network")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("version")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("renderer")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" networkd\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ethernets")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("YOUR"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("NETWORK"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("ADAPTER"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("dhcp4")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" no\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("addresses")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" \n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("YOUR"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("IP"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("/24\n")])])]),s("p",[t._v("Example:")]),t._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("network")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("version")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("renderer")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" networkd\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ethernets")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("eth0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("dhcp4")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" no\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("addresses")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" \n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" 192.168.99.1/24\n")])])]),s("ol",{attrs:{start:"10"}},[s("li",[s("p",[t._v("Apply the changes with "),s("code",[t._v("netplan apply")])])]),t._v(" "),s("li",[s("p",[t._v("From the VM, verify connectivity via "),s("code",[t._v("ping 192.168.99.1")]),t._v(". You should receive a response and not a timeout.")])]),t._v(" "),s("li",[s("p",[t._v("(Optional) Run a Python server to verify you can access the VM from the host at "),s("code",[t._v("http://192.168.99.1:8000.")]),t._v(" It may take a minute or so before the server is ready.")])])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("python3 -m http.server 8000\n")])])]),s("ol",{attrs:{start:"13"}},[s("li",[t._v("You should now be able to install Entando using the static IP. If your Entando installation stalled during startup, and was previously configured with a static IP, it should continue initializing as soon as the external address is functional again.")])]),t._v(" "),s("h4",{attrs:{id:"option-4-reinstall-entando"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#option-4-reinstall-entando"}},[t._v("#")]),t._v(" Option 4: Reinstall Entando")]),t._v(" "),s("p",[t._v("We're including this option because it works and requires no additional configuration. If you plan to regularly work with Entando we recommend developing against a centralized and shared Kubernetes instance rather than running a full stack locally. If you require a local cluster we recommend using option 1 or 2.")]),t._v(" "),s("h3",{attrs:{id:"jhipster"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#jhipster"}},[t._v("#")]),t._v(" JHipster")]),t._v(" "),s("p",[s("strong",[t._v("Q: How can I run JHipster on Windows?")])]),t._v(" "),s("p",[s("strong",[t._v("A:")]),t._v(" JHipster requires a TTY interface for its menus to function correctly. Here are a few options to satisfy that requirement on Windows:")]),t._v(" "),s("ul",[s("li",[t._v("Run "),s("code",[t._v("jhipster")]),t._v(" under cmd or Powershell")]),t._v(" "),s("li",[t._v("Using Git Bash, run "),s("code",[t._v("winpty jhipster.cmd")])]),t._v(" "),s("li",[t._v("Use Ubuntu bash via WSL (1 or 2), or within the Multipass VM")])]),t._v(" "),s("h3",{attrs:{id:"multipass-with-virtualbox"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#multipass-with-virtualbox"}},[t._v("#")]),t._v(" Multipass with VirtualBox")]),t._v(" "),s("p",[s("strong",[t._v("Q: How do I run Multipass with VirtualBox?")])]),t._v(" "),s("p",[s("strong",[t._v("A:")]),t._v(" Multipass supports the use of VirtualBox on Windows as an alternative to Hyper-V. Refer to the Multipass documentation for VirtualBox configuration instructions.")]),t._v(" "),s("p",[t._v("For Entando to work correctly with VirtualBox you will need to add a port forwarding rule to access Entando from your host system.")]),t._v(" "),s("ul",[s("li",[t._v("Create your VM within Multipass")]),t._v(" "),s("li",[t._v("Go to the Oracle VM VirtualBox Manager to edit the "),s("code",[t._v("Network")]),t._v(" settings for the VM")]),t._v(" "),s("li",[t._v("Go to the "),s("code",[t._v("Advanced")]),t._v(" options and click "),s("code",[t._v("Port Forwarding Rules")])]),t._v(" "),s("li",[t._v("Add a new rule\n"),s("ul",[s("li",[s("code",[t._v("Name")]),t._v(": your choice")]),t._v(" "),s("li",[s("code",[t._v("Protocol")]),t._v(": TCP")]),t._v(" "),s("li",[s("code",[t._v("Host IP")]),t._v(": leave this blank")]),t._v(" "),s("li",[s("code",[t._v("Host Port")]),t._v(": 80")]),t._v(" "),s("li",[s("code",[t._v("Guest IP")]),t._v(": leave this blank")]),t._v(" "),s("li",[s("code",[t._v("Guest Port")]),t._v(": 80")]),t._v(" "),s("li",[t._v("Click OK")])])]),t._v(" "),s("li",[t._v("Any requests to port 80 on your localhost should be forwarded to the VM.")]),t._v(" "),s("li",[t._v("Use the IP of your host to configure the "),s("code",[t._v("ENTANDO_DEFAULT_ROUTING_SUFFIX")]),t._v(" in your YAML file, e.g. "),s("code",[t._v("192.168.64.25.nip.io")]),t._v(". You must use the host ID and not the non-routable address identified from within the guest VM, e.g. 10.0.2.15.")])])])}),[],!1,null,null,null);e.default=n.exports}}]);