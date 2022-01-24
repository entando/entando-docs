module.exports = {
    docsSidebar: function(path) {
        return [
            {
                title: 'Getting Started',
                children: [
                    {
                        title: 'Introduction',
                        path: path,
                    },
                    {
                        title: 'Learn About Entando',
                        path: path + 'getting-started/',
                    },
                    {
                        title: 'Concepts Overview',
                        path: path + 'getting-started/concepts-overview.md',
                    },
                ]
            },
            {
                title: 'Create Components',
                children: [
                    {
                        title: 'Entando Component Generator',
                        path: path + 'create-components/component-gen-overview.md',
                    },
                    {
                        title: 'Entando Blueprint Features',
                        path: path + 'create-components/blueprint-features.md',
                    },
                    {
                        title: 'Component Generation Technologies',
                        path: path + 'create-components/component-gen-tech.md',
                    },
                    {
                        title: 'Customizing The Component Generator',
                        path: path + 'create-components/component-gen-customize.md',
                    },
                ]
            },
            {
                title: 'Curate and Share Components',
                children: [    
                    {
                        title: 'Entando Hub',
                        path: path  + 'curate-share/hub.md'
                    },
                    {
                        title: 'Bundle and Component Descriptors',
                        path: path  + 'curate-share/ecr-bundle-details.md'
                    },
                    {
                        title: 'Filtering Bundles',
                        path: path  + 'curate-share/ecr-bundle-filters.md'
                    },
                    {
                        title: 'Customize Bundle Info in App Builder',
                        path: path  + 'curate-share/ecr-bundle-presentation-config.md'
                    },
                    {
                        title: 'Bundle Version and Updates - FAQ',
                        path: path  + 'curate-share/ecr-bundle-versions-faq.md'
                    },
                    {
                        title: 'How Microservices connect to Entando Apps',
                        path: path  + 'curate-share/ecr-how-microservices-connect-to-apps.md'
                    },
                    {
                        title: 'Bundle Uninstall',
                        path: path  + 'curate-share/ecr-uninstall-flow.md'
                    },
                    {
                        title: 'Troubleshooting ECR',
                        path: path  + 'curate-share/ecr-troubleshooting-guide.md'
                    }
                ]
            },
            {
                title: 'Compose an Application',
                children: [
                    {
                        title: 'Welcome Wizard',
                        path: path + 'compose-an-app/welcome-wizard.md'
                    },
                    {
                        title: 'Entando App Builder',
                        path: path + 'compose-an-app/entando-app-builder.md'
                    },
                    {
                        title: 'Entando Component Repository',
                        path: path  + 'compose-an-app/ecr-overview.md'
                    },
                    {
                        title: 'Component Manager',
                        path: path  + 'compose-an-app/entando-component-manager.md'
                    }
                ]
            },
            {
                title: 'Consume an Application',
                children: [
                    {
                        title: 'Accessibility',
                        path: path + 'consume-an-app/accessibility.md'
                    },
                    {
                        title: 'App Engine',
                        path: path + 'consume-an-app/entando-app-engine.md'
                    },
                    {
                        title: 'Entando Operator',
                        path: path + 'consume-an-app/operator-intro.md'
                    },
                    {
                        title: 'Entando APIs',
                        path: path + 'consume-an-app/entando-apis.md'
                    },
                    {
                        title: 'Custom Resources',
                        path: path + 'consume-an-app/custom-resources.md'
                    },
                    {
                        title: 'Entando Identity Management System',
                        path: path + 'consume-an-app/identity-management.md'
                    }
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
                    }
                ]
            },
            {
                title: 'Release Notes',
                children: [
                    {
                        title: 'New Features and Major Fixes',
                        path: path + 'releases/'
                    },
                    {
                        title: 'Previous Releases',
                        path: path + 'releases/#previous-realeases',
                    }
                ]
            },
        ]
    },

    tutorialsSidebar: function(path) {
        return [
            {
                title: 'Get Started',
                children: [
                    {
                        title: 'Tutorials Learning Paths',
                        path: path, 
                    },
                    {
                        title: 'Install Entando',
                        children: [
                            {
                                title: 'On Red Hat OpenShift',
                                path: path + 'get-started/openshift-install.md'
                            },
                            {
                                title: 'On Red Hat OpenShift using the OperatorHub',
                                path: path  + 'get-started/openshift-install-by-operator-hub.md'
                            },
                            {
                                title: 'On Amazon Elastic Kubernetes Service (EKS)',
                                path: path  + 'get-started/eks-install.md'
                            },
                            {
                                title: 'On Azure Kubernetes Service (AKS)',
                                path: path  + 'get-started/azure-install.md'
                            },
                            {
                                title: 'On Google Kubernetes Engine (GKE)',
                                path: path  + 'get-started/gke-install.md'
                            },
                            {
                                title: 'On Tanzu Kubernetes Grid (TKG)',
                                path: path  + 'get-started/tanzu-install.md'
                            },
                            {
                                title: 'On Kubernetes',
                                path: path + 'get-started/kubernetes-install.md'
                            },
                        ]
                    }
                ]
            },
            {
                title: 'Solution Templates',
                children: [
                    {
                        title: 'Standard Banking Demo',
                        path: path  + 'solution-templates/install-standard-demo.md'
                    },
                    {
                        title: 'Customer Portal Tutorial and User Guide',
                        path: path  + 'solution-templates/customer-portal.md'
                    },
                    {
                        title: 'PDA Plugin Tutorial',
                        path: path  + 'solution-templates/pda-tutorial.md'
                    }
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
                                path: path + 'tu-create-components/mfe/'
                            },
                            {
                                title: 'React',
                                path: path + 'tu-create-components/mfe/react.md'
                            },
                            {
                                title: 'Angular',
                                path: path + 'tu-create-components/mfe/angular.md'
                            },
                            {
                                title: 'Communication',
                                path: path + 'tu-create-components/mfe/communication.md'
                            },
                            {
                                title: 'Configuration',
                                path: path + 'tu-create-components/mfe/widget-configuration.md'
                            },
                            {
                                title: 'Authentification',
                                path: path + 'tu-create-components/mfe/authentication.md'
                            },
                        ]
                    },
                    {
                        title: 'Microservices',
                        children: [
                            {
                                title: 'Generate Microservices and Micro Frontends',
                                path: path + 'tu-create-components/ms/generate-microservices-and-micro-frontends.md'
                            },
                            {
                                title: 'Run Generated Components Locally',
                                path: path + 'tu-create-components/ms/run-local.md'
                            },
                            {
                                title: 'Update Project Data Model',
                                path: path + 'tu-create-components/ms/update-data-model.md'
                            },
                            {
                                title: 'Add Access Controls',
                                path: path + 'tu-create-components/ms/add-access-controls.md'
                            },
                            {
                                title: 'Use Postman with OAuth2 APIs',
                                path: path + 'tu-create-components/ms/use-postman-with-oauth2.md'
                            },
                            
                        ]
                    },
                    {
                        title: 'Publish Bundles',
                        children: [
                            {
                                title: 'Build and Publish a Simple Bundle',
                                path: path + 'tu-create-components/pb/publish-simple-bundle.md'
                            },
                            {
                                title: 'Build and Publish a Project Bundle',
                                path: path + 'tu-create-components/pb/publish-project-bundle.md'
                            },
                            {
                                title: 'Export and Publish a Bundle',
                                path: path + 'tu-create-components/pb/export-bundle-from-application.md'
                            },
                            {
                                title: 'Add a GitHub Actions CI Workflow',
                                path: path + 'tu-create-components/pb/github-actions-workflow.md'
                            },
                            {
                                title: 'Install Plugins and Micro Frontends without a Bundle',
                                path: path + 'tu-create-components/pb/deploy-components-without-bundle.md'
                            }
                        ]
                    }
                    
                ]
            },
            {
                title: 'Curate and Share Applications',
                children: [
                    path  + 'tu-curate-share/ecr-private-git-repo.md',
                    path  + 'tu-curate-share/ecr-private-images.md',
                ]
            },
            {
                title: 'Compose an Application',
                children: [
                    path  + 'tu-compose-app/page-management.md',
                    path  + 'tu-compose-app/widgets-fragments.md',
                    path  + 'tu-compose-app/content-tutorial.md',
                    path  + 'tu-compose-app/content-types-tutorial.md',
                    path  + 'tu-compose-app/content-attributes.md',
                    path  + 'tu-compose-app/content-templates-tutorial.md',
                    path  + 'tu-compose-app/digital-assets-tutorial.md',
                    path  + 'tu-compose-app/creating-protected-resources.md',
                    path  + 'tu-compose-app/extend-app-builder.md'
                ]
            },
            {
                title: 'Configure and Customize an Application',
                children: [
                    {
                        title: 'Default Database',
                        path: path + 'configure-customize/default-database.md',
                    },
                    {
                        title: 'External Database',
                        path: path  + 'configure-customize/external-db.md',
                    },
                    {
                        title: 'External Identity Management System',
                        path: path  + 'configure-customize/external-id-management.md'
                    },
                    {
                        title: 'Entando Docker Image',
                        path: path  + 'configure-customize/build-core-image.md',
                    },
                    {
                        title: 'Backing Up and Restoring Your Environment',
                        path: path  + 'configure-customize/backing-up-and-restoring-your-environment.md',
                    },
                    {
                        title: 'Caching and Clustering',
                        path: path  + 'configure-customize/caching-and-clustering.md',
                    },
                    {
                        title: 'Add Rest API',
                        path: path  + 'configure-customize/add-rest-api.md',
                    },
                    {
                        title: 'Invoke Entando Core APIs',
                        path: path  + 'configure-customize/invoking-api.md',
                    },
                    {
                        title: 'Change Default Datasource',
                        path: path  + 'configure-customize/change-default-datasource.md',
                    },
                ]
            },
        ]
    }
}
