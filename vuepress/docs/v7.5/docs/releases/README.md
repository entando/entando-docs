---
sidebarDepth: 2
---

# Entando 7.5 Release Notes

Entando 7.5 is a maintenance and security release. From a functional perspective, this version is equivalent to the previous 7.x release and does not introduce new user-facing features. The focus of this release is vulnerability remediation, dependency upgrades, and platform hardening.

## Summary
- No new user-facing features are introduced in Entando 7.5.
- Entando 7.5 is functionally equivalent to the previous 7.x release.
- This release focuses on security remediation and maintenance updates.
- Refer to the previous 7.x release notes for functional enhancements and product capability changes.

### Compatibility
* [Entando 7.5 Compatibility](/compatibility/Entando_7.5_Compatibility.pdf)
* [Guides for previous versions of Entando](https:/auth.entando.com/page/en/compatibility-guide)

## Functional Equivalence

Entando 7.5 does not add new platform capabilities, workflow changes, or new feature areas. Users upgrading to this release should expect the same functional behavior as the previous 7.x release, with improvements limited to security fixes, dependency updates, and supporting maintenance work.

## Security Fixes

The following vulnerabilities were present in App Engine 7.3 and are addressed in App Engine 7.5:

- CVE-2022-46364: Apache CXF SSRF via XOP `href` in MTOM requests, affecting `cxf-rt-rs-client` 3.5.2, CVSS 9.8
- CVE-2025-48913: Apache CXF JMS RMI/LDAP URL abuse leading to remote code execution, affecting `cxf-rt-rs-client` 3.5.2, CVSS 9.8
- CVE-2024-28752: Apache CXF SSRF via Aegis DataBinding, affecting `cxf-rt-rs-client` 3.5.2, CVSS 9.3
- CVE-2024-29736: Apache CXF SSRF via WADL stylesheet parameter, affecting `cxf-rt-rs-client` 3.5.2, CVSS 9.1
- CVE-2022-0839: Liquibase XML External Entity restriction bypass, affecting `liquibase-core` 4.4.3, CVSS 9.8
- CVE-2026-27727: `mchange-commons-java` JNDI remote `factoryClassLocation` code execution, affecting `mchange-commons-java` 0.2.19, CVSS 9.8
- CVE-2024-45216: Apache Solr improper authentication, affecting `solr-solrj` 8.11.1, CVSS 9.8
- CVE-2026-22732: Spring Security HTTP response headers not written correctly, affecting `spring-security-core` 5.5.7, CVSS 9.1
- CVE-2016-1000027: Spring Framework deserialization of untrusted data leading to remote code execution, affecting `spring-web` 5.3.27, CVSS 9.8
- CVE-2023-50164: Apache Struts file upload path traversal leading to remote code execution, affecting `struts2-core` 2.5.31, CVSS 9.8
- CVE-2024-53677: Apache Struts flawed file upload logic, affecting `struts2-core` 2.5.31, CVSS 9.5
- CVE-2025-66516: Apache Tika critical XXE issue, affecting `tika-core` 1.28.4, CVSS 9.8
- CVE-2023-44981: Apache ZooKeeper authorization bypass via user-controlled key, affecting `zookeeper` 3.6.2, CVSS 9.1

## Additional Maintenance Scope

In addition to the vulnerability remediation listed above, Entando 7.5 includes dependency refreshes and maintenance updates intended to improve the overall security posture and supportability of the platform without changing functional behavior.

## Known Issues

- In a multitenant application, errors occur when several database backups are created for the primary and its tenants. The temporary workaround is to refresh the page.
- Currently, `ent bundle` commands `pack` and `publish` are not operable for Entando running on ARM architecture systems. You may use other frameworks to create the Docker images, such as `buildx`, and then resume the normal process to deploy and install the bundles.

## Deprecation Warnings

- Support for Kubernetes 1.23 is deprecated on Entando 6.5, 7.1, 7.2, and 7.5.

## Previous Releases

Refer to the drop-down list of versions in the left navigation menu to access documentation and release notes for previous versions of Entando. For feature-level changes and capability updates, refer to the previous 7.x release notes.
