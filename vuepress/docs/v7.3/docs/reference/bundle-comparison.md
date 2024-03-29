---
sidebarDepth: 2
---

# Bundle Evolution on Entando 7

Entando 7.1 introduced a more modular approach to building apps with the **ent bundle CLI** orchestrating the management of a bundle project. The Entando Bundle was restructured, its processes decoupled by component type, and the publishing transport method streamlined. With these changes, Entando Bundles went from git-based to docker-based OCI bundles. This page clarifies the differences between the v1 git-based and v5 docker-based bundles. Git-based bundles are deprecated with Entando 7.2.

With **Entando 7.3**, the bundle has advanced further with descriptorVersion v6, adding the capability to request resources for storage, memory and CPU for microservices in the bundle descriptor `entando.json`. For more information on this specification or docker-based bundles, see the [Bundle Details](../curate/bundle-details.md) page.

For instructions on converting a git-based bundle to a docker-based bundle, see the [Convert Bundle tutorial](./convert-bundle.md). 

### Bundle Comparison Table
|Property| [git-based bundles](../../../v7.0/docs/curate/ecr-bundle-details.md)| [docker-based bundles](../curate/bundle-details.md)|
| :- | :-------------------- | :---------------------  |
|`descriptorVersion`| v1| v5
| Bundle Specifications |Defined with descriptor files | Built with [ent bundle CLI](../getting-started/ent-bundle.md) tool
| Versioning |Bundle version set by Git tags |Bundle version set by Docker tags. For MFEs, the version defaults to 1.0.0 unless set in the [entando.json](../curate/bundle-details.md)
|Plugin Ingress| Generated by Entando (canonical relataive path) or set in the plugin descriptor.yaml | Generated by Entando (includes a unique bundle code ID for each plugin, and for each tenant in a multitenant application) or customized in the [bundle descriptor](../curate/bundle-details.md#entando-bundle-conventions), entando.json
|Identifiers| Designated Bundle ID and Plugin ID | Bundles, MFEs, & plugins have unique global IDs|
|Bundle ID| Not included in component names | Suffix of bundle, plugin, widget, page and fragment names
|Initialize from Entando Hub| As git clone  |[Direct initialization from Hub](../getting-started/ent-bundle.md#initialization) with `–from-hub` flag|
|Bundle Creation | [`ent prj` commands](../getting-started/ent-bundle.md#git-based-bundle-commands)| New modular [`ent bundle` commands](../getting-started/ent-bundle.md)
|Deploy and Install| `ent ecr deploy` and `ent ecr install` | No change 
|Export Bundle|`ent bundler`| Not Available 
|JHipster Integrated Blueprint Project| `ent jhipster blueprint` creates [MFE & MS template project](../../tutorials/create/ms/generate-microservices-and-micro-frontends.md)| [Convert blueprint project to v5 bundle](../../docs/reference/convert-bundle.md) 
|API Claims| Manual configuration in MFE bundle | [Manage APIs with `ent bundle` commands](../getting-started/ent-api.md). Micro frontends can make API claims to microservices within the same bundle or namespace
|Local Services |Blueprint includes a few services under src/main/docker | Default services now include Keycloak, PostgreSQL, and MySQL. Additional services can be added with the [`ent bundle svc` commands](../getting-started/ent-svc.md)
|MFE Custom UI| Add with manual scripts| Custom UI is auto-generated in FTL format
|| | Auto-generated FTLs with parameters defined in entando.json |
|Bundle Thumbnail| Detailed inside the YAML bundle descriptor| Set with a JPG or PNG file named `thumbnail` in the bundle root folder, e.g. thumbnail.png
