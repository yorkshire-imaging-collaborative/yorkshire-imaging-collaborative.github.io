---
title: Critical Alerting
hub: Insourcing
tags:
  - footer
subtitle: Interoperable cross-site failsafe notification system
excerpt: Notification of critical and unexpected findings, as well as changed reports are national standards of care which we endorse throughout our Regional Imaging Network
sidebar: true
toc: true
author: Dr Daniel Fascia
lastReview: 2022-11-15T14:03:54.883Z
nextReview: 2023-11-10T14:03:54.925Z
---
## What is Critical Alerting in Radiology?
When a radiological examination is interpreted and found to meet certain criteria it is deemed necessary to issue a critical alert. This is a push notification which exceeds
the normal level of issue priority of a normal radiological report at the point of publication.

The alert is delivered to downstream medical information systems such as Electronic Patient Records (EPR) or result software. Ideally a messaging broker issues a push notification
to the responible team or health professional to inform them of the category of alert and the patient it applies to.

## Critical Alert Codes
YIC endorse the critical alert codes and methodology of the Royal College of Radiologists with local enhancements suggesting that it is a digital process rather than a 
human factor dependent process.

### Just 3-Codes

**#ALERT_SIGNIFICANT#**
Used when a study contains an unexpected or important finding where time is a likely factor in achieving a better clinical outcome.

**#ALERT_CANCER#**
Used when a study contains a finding which could be associated with an underlying malignant condition, where that diagnosis is not already established.

**#ALERT_ADDENDUM#**
Used when a study has been reviewed, and an addendum has been authored which changes or supplements the findings of the original issued report.

### How are Critical Alerts Triggered?
In YIC we have opted to use **text code** based alerts in order to achieve rapid interoperatbility and backwards compatibility with the wide range of medical software in place
across our collaborative partners. This methodology allows the fastest route to safety for examinations reported in our insource network.

Trusts partcipating in the Insource Reporting Network are asked to modify their RIS text-parsing algorithms to generate alerts based on the above codeset. If equivalent codes are already in use
then a mapping to that alert process can be made. If the codes are supplementary, the Trust are asked to create an appropriate action mapping to trigger a downstream notification for the event.

Where a Trust has other existing alert codes which are outwith the above, they may continue their use but should not expect to receive such alerts from studies which are reported via
the YIC Insource Reporting Network.

### The Critical Alert Flow
1. A report containing a critical finding is authored
2. An alert code is applied to the report in a text code _or_ as a digital (HL7) message
3. A push notification is issued on publication of the result
4. Downstream receiving systems recognise the alert and notify the referring clinician _or_ responsible health team
5. Ideally an acknowledgement is received and recorded as a timestamp against the alert
