module.exports = {
    docsSidebar: function(version) {
        path = version + 'docs/';
        return [
            {
                title: 'Introduction',
                children: [
                    {
                        title: 'Overview',
                        path: path,
                    },
                    {
                        title: 'Getting Started',
                        path: path + 'getting-started/',
                    },
                    {
                        title: 'Solution Templates',
                        path: path + 'getting-started/landing-page.md',
                    },
                    {
                        title: 'Entando Architecture',
                        path: path + 'getting-started/concepts-overview.md',
                    },
                    {
                        title: 'Entando CLI',
                        children: [
                            {
                                title: 'Basics',
                            path: path + 'getting-started/entando-cli.md',
                            },
                            {
                                title: 'Bundle Management',
                            path: path + 'getting-started/ent-bundle.md',
                            },
                            {
                                title: 'API Management',
                            path: path + 'getting-started/ent-api.md',
                            },
                            {
                                title: 'Services Management',
                            path: path + 'getting-started/ent-svc.md',
                            },
                            {
                                title: 'Profile Management',
                            path: path + 'getting-started/ent-profile.md',
                            },
                            {
                                title: 'Diagnostics and Troubleshooting',
                            path: path + 'getting-started/ent-diag.md',
                            }
                        ]
                        
                    }

                ]
            },
            {
                title: 'Create Components',
                children: [
                    {
                        title: 'Entando Component Generator',
                        path: path + 'create/component-gen-overview.md',
                    },
                    {
                        title: 'Entando Blueprint Features',
                        path: path + 'create/blueprint-features.md',
                    },
                    {
                        title: 'Component Generation Technologies',
                        path: path + 'create/component-gen-tech.md',
                    },
                    {
                        title: 'Customizing The Component Generator',
                        path: path + 'create/component-gen-customize.md',
                    },
                    {
                        title: 'How Microservices connect to Entando Apps',
                        path: path  + 'create/how-microservices-connect-to-apps.md'
                    },
                ]
            },
            {
                title: 'Curate and Share Components',
                children: [    
                    {
                        title: 'Bundle Details',
                        path: path  + 'curate/bundle-details.md'
                    },
                    {
                        title: 'Bundle Component Descriptors',
                        path: path  + 'curate/bundle-component-details.md'
                    },
                    {
                        title: 'Filtering Bundles',
                        path: path  + 'curate/bundle-filters.md'
                    },
                    {
                        title: 'Customize Bundle Info in App Builder',
                        path: path  + 'curate/bundle-presentation-config.md'
                    },
                    {
                        title: 'Bundle Version and Updates - FAQ',
                        path: path  + 'curate/bundle-versions-faq.md'
                    },
                    {
                        title: 'Bundle Upgrade, Downgrade, Uninstall',
                        path: path  + 'curate/uninstall-flow.md'
                    },
                    {
                        title: 'Troubleshooting ECR',
                        path: path  + 'curate/troubleshooting-guide.md'
                    }
                ]
            },
            {
                title: 'Compose an Application',
                children: [
                    {
                        title: 'Welcome Wizard',
                        path: path + 'compose/welcome-wizard.md'
                    },
                    {
                        title: 'Entando App Builder',
                        path: path + 'compose/app-builder.md'
                    },
                    {
                        title: 'Local Hub',
                        path: path  + 'compose/local-hub-overview.md'
                    },
                    {
                        title: 'Entando Component Manager',
                        path: path  + 'compose/ecm-overview.md'
                    },
                ]
            },
            {
                title: 'Consume an Application',
                children: [
                    {
                        title: 'Accessibility',
                        path: path + 'consume/accessibility.md'
                    },
                    {
                        title: 'Caching and Clustering',
                        path: path + 'consume/caching-and-clustering.md'
                    },
                    {
                        title: 'Cluster Resource Limits',
                        path: path + 'consume/cluster-resource-limits.md'
                    },
                    {
                        title: 'Entando APIs',
                        path: path + 'consume/entando-apis.md'
                    },
                    {
                        title: 'Entando Identity Management System',
                        path: path + 'consume/identity-management.md'
                    },
                    {
                        title: 'Entando Operator',
                        path: path + 'consume/operator-intro.md'
                    },
                ]
            },
            {
                title: 'Reference',
                children: [
                    {
                        title: 'Entando Glossary',
                        path: path  + 'reference/glossary.md'
                    },
                    {
                        title: 'Deployment Structure',
                        path: path  + 'reference/deployment-structure.md'
                    },
                    {
                        title: 'Check Ingresses',
                        path: path  + 'reference/check-ingress.md'
                    },
                    {
                        title: 'Custom Resources',
                        path: path + 'reference/custom-resources.md'
                    },
                    {
                        title: 'Databases',
                        path: path + 'reference/databases.md'
                    },
                    {
                        title: 'Bundle Upgrade',
                        path: path + 'reference/bundle-upgrade.md'
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
                        path: path  + 'reference/local-tips-and-tricks.md'
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
                    }
                ]
            },
            {
                title: 'Release Notes',
                children: [
                    path + 'releases/',
                ]
            },
        ]
    },

    tutorialsSidebar: function(version) {
        path = version + 'tutorials/';
        return [
            {
                title: 'Get Started',
                children: [
                    {
                        title: 'Learning Paths',
                        path: path,
                    },
                    {
                        title: 'Install Entando',
                        children: [
                            {
                                title: 'Getting Started',
                                path: version + 'docs/getting-started/',
                            },
                            {
                                title: 'Red Hat OpenShift',
                                path: path + 'getting-started/openshift-install.md'
                            },
                            {
                                title: 'Red Hat OpenShift using the Operator',
                                path: path  + 'getting-started/openshift-install-by-operator.md'
                            },
                            {
                                title: 'Amazon Elastic Kubernetes Service (EKS)',
                                path: path  + 'getting-started/eks-install.md'
                            },
                            {
                                title: 'Azure Kubernetes Service (AKS)',
                                path: path  + 'getting-started/azure-install.md'
                            },
                            {
                                title: 'Google Kubernetes Engine (GKE)',
                                path: path  + 'getting-started/gke-install.md'
                            },
                            {
                                title: 'Kubernetes',
                                path: path + 'getting-started/kubernetes-install.md'
                            },
                        ]
                    }
                ]
            },
            {
                title: 'Solution Templates',
                children: [
                    {
                        title: 'Introduction',
                        path: path  + 'solution/landing-page.md'
                    },
                    {
                        title: 'Customer Portal',
                        path: path  + 'solution/customer-portal.md'
                    },
                    {
                        title: 'Entando Hub',
                        path: path + 'solution/entando-hub.md',
                    },
                    {
                    title: 'PDA Plugin',
                        path: path  + 'solution/pda-tutorial.md'
                    },
                    {
                        title: 'Standard Banking Demo',
                        path: path  + 'solution/install-standard-demo.md'
                    },
                ]
            },
            {
                title: 'Create Components',
                children: [
                    {
                        title: 'Micro Frontends',
                        children: [
                            {
                                title: 'Introduction',
                                path: path + 'create/mfe/'
                            },
                            {
                                title: 'React',
                                path: path + 'create/mfe/react.md'
                            },
                            {
                                title: 'Angular',
                                path: path + 'create/mfe/angular.md'
                            },
                            {
                                title: 'Communication',
                                path: path + 'create/mfe/communication.md'
                            },
                            {
                                title: 'Configuration',
                                path: path + 'create/mfe/widget-configuration.md'
                            },
                            {
                                title: 'Context Parameters',
                                path: path + 'create/mfe/context-params.md'
                            },
                            {
                                title: 'Entando Platform Capability',
                                path: path + 'create/mfe/epc.md'
                            },
                            {
                                title: 'Authentication',
                                path: path + 'create/mfe/authentication.md'
                            },
                        ]
                    },
                    {
                        title: 'Microservices',
                        children: [
                            {
                                title: 'Generate Microservices and Micro Frontends',
                                path: path + 'create/ms/generate-microservices-and-micro-frontends.md'
                            },
                            {
                                title: 'Create a Spring Boot Microservice',
                                path: path + 'create/ms/spring-boot-ms.md'
                            },
                            {
                                title: 'Run Generated Components Locally',
                                path: path + 'create/ms/run-local.md'
                            },
                            {
                                title: 'Update Project Data Model',
                                path: path + 'create/ms/update-data-model.md'
                            },
                            {
                                title: 'Add Access Controls',
                                path: path + 'create/ms/add-access-controls.md'
                            },
                            {
                                title: 'Add an API Claim',
                                path: path + 'create/ms/add-api-claim.md'
                            },
                            {
                                title: 'Use Postman with OAuth2 APIs',
                                path: path + 'create/ms/use-postman-with-oauth2.md'
                            },
                            
                        ]
                    },
                    {
                        title: 'Publish Bundles',
                        children: [
                            {
                                title: 'Build and Publish a Simple Bundle',
                                path: path + 'create/pb/publish-simple-bundle.md'
                            },
                            {
                                title: 'Build and Publish a Project Bundle',
                                path: path + 'create/pb/publish-project-bundle.md'
                            },
                            {
                                title: 'Export and Publish a Bundle',
                                path: path + 'create/pb/export-bundle-from-application.md'
                            },
                            {
                                title: 'Add a GitHub Actions CI Workflow',
                                path: path + 'create/pb/github-actions-workflow.md'
                            },
                        ]
                    }
                    
                ]
            },
            {
                title: 'Curate and Share Applications',
                children: [
                    path  + 'solution/entando-hub.md',
                    path  + 'curate/private-git-repo.md',
                    path  + 'curate/bundle-private-images.md',
                    path  + 'curate/ms-private-images.md',
                ]
            },
            {
                title: 'Compose an Application',
                children: [
                    path  + 'compose/page-management.md',
                    path  + 'compose/widgets-fragments.md',
                    path  + 'compose/content-tutorial.md',
                    path  + 'compose/content-types-tutorial.md',
                    path  + 'compose/content-attributes.md',
                    path  + 'compose/content-templates-tutorial.md',
                    path  + 'compose/digital-assets-tutorial.md',
                    path  + 'compose/creating-protected-resources.md'
                ]
            },
            {
                title: 'Consume an Application',
                children: [
                    path  + 'consume/add-rest-api.md',
                    path  + 'consume/caching-and-clustering.md',
                    path  + 'consume/external-id-management.md',
                    path  + 'consume/entando-operator.md',
                    path  + 'consume/invoking-api.md'
                ]
            },
            {
                title: 'Configure and Customize an Application',
                children: [
                    {
                        title: 'Default Database',
                        path: path + 'devops/default-database.md',
                    },
                    {
                        title: 'External Database',
                        path: path  + 'devops/external-db.md',
                    },
                    {
                        title: 'Entando Docker Image',
                        path: path  + 'devops/build-core-image.md',
                    },                 
                    {
                        title: 'Backing Up and Restoring Keycloak',
                        path: path  + 'devops/backing-restoring-keycloak.md',
                    },
                    {
                        title: 'Change Default Datasource',
                        path: path  + 'devops/change-default-datasource.md',
                    },
                    {
                        title: 'Manage NGINX',
                        path: path  + 'devops/manage-nginx.md',
                    },
                    {
                        title: 'Plugin Configuration',
                        path: path  + 'devops/plugin-configuration.md',
                    },
                    {
                        title: 'Plugin Environment Variables',
                        path: path  + 'devops/plugin-environment-variables.md',
                    },
                    {
                        title: 'Configure the Entando App Context',
                        path: path  + 'devops/entando-de-app.md',
                    },
                ]
            },
        ]
    }
}
