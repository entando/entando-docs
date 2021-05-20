---
sidebarDepth: 0
---

# Entando Platform

Entando is a **micro frontend platform for Kubernetes** that helps enterprises innovate faster with parallel development teams that have end-to-end autonomy across the entire stack.

With native support for Javascript app development, a micro frontend and microservices architecture, deployment of apps in containers that can be individually scaled up and down, and automated management of containers with Kubernetes, we simplify the move for enterprises looking to modernize across on-prem and cloud infrastructures.

## Entando Architecture

![entando-architecture](./entando-architecture.png)

The Entando platform includes the following major elements:

- `Entando App Engine`: assemble micro frontends & microservices and compose them on a page.
- `Entando App Builder`: the user interface to build and design applications.
- `Entando Component Generator`: provide advanced data modeling capabilities and automatically generate the corresponding microservices and micro frontends.
- `Entando Component Repository`: a shared, internal repository to encourage code reuse across the enterprise.
- `Entando Identity Management`: token-based authentication across multiple domains and connect service providers with identity providers.
- `Entando WCMS`: a web content management system that supports headless CMS.
- (optional) `Entando Business Automation Bundle`: workflow and task automation including out of the box integration with Red Hat Process Automation Manager (PAM).

## Why Kubernetes?

Instead of you doing the work to ensure your apps and services stay up and running, Kubernetes does the work for you. For each app or service, you can set resource limits, the number of pods you want backing each service, upgrade strategy, and auto-scaling. Kubernetes actively manages your cluster to match your defined resource utilization and ensures your site doesn't go down.

::: tip How Google Runs Containers in Production
Each week, Google deploys over 2 billion containers in production to run all of its services like Gmail, YouTube, and Search. Kubernetes is Google's open source solution to automate the management of containers at scale.
:::

Over 50% of Fortune 500 companies use Kubernetes with product offerings from Amazon Elastic Kubernetes Service (EKS), Google Cloud Platform (GKE), IBM (Red Hat) OpenShift, Microsoft Azure (AKS), and VMWare Pivotal (PKS).
