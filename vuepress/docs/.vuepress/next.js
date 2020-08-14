module.exports = {
    docsSidebar: function(path) {
        return [
            {
                title: 'Overview',
                path: path,
            },
            {
                title: 'Getting Started',
                path: path  + 'getting-started/'
            },
            {
                title: 'Concepts',
                children: [
                    {
                        title: 'Overview',
                        path: path  + 'concepts/'
                    },
                    {
                        title: 'Custom Resources',
                        path: path  + 'concepts/custom-resources.md'
                    },
                    {
                        title: 'PDA Architecture',
                        path: path  + 'concepts/pda-architecture.md'
                    }
                ]
            },{
                title: 'Entando Component Repository',
                children: [
                    path  + 'ecr/ecr-overview.md',
                    path  + 'ecr/ecr-bundle-details.md',
                    path  + 'ecr/ecr-bundle-filters.md',
                    path  + 'ecr/ecr-bundle-presentation-config.md',
                    path  + 'ecr/ecr-bundle-versions-faq.md',
                    path  + 'ecr/ecr-how-microservices-connects-to-apps.md',
                    path  + 'ecr/ecr-uninstall-flow.md',
                    path  + 'ecr/ecr-troubleshooting-guide.md'
                ]
            },
            {
                title: 'Reference',
                children: [
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
                        title: 'Freemarker Core Tags',
                        path: path + 'reference/freemarker-tags/freemarker-core-tags.md'
                    },
                    {
                        title: 'Freemarker CMS Tags',
                        path: path + 'reference/freemarker-tags/freemarker-JACMS-tags.md'
                    },
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
                        title: 'Blueprint',
                        path: path  + 'micro-frontends/generate-micro-frontends-from-a-database-entity/',
                    },
                    {
                        title: 'Authentication',
                        path: path  + 'micro-frontends/authentication.md',
                    },
                ]
            },
            {
                title: 'Microservice Applications',
                children: [
                    {
                        title: 'Generate Microservices and Micro Frontends',
                        path: path  + 'backend-developers/generate-microservices-and-micro-frontends.md',
                    },{
                        title: 'Build and Deploy',
                        path: path  + 'backend-developers/build-and-deploy.md',
                    },{
                        title: 'Run Generated Components Locally',
                        path: path  + 'backend-developers/run-local.md',
                    },
                ]
            },
            {
                title: 'Content Management',
                children: [
                    path  + 'cms/app-builder/hello-world.md',
                    path  + 'cms/content-tutorial.md',
                    path  + 'cms/content-types-tutorial.md',
                    path  + 'cms/list-of-Content-attributes.md',
                    path  + 'cms/content-templates-tutorial.md',
                    path  + 'cms/digital-assets-tutorial.md',
                    path  + 'cms/publish-a-content-tutorial.md'
                ]
            },
            {
                title: 'Entando Component Repository',
                children: [
                    path  + 'ecr/tutorials/create-ecr-bundle-from-git.md',
                    path  + 'ecr/tutorials/ecr-deploy-use-plugin-and-mfe-without-bundle.md',
                    path  + 'ecr/how-to-setup-nexus-on-kubernetes-cluster.md',
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
                        title: 'Process Driven Applications (PDA)',
                        path: path  + 'customize-the-platform/pda-tutorial.md',
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
                        title: 'Installation on Amazon Elastic Kubernetes Service (EKS)',
                        path: path  + 'devops/installation/elastic-kubernetes-service/eks-install.md',
                    },
                    {
                        title: 'Installation on Google Kubernetes Engine (GKE)',
                        path: path  + 'devops/installation/google-cloud-platform/',
                    },
                    {
                        title: 'Local Tips and Tricks',
                        path: path  + 'devops/local-tips-and-tricks.md',
                    },
                ]
            },
        ]
    }
}
