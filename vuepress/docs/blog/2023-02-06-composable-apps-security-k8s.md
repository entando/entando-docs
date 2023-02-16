---
sidebarDepth: 2
title: Composable Apps Security
tags: kubernetes
location: France
author: Anthony Viard
date: 2023-02-06 00:00:01
type: blog
blog: true
excerpt: Hello
---


Building composable apps means, without a doubt, understanding how it manages security and reliability. Composable apps offer a lot of advantages to streamline applications, provided by the modularity and reusability of Packaged Business Capabilities. Individual modules and PBCs help isolate problems and security design, separate frontend and backend concerns and allow patching at the component level. At the company level, and with a good hub policy, it turns into “patch once, secure all” because you can easily leverage security fixes if they are applied to centralized modules in a store that all your applications rely on.

** insert image here**

However, security strategies should not be applied at the code or module level only. The infrastructure has to be fully resilient and secure. No one can imagine using a car with seat belts within an insecure chassis. It doesn't make sense. Security is everyone’s business.

Fortunately, solutions exist to help us design at all levels with security as one of the top priorities.

"Shift security left". It is more than a buzzword, It is good advice according to Lucas Ward in a recent article called [Hardening Kubernetes and What That Entails With Entando](https://blog.ippon.tech/hardening-kubernetes-and-what-that-entails-with-entando/)<span style="text-decoration:underline;">.</span> There, Ward describes how building applications with Kubernetes is challenging.

I agree, building a fully secured application with Kubernetes is a real adventure. If there is something we can't live without, it is security. Whatever business domain we work in, security should be at the center of the design and production processes.

Delaying its implementation is risky; executing it is time consuming.

As Ward spells out, we can rely on frameworks to bring a smooth and dependable way to secure applications, especially with Kubernetes. He says that using a platform such as Entando provides simplicity and a solid base with best practices you can count on to promote security from the ground up.



<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image1.png "image_tooltip")


From solid structures and base setup with code generation to a well documented CI/CD process, and opinionated build pipelines, Ward asserts that "using Entando as your platform of choice covers a lot of ground in the Development, Build, and Infrastructure scape."

Saying more without spoiling it is just impossible, just read it! This is my only advice.