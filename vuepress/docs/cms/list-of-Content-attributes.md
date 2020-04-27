# List of Attribute Types

## Objective

This document provides a list and an overview of all available attribute
types.

## Overview

Attributes can be seen as the smallest elements that compose a Content
Type. In other words, a Content Type is just a collection of different
attributes. Attributes are responsible for carrying the actual
information inside a Content in Entando and could be of different types.
In this chapter, we will review and describe the different attribute
types.

Firstly, we can distinguish simple attribute types from composite
attribute types. In the first case, the attribute type carries a single
piece of information (for example, an image), while the latter is an
aggregation of simple attribute types (for example, a set of images).

## Simple Attribute Types

Attach

This represents the information carried by a file, which is attached to
the content.

It consists of an URL corresponding to the desired file present in the
system’s resources, and a text which can either indicate the description
or the name of the file.

This attribute type is rendered as a button named “Add”. By pushing that
button, the user is prompted to select a desired file present in the
system’s Digital Assets Attachments list.

Boolean

This attribute type represents a boolean value which can either be true
or false. This attribute type is rendered as two radio buttons labeled
“Yes” and “No”.

Checkbox

This attribute type behaves in the same way as a Boolean does – it is
actually an alternative to the Boolean attribute type - but it is
rendered with a checkbox labeled “Yes” or “No”.

Date

This attribute type represents a date, tracking time within a content;
it is often used to filter contents appearing in lists by publication
date, etc.

It is rendered as a datepicker.

Timestamp

This attribute type is specialized for the Date attribute, allowing you
to also specify the hour, minute and second.

It is rendered as a datepicker for the date, and a select for hours,
minutes and seconds.

Enumerator

The enumerator attribute type represents textual information with a
predefined set of choices; it is defined by:

-   Elements which are mandatory and declares the set of available
    choices;

-   Separator, which is optional and declares the character to use to
    separate the arguments of the enumerator. By default the comma “,”
    is used.

-   ExtractorBean: this parameter represents the name of the Spring bean
    to use to process the values of the enumerator. The name must
    exactly match the id of the bean as defined in the Spring
    configuration file.

It is rendered as a select list.

Enumerator Map

The enumerator map attribute type represent textual information with a
predefined set of choices; it is defined by:

-   Elements in the form of a separated list of key=value pairs, (i.e.
    key1=value1,key2=value2)

-   Separator, which is optional and declares the character to use to
    separate the key, values pairs. By default the comma is used.

It is rendered as a select list which shows the available values.

Hypertext

This attribute type holds HTML tagged text; it retains a single value
for all languages.

Even if this attribute type could support all HTML tags, we strongly
recommend using only tags which provide meaning and avoid those which
decorate or add graphics.

Hypertext attributes are rendered as a text area in the content edit
page; if the CKEditor is active, the user has access to a set of
additional functionalities from a dedicated editor’s toolbar. Such as
table insertion and table manipulation, special characters insertion,
string formatting, links creation.

Image

This attribute type binds an image resource to the content.

The image is always taken from the Digital Assets images list. The user
will need to specify the description accompanying the image.

Usually attributes of type Image are not indexed and are not used to
filter contents.

It is rendered as a button named “Add” that, when pushed, allows the
user to select an image from the Digital Assets images list. Once
selected the user is presented with a preview, as a thumbnail, of the
image and has the possibility to define some parameters:

-   Text which is mandatory and by default takes the name of the
    selected image

-   legend (optional)

-   alt (optional)

-   description (optional)

-   title (optional)

Link

This attribute type represents an hypertext link; it is normally used to
include a link in your content: it is possible to define up to three
different types of links:

1. external links: a link pointing to a location external to the Entando
portal

2. link to page: a link which points to a page of the portal

3. link to a content: a link to another content

It is rendered as a button named “Add” that when pushed opens up a modal
window from which the user can select the link type.

Longtext

This attribute type represents a simple unformatted text; it supports
several languages and is normally used for small descriptions, when a
short string won’t suffice.

It supports minimum length , maximal length and regular expressions as
optional parameters.

It is rendered as a textarea.

Monotext

Monotext represents the information in textual form, but supports only a
language; it is used for all

those fields which do not require localization.

It supports minimum length, maximal length, and regular expressions as
optional parameters.

It is rendered as a textfield.

Number

This attribute type holds an integer number; it retains a single value
for all languages.

Supports the optional parameters: From, To, and Equal to.

It is rendered as a textfield.

Text

This attribute type holds a string; it retains a single value for all
languages.

It supports minimum length, maximal length, and regular expressions as
optional parameters.

It is rendered as a textfield.

ThreeState

Conceptually similar to the Boolean attribute, this attribute type
allows a third status “Both” to be present.

It is rendered as a radio button with “Yes”, “No”, “Both” options.

## Composed attribute types

All the attributes types of the previous chapter can only retain a
single type of information, but sometimes it is desirable to aggregate
different types of attributes into one attribute: this is where composed
attributes are used.

From a functional point of view, it would be perfectly legal to build a
content type specifying all the attributes back to back: the content
would be formally complete, but from a logical point of view the
attributes would appear mutually unrelated and, worse, the relationship
between them would not be explicit.

Entando offers three types of composed attributes: List, Monolist,
Composite.

List

This Attribute Type represents a set of independent and homogeneous
elementary Attribute types, each associated with one of the languages
defined in the system.

An immediate consequence is that this kind of list can handle only
mono-language basic attributes.

It is rendered with a button named “Add” that if pushed presents the
user a prompt to select or define the single elements which compose the
list.

Monolist

This attribute type is a list that is common to all the system
languages; this kind of list handles multi-language and mono-language
attributes.

It is rendered with a button named “Add” that, if pushed, presents the
user with a prompt to select or define the single elements that compose
the monolist.

Composite

This attribute type is an aggregate of different, non-homogeneous,
simple attributes types. The aggregation of different types is treated
as a single unit.

It is rendered as a combination of the elementary attribute types, where
each attribute type presents the proper rendering.

