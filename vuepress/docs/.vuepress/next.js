module.exports = {
    docsSidebar: function(path) {
        return [
            {
                title: 'Introduction',
                path: path,
            },
            {
                title: 'Getting Started',
                children: [
                    {
                        title: 'Overview',
                        path: path  + 'getting-started/',
                    },
                    {
                        title: 'Welcome Wizard',
                        path: path + 'getting-started/welcome-wizard.md'
                    },
                ]
            },
            {
                title: 'Concepts',
                children: [
                    {
                        title: 'Overview',
                        path: path + 'concepts/'
                    },
                    {
                        title: 'Entando Operator',
                        path: path + 'concepts/operator-intro.md'
                    },
                    {
                        title: 'Custom Resources',
                        path: path + 'concepts/custom-resources.md'
                    },
                    {
                        title: 'Accessibility',
                        path: path + 'concepts/accessibility.md'
                    },
                    {
                        title: 'PDA Architecture',
                        path: path + 'concepts/pda-architecture.md'
                    }
                ]
            },
            {
                title: 'Entando Component Generator',
                children: [
                    path  + 'component-generator/component-gen-overview.md',
                    path  + 'component-generator/blueprint-features.md',
                    path  + 'component-generator/component-gen-tech.md',
                    path  + 'component-generator/component-gen-customize.md',

                ]
            },
            {
                title: 'Entando Component Repository',
                children: [
                    path  + 'ecr/ecr-overview.md',
                    path  + 'ecr/ecr-bundle-details.md',
                    path  + 'ecr/ecr-bundle-filters.md',
                    path  + 'ecr/ecr-bundle-presentation-config.md',
                    path  + 'ecr/ecr-bundle-versions-faq.md',
                    path  + 'ecr/ecr-how-microservices-connect-to-apps.md',
                    path  + 'ecr/ecr-uninstall-flow.md',
                    path  + 'ecr/ecr-troubleshooting-guide.md'
                ]
            },
            {
                title: 'Reference',
                children: [
                    {
                        title: 'Entando CLI',
                        path: path + 'reference/entando-cli.md'
                    },
                    {
                        title: 'Entando APIs',
                        path: path + 'reference/entando-apis.md'
                    },
                    {
                        title: 'Deployment Structure',
                        path: path  + 'reference/deployment-structure.md'
                    },
                    {
                        title: 'Cluster Resource Limits',
                        path: path + 'reference/cluster-resource-limits.md'
                    },
                    {
                        title: 'Databases',
                        path: path + 'reference/databases.md'
                    },
                    {
                        title: 'Identity Management',
                        path: path + 'reference/identity-management.md'
                    },
                    {
                        title: 'Caching and Clustering',
                        path: path + 'reference/caching-and-clustering.md'
                    },
                    {
                        title: 'Freemarker Core Tags',
                        path: path + 'reference/freemarker-tags/freemarker-core-tags.md'
                    },
                    {
                        title: 'Freemarker CMS Tags',
                        path: path + 'reference/freemarker-tags/freemarker-JACMS-tags.md'
                    },
                    {
                        title: 'Development Tips and Tricks',
                        path: path  + 'reference/local-tips-and-tricks.md',
                    }
                ]
            },
            {
                title: 'Community',
                children: [
                    {
                        title: 'Contributing',
                        path: path + 'community/contributing.md'
                    },
                    {
                        title: 'Code of Conduct',
                        path: path + 'community/code-of-conduct.md'
                    },
                ]
            },
            {
                title: 'Release Notes',
                path: path  + 'releases/'
            },
        ]
    },

    tutorialsSidebar: function(path) {
        return [
            {
                title: 'Overview',
                path: path,
            },
            {
                title: 'Micro Frontends',
                path: path + 'micro-frontends',
                children: [
                    {
                        title: 'React',
                        path: path  + 'micro-frontends/react.md',
                    },
                    {
                        title: 'Angular',
                        path: path  + 'micro-frontends/angular.md',
                    },
                    {
                        title: 'Communication',
                        path: path  + 'micro-frontends/communication.md',
                    },
                    {
                        title: 'Config',
                        path: path  + 'micro-frontends/widget-configuration.md',
                    },
                    {
                        title: 'Authentication',
                        path: path  + 'micro-frontends/authentication.md',
                    },
                ]
            },
            {
                title: 'Microservices',
                children: [
                    {
                        title: 'Generate Microservices and Micro Frontends',
                        path: path  + 'backend-developers/generate-microservices-and-micro-frontends.md',
                    },
                    {
                        title: 'Run Generated Components Locally',
                        path: path  + 'backend-developers/run-local.md',
                    },
                    {
                        title: 'Update Project Data Model',
                        path: path  + 'backend-developers/update-data-model.md',
                    },
                    {
                        title: 'Add Access Controls',
                        path: path + 'backend-developers/add-access-controls.md'
                    },
                    {
                        title: 'Use Postman with OAuth2 APIs',
                        path: path + 'backend-developers/use-postman-with-oauth2.md'
                    }
                ]
            },
            {
                title: 'Pages and Content',
                children: [
                    path  + 'cms/page-management.md',
                    path  + 'cms/app-builder/hello-world.md',
                    path  + 'cms/content-tutorial.md',
                    path  + 'cms/content-types-tutorial.md',
                    path  + 'cms/content-attributes.md',
                    path  + 'cms/content-templates-tutorial.md',
                    path  + 'cms/digital-assets-tutorial.md',
                    path  + 'cms/creating-protected-resources.md'
                ]
            },
            {
                title: 'Bundles',
                children: [
                    path  + 'ecr/publish-simple-bundle.md',
                    path  + 'ecr/publish-project-bundle.md',
                    path  + 'ecr/export-bundle-from-application.md',
                    path  + 'ecr/github-actions-workflow.md',
                    path  + 'ecr/deploy-components-without-bundle.md',
                    path  + 'ecr/ecr-private-git-repo.md',
                    path  + 'ecr/ecr-private-images.md',

                ]
            },
            {
                title: 'Extend the Platform',
                children: [
                    {
                        title: 'Extend App Builder',
                        path: path  + 'customize-the-platform/extend-app-builder.md',
                    },
                    {
                        title: 'Add REST API',
                        path: path  + 'customize-the-platform/add-rest-api.md',
                    },
                    {
                        title: 'Change Default Datasource',
                        path: path  + 'customize-the-platform/change-default-datasources-and-connections/',
                    },
                ]
            },
            {
                title: 'Configuration and Operations',
                children: [
                    {
                        title: 'Default Database',
                        path: path + 'devops/default-database.md',
                    },
                    {
                        title: 'External Database',
                        path: path  + 'devops/external-database/',
                    },
                    {
                        title: 'External Identity Management System',
                        path: path  + 'devops/external-keycloak/',
                    },
                    {
                        title: 'Entando Docker Image',
                        path: path  + 'devops/build-core-image.md',
                    },
                    {
                        title: 'Backing Up and Restoring Your Environment',
                        path: path  + 'devops/backing-up-and-restoring-your-environment.md',
                    },
                    {
                        title: 'Caching and Clustering',
                        path: path  + 'devops/clustering-caching/caching-and-clustering.md',
                    },
                    {
                        title: 'Installation on Red Hat OpenShift',
                        path: path  + 'devops/installation/open-shift/openshift-install.md',
                    },
                    {
                        title: 'Installation on Red Hat OpenShift using the OperatorHub',
                        path: path  + 'devops/installation/open-shift/openshift-install-by-operator-hub.md',
                    },
                    {
                        title: 'Installation on Amazon Elastic Kubernetes Service (EKS)',
                        path: path  + 'devops/installation/elastic-kubernetes-service/eks-install.md',
                    },
                    {
                        title: 'Installation on Azure Kubernetes Service (AKS)',
                        path: path  + 'devops/installation/azure-kubernetes-service/azure-install.md',
                    },
                    {
                        title: 'Installation on Google Kubernetes Engine (GKE)',
                        path: path  + 'devops/installation/google-cloud-platform/gke-install.md',
                    },
                    {
                        title: 'Installation on Tanzu Kubernetes Grid (TKG)',
                        path: path  + 'devops/installation/tanzu/tanzu-install.md',
                    },
                    {
                        title: 'Installation on Kubernetes',
                        path: path  + 'devops/installation/kubernetes/kubernetes-install.md',
                    },
                ]
            },
            {
                title: 'Solution Templates',
                children: [
                    {
                        title: 'Standard Banking Demo',
                        path: path + 'samples/install-standard-demo.md',
                    },
                    {
                        title: 'Customer Portal',
                        path: path + 'samples/customer-portal.md',
                    },
                    {
                        title: 'Entando Hub',
                        path: path + 'samples/entando-hub.md',
                    },
                    {
                        title: 'Process Driven Applications (PDA)',
                        path: path  + 'samples/pda-tutorial.md',
                    }
                ]
            },
        ]
    }
}
