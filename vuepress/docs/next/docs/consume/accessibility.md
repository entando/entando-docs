---
sidebarDepth: 2
---

# Web Accessibility in Entando

**The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect.**

-- Tim Berners-Lee, W3C Director and inventor of the World Wide Web

Web accessibility means that websites, tools, and technologies are designed and developed so that people with
disabilities can use them. Accessibility is essential for developers and organizations that want to create high-quality
websites and web tools, and not exclude people from using their products and services.
See [w3.org](https://www.w3.org/WAI/fundamentals/accessibility-intro/) for an introduction to this topic.

## Requirements and Standards

Many projects and programs have specific requirements in terms of accessibility, particularly for applications
or sites with a broad reach or specific governance considerations. Entando's approach to accessibility is to provide the
tools and techniques that allow a development team to meet their own specific accessibility requirements.

Development teams need someone to become familiar with the relevant accessibility standards to help make design
decisions on how they can be applied to specific projects. These standards may vary by region so please check the
legislation in your area or consult an accessibility specialist. Useful resources include:

* [W3C Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/design-develop/)
* [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
* USA: [Section 508 of the Rehabilitation Act](https://www.section508.gov/manage/laws-and-policies)

At the end of the day, it's up to the development team to make sure their implementation is compliant with specific guidelines or standards. Typically a team will make use of Entando Page Templates, Content Templates, and custom micro frontends in order to accomplish this goal.

## Tools

Accessibility requirements are ideally known at the start of a project so the design language and tools can be adopted early in the project. Using them consistently will ease implementation of the accessibility elements needed to meet the desired compliance level. Retrofitting a project for inclusive design can be done but is typically more involved. Example
design systems used by Entando clients include:

* [Material-UI](https://material-ui.com/) - a React framework used to build a custom design system and/or one based on Material Design.
* [Carbon Design System](https://www.carbondesignsystem.com/) - IBM's open source design system
* [Bootstrap Italia](https://github.com/italia/bootstrap-italia) - a Bootstrap 4-based frontend theme that implements
  the Italian Design Guidelines for public websites.

Evaluating web accessibility is important throughout the life of a project. There are many tools available in this area. A useful list can be found [on the W3C site](https://www.w3.org/WAI/ER/tools/) with filters by guideline, region, language, etc. The following resources have been found useful by Entando clients: 

* [a11y.css](https://chrome.google.com/webstore/detail/a11ycss/iolfinldndiiobhednboghogkiopppid)
* [Access Assistant](https://chrome.google.com/webstore/detail/access-assistant/ojiighldhdmahfdnhfdebnpmlbiemdfm)
* [Wave (web accessibility evaluation tool)](https://wave.webaim.org/)




