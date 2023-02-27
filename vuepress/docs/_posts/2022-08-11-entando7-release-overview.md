---
author: Sohini Pattanayak
date: 2022-08-11
summary: The 7.1 release is finally out! And here&#39;s what you need to know about the new features and updates!
tags:
- product & support
title: Entando 7.1 Release Overview
---

Entando Application Composition Platform Version 7.1 is now available to support enterprises who are modernizing applications to accelerate development, reduce runtime costs, and streamline maintenance through the use of a composable application architecture. Entando brings developer joy to the creation, curation, and composition of modular enterprise applications.

<img src="./images/2022-08-11-acp-process.png" width="720" height="372.6">

<strong>Background:&nbsp;</strong>

Even before the 21st century, enterprises have been advancing infrastructure and strategies to solve business problems.&nbsp; From the development of web applications on-prem, to their subsequent move to the cloud, and now, modularization in the cloud, each move has accelerated development, lowered cost and streamlined maintenance.

This new phase of modularity focused on decoupling (or breaking up) both the backend code and the monolithic frontend by bundling microservices and micro frontends into <a href="#!U;https://youtu.be/RkGBpLQ-070!#">Packaged Business Capabilities (PBCs)</a>. These PBCs could be shared across development teams and projects within an <strong>Enterprise Hub</strong> and assembled into applications via a low-code <strong>Application Builder</strong>, all within a unified <strong>Application Composition Platform</strong>. 

The updates available in Entando Application Composition Platform v7.1 are focused on the pro-code creators. It provides many new capabilities to support the development of modern composable applications, which include:

<em><strong>New:&nbsp; Entando Platform Capability (EPC)</strong></em>

To accelerate application development, Entando 7.1 now supports a pluggable framework to allow Creators and Composers to easily expand the functionality of the Entando App Builder, add external services. Like the PBC, an EPC is a packaged capability and it adds functionality to the platform like menu options or an API management page. An EPC can be a headless CMS like Strapi, that is bundled, stored on Entando Cloud Hub, and implemented in the App Builder.

A sample configuration is shown below:

<img src="./images/2022-08-11-acp-capabilities.png" width="720" height="259.3">

<p>The headless system (e.g., Strapi) uses the Entando App Builder as a templating mechanism to create and manage pages, content layout, and content versioning.&nbsp;</p>

<p>1) An EPC can be deployed to the Entando Hub (or Entando Cloud Hub, the publically accessible version of the hub),&nbsp;</p>

<p>2) Composers can access and install EPCsinto the Entando App Builder, adding a new menu item to the builder, which&nbsp;</p>

<p>3) when accessed, opens the headless interface, where content can be managed and you can return to the App Builder at any time.</p>

<p>4) Users can access the external system&rsquo;s APIs and resources, deploying them into applications using the page designer. Many types of EPCs can be built for Entando 7.1, including Headless CMS (Strapi.io is coming soon),&nbsp; Workflow, AI/ML, API Mgmt, and more.&nbsp;&nbsp;</p>

<p><em><strong>New: Pro-code bundle Templates</strong></em></p>

<p>v7.1 introduces Pro-code Bundle Templates to&nbsp;enable developers, system integrators, and enterprises to create new Packaged Business Capabilities by reusing existing micro frontends and microservices allowing consistency and acceleration from a core PBC library.</p>

<img src="./images/2022-08-11-publishing.png" width="720" height="239.8">

<p><em><strong>New: Service Discovery</strong></em></p>

<p>With v7.1, communication between micro frontends and microservices is decoupled and service discovery is made simpler with the API claims mechanism orchestrated by the ent CLI. It eliminates the need to define and manage API endpoints, both in local development and within a running instance.</p>

<p><em><strong>Updated: Create Tooling</strong></em></p>

