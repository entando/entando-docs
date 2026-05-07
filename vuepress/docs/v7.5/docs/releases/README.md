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

## Security Fixes and Improvements

### App Engine:

Critical CVEs addressed:

- CVE-2022-46364: Apache CXF SSRF via XOP href in MTOM requests, affecting cxf-rt-rs-client 3.5.2, CVSS 9.8
- CVE-2025-48913: Apache CXF JMS RMI/LDAP URL abuse leading to remote code execution, affecting cxf-rt-rs-client 3.5.2, CVSS 9.8
- CVE-2024-28752: Apache CXF SSRF via Aegis DataBinding, affecting cxf-rt-rs-client 3.5.2, CVSS 9.3
- CVE-2024-29736: Apache CXF SSRF via WADL stylesheet parameter, affecting cxf-rt-rs-client 3.5.2, CVSS 9.1
- CVE-2022-0839: Liquibase XML External Entity restriction bypass, affecting liquibase-core 4.4.3, CVSS 9.8
- CVE-2026-27727: mchange-commons-java JNDI remote factoryClassLocation code execution, affecting mchange-commons-java 0.2.19, CVSS 9.8
- CVE-2024-45216: Apache Solr improper authentication, affecting solr-solrj 8.11.1, CVSS 9.8
- CVE-2026-22732: Spring Security HTTP response headers not written correctly, affecting spring-security-core 5.5.7, CVSS 9.1
- CVE-2016-1000027: Spring Framework deserialization of untrusted data leading to remote code execution, affecting spring-web 5.3.27, CVSS 9.8
- CVE-2023-50164: Apache Struts file upload path traversal leading to remote code execution, affecting struts2-core 2.5.31, CVSS 9.8
- CVE-2024-53677: Apache Struts flawed file upload logic, affecting struts2-core 2.5.31, CVSS 9.5
- CVE-2025-66516: Apache Tika critical XXE issue, affecting tika-core 1.28.4, CVSS 9.8
- CVE-2023-44981: Apache ZooKeeper authorization bypass via user-controlled key, affecting zookeeper 3.6.2, CVSS 9.1

Upgrades and enhancements:

- Upgraded to Java 17
- Upgraded Spring Framework to 6.2.1
- Upgraded Struts to 7.0.3
- Introduced the `HEADLESS_WIDGET_CONFIG` feature flag environment variable (see the [App Engine README](https://github.com/entando/app-engine/blob/v7.5.0/README.md) for details)

### Entando Operator:

Critical CVEs addressed:

- CVE-2022-21724: PostgreSQL JDBC driver loads arbitrary classes via attacker-controlled URL parameters, affecting arc 1.13.7.Final, CVSS 9.8
- CVE-2022-4116: Quarkus Dev UI vulnerable to drive-by localhost attacks, affecting arc 1.13.7.Final, CVSS 9.8
- CVE-2023-6267: Quarkus pre-authentication JSON payload deserialization flaw, affecting arc 1.13.7.Final, CVSS 9.8
- CVE-2023-6394: Quarkus information disclosure flaw, affecting arc 1.13.7.Final, CVSS 9.1
- CVE-2024-12225: Quarkus quarkus-security-webauthn authentication bypass, affecting arc 1.13.7.Final, CVSS 9.1
- CVE-2022-1471: SnakeYAML unsafe deserialization leading to remote code execution, affecting snakeyaml 1.27, CVSS 9.8

Upgrades and enhancements:

- Upgraded to Java 17
- Upgraded Quarkus to 3.15.7
- Upgraded Fabric8 Kubernetes Client to 6.13.5

### Component-manager and K8s-Service:

Critical CVEs addressed:

- CVE-2021-42392: H2 Console JNDI lookup leading to remote code execution, affecting h2 1.4.199, CVSS 9.8
- CVE-2022-1471: SnakeYAML unsafe deserialization leading to remote code execution, affecting snakeyaml 1.27, CVSS 9.8
- CVE-2024-1597: PostgreSQL JDBC driver SQL injection via PreferQueryMode=SIMPLE, affecting postgresql 42.3.8, CVSS 9.8
- CVE-2022-0839: Liquibase XML External Entity restriction bypass, affecting liquibase-core 4.3.5, CVSS 9.8
- CVE-2016-1000027: Spring Framework deserialization of untrusted data leading to remote code execution, affecting spring-web 5.3.27, CVSS 9.8
- CVE-2023-20873: Spring Boot security bypass with wildcard pattern matching on Cloud Foundry, affecting spring-security-oauth2-autoconfigure 2.5.7, CVSS 9.8
- CVE-2026-22732: Spring Security HTTP response headers not written correctly, affecting spring-security-core 5.5.8, CVSS 9.1
- CVE-2024-50379: Apache Tomcat TOCTOU race condition during JSP compilation leading to remote code execution on case-insensitive file systems, affecting tomcat-embed-core 9.0.81, CVSS 9.8
- CVE-2025-24813: Apache Tomcat path equivalence allowing remote code execution, affecting tomcat-embed-core 9.0.81, CVSS 9.8

Upgrades and enhancements:

- Upgraded to Java 17
- Upgraded Spring Boot to 3.5.9

### App Builder:

- Introduced the `ENTANDO_FEATURE_FLAGS` environment variable, including the `LEGACY_CONFIG` flag (see the [App Builder README](https://github.com/entando/app-builder/blob/v7.5.0/README.md) for details)

### Entando CLI:

- Upgraded k9s to v0.32.7
- `check-env` no longer requires access to GitHub Packages
- `check-env` supports a new `base-develop` mode that installs only the essentials needed to work on bundles and Kubernetes
- By default, the CLI now builds micro frontends using a non-embedded Node.js, enabling builds with Node.js versions newer than 14 (this can be disabled with `ent config --set ENTANDO_CLI_HIDE_PRIVATE_NODEJS false`)

### Entando Keycloak:

- Now based on Keycloak 24 (see the [release notes](https://www.keycloak.org/2024/03/keycloak-2400-released))

### Entando PostgreSQL:

- Now based on PostgreSQL 18.1 (see the [release notes](https://www.postgresql.org/docs/release/18.1/))

### Entando Solr:

- Now based on Solr 8.11.4 (see the [release notes](https://downloads.apache.org/lucene/solr/8.11.4/changes/Changes.html))

## Additional Maintenance Scope

In addition to the vulnerability remediation listed above, Entando 7.5 includes dependency refreshes and maintenance updates intended to improve the overall security posture and supportability of the platform without changing functional behavior.

## Known Issues

- In a multitenant application, errors occur when several database backups are created for the primary and its tenants. The temporary workaround is to refresh the page.
- Currently, `ent bundle` commands `pack` and `publish` are not operable for Entando running on ARM architecture systems. You may use other frameworks to create the Docker images, such as `buildx`, and then resume the normal process to deploy and install the bundles.

## Deprecation Warnings

- Support for Kubernetes 1.23 is deprecated on Entando 6.5, 7.1, 7.2, and 7.5.

## Previous Releases

Refer to the drop-down list of versions in the left navigation menu to access documentation and release notes for previous versions of Entando. For feature-level changes and capability updates, refer to the previous 7.x release notes.