<p>&nbsp;v7.1 mainly focuses on developers. The local development process was improved and now developers can easily initialize a bundle from scratch or download one from a hub. They can add components and populate the bundle descriptor with micro frontends, microservices, and platform components with the ent CLI. They can run,build, and install with only a few commands. Bundles that have worked on 7.0 will work on 7.1 as well. More details can be found here: <a href="#!U;https://developer.entando.com/v7.1/docs/getting-started/ent-bundle.html#entando-7-1-bundle-development!#">https://developer.entando.com/v7.1/docs/getting-started/ent-bundle.html#entando-7-1-bundle-development</a></p>

<p><em><strong>Updated: Docker Image Specification</strong></em></p>

<p>Previously, developers used Git repositories to manage both code sources and bundle versioning. Now bundle packaging and publishing has moved to Docker which handle the image specifications. With this, one can still manage code sources on their preferred Git provider but each release will be done through an image registry.&nbsp;&nbsp;</p>

<p><em><strong>Updated: Entando Command Line Interface (CLI)&nbsp;</strong></em></p>

<p>We have enhanced the <strong>Entando CLI</strong> for Mac and Windows. The CLI can now create new bundles from templates downloaded from the Hub, providing a wider range of commands to perform various actions. Some examples:</p>

<ul>
	<li>Create a Docker Image of the Bundle</li>
	<li>Docker-based bundle management commands</li>
	<li>Easily Publish a bundle inside Docker Hub</li>
	<li>API management</li>
</ul>

<p><em><strong>Updated: Entando Hub</strong></em><br />
<br />
The Entando Hub was introduced in v7.0 and provides a repository for PBCs, solution templates, components, and/or component collections. Enterprises, Development Teams, System Integrators and others can implement an Entando Hub as a central repository from which the Entando App Builder can discover and quickly access entries. Entando Hub updates include:&nbsp;</p>

<ul>
	<li>Docker bundle name generation update</li>
	<li>Added security check on bundleGroupVersion details page</li>
	<li>Update install instructions to use ent ecr deploy</li>
	<li>Refined AppBuilder BundleGroups retrieval to sort if no pageSize provided.</li>
</ul>

<p><em><strong>Summary</strong></em></p>

<p>To learn more about Entando 7.1, or to get started with Composable Applications, see:</p>

<ul>
	<li>A complete look at the 7.1 <a href="#!U;https://developer.entando.com/next/docs/releases/#summary!#">release notes</a></li>
	<li>Docs - &nbsp;<a href="#!U;https://developer.entando.com/v7.1/docs/!#">https://developer.entando.com/v7.1/docs/</a></li>
	<li>Tutorials - <a href="#!U;https://developer.entando.com/v7.1/docs/!#">https://developer.entando.com/v7.1/docs/</a></li>
	<li>Base install guide (manual, not the one liner until official launch): <a href="#!U;https://developer.entando.com/v7.1/docs/getting-started/#install-kubernetes!#">https://developer.entando.com/v7.1/docs/getting-started/#install-kubernetes</a></li>
	<li>Platform install guides: <a href="#!U;https://developer.entando.com/v7.1/tutorials/#operations!#">https://developer.entando.com/v7.1/tutorials/#operations</a></li>
	<li>Watch a video with industry experts
	<ul>
		<li><a href="#!U;https://www.youtube.com/watch?v=fWbLQDZBEio!#">With Massimo Pezzini, formerly VP Distinguished Analyst with Gartner</a></li>
		<li><a href="#!U;https://www.youtube.com/watch?v=_pAILlnkLck!#">With Luca Mezzalira, Serverless Solutions Specialists at Amazon Web Services</a></li>
		<li><a href="#!U;https://www.youtube.com/watch?v=Lo5rfCNLCvo!#">With James Governor Red Monk Analyst and Co-founder</a></li>
	</ul>
	</li>
	<li><a href="#!U;https://discover.entando.com/en-us/what-is-an-application-composition-platform!#">Download the &ldquo;What is an Application Composition Platform&quot; whitepaper</a></li>
	<li><a href="#!U;https://entando.com/page/en/demo!#">Book a guided demo</a></li>
</ul>

</span><br><a href="#">Back to top</a></span></p>