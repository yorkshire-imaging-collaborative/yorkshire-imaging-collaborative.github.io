---
title: Network Architecture
excerpt: Technology choices and network diagrams
subtitle: A description of the technology, solutions and partnerships which drive the technical aspects of our radiology network.

sidebar: true
toc: true

eleventyNavigation:
  parent: tech
---

## Network Design
Research carried out early in 2017 illustrated a key pattern of care delivery within our region that has informed the design of our network and has remained central to our ongoing architectural decisions.

> 97% of patient care takes place locally or regionally. Only a small minority of patients ever extend to receive care beyond those boundaries, usually for highly specialised conditions

Armed with this knowledge, we decided that a **regional hub and spoke** model was the correct design choice, following a few key principles.

* Images should stay in storage at the single point of acquisition but be regionally available via a synchronous central index
* Highest fidelity and performance for viewing and reporting locally
* Avoid duplication of data
* Avoid dependency on fragile network connections for core functionality

### Building the Supernode
We have created a sophisticated, self contained technical architecture for interoperable medical imaging across our region already delivering daily benefits. But this creation also equips our region for greater things in the future. **That's why we call it the regional Supernode**

We anticipate that in the future, the regional radiology networks will themselves become spokes in a giant **National Imaging Hub** as prophecised in the [Royal College of Radiologists Who Shares Wins Document (2016)](https://www.rcr.ac.uk/publication/who-shares-wins-efficient-collaborative-radiology-solutions)

Since the creation of this inspirational document, we have been focussed on bringing Yorkshire Imaging Collaborative to the point of readiness to participate in this National vision.

[Digital Health Rewired - Building the Radiology Supernode](https://speakerdeck.com/danfascia/digital-health-rewired-building-the-radiology-supernode)

### Network Architecture Diagram

[![Yorkshire Imaging Collaborative Network Architecture Diagram](/images/yic-architecture.png)](/images/yic-architecture.png)

## Partnerships

Our radiology network depends on working closely with selected technology partners who provide the solutions and services used to create our solution. Each provider has been carefully selected through a fair process of market assessment taking into account: product fit and features, technical constraints and cost.

| Label | Vendor | Product | Use case |
|-------|--------|---------|----------|
| **EI**    | Agfa Healthcare | Enterprise Imaging | Trust Level PACS |
| **CRIS**    | Wellbeing Software | CRIS | On site RIS |
| **Soliton**    | Soliton | Soliton IT| On site RIS |
| **Carestream**    | Vue PACS | Carestream Health | Trust Level PACS |
| **Intelerad** | InteleOne PACS | Intelerad | Regional Cloud PACS |
| **Clario** | Intelerad | Clario SmartWorklist | Regional Workflow Engine |

## Explanation of technical choices

It is a rare moment in technology that there is a blank canvas to work with. When that situation arises, the best technology decisions available at the time can be made within the confines of affordability.

**Since RIS and PACS have now been widely utilised in the UK for over 20-years now there are no greenfield sites left in the radiology integration landscape.**

Our network choices were constrained by factors such as:

* Affordability
* Incumbent vendors
* Proprietary, non-standard RIS/PACS solutions by Trusts and vendors
* NHS framework availability of companies and products
* Willingness of IT and Clinical staff to change
* Capability of vendors to deliver massive migration (8 Trusts, 29 Hospitals)

### Agfa Enterprise Imaging (EI)
Our largest organisation expressed a strong desire to remain with Agfa Healthcare as the core PACS provider (Impacs was in place across the region). In spite of being an incumbent vendor, Enterprise Imaging represented a completely different and novel product. 

Agfa Enterprise Imaging was also highly rated during our multivendor open assessment sessions attended by a wide range of clinical, IT and PACS staff lead by Dr Nicholas Spencer (Mid Yorkshire Hospitals).

#### 2017
Harrogate District Hospital was used as the initial site of migration and deployment. Harrogate is nearly always used as our pioneer site. It is a small, technically forward thinking Trust and the base site of our Regional Clinical Lead Dr Daniel Fascia, thereby offering a tolerant environment for experimental sandboxing and deployment.

After a lot of planning, PACS Manager Oliver Walkowiak celebrated a near flawless deployment placing EI into direct clinical use. As a prototype, Impacs was maintained as a sidecar parallel system for 6-months then decommissioned.

#### 2018 - 2020
Following initial learning from Harrogate and next North Lincolnshire & Goole, a series of Enterprise Imaging Deployments followed in rapid succession.

### COVID-19
In March 2020 Yorkshire Imaging Collaborative were re-deployed to build the medical imaging service for the NHS Nightingale Hospital. Our close partnership with Agfa continued to flourish through adversity with a strong joint focus to 'make it all work' as fast as possible to equip the region for mass patient movement to the pandemic hospital.

Technology Programme Manager Janine Bontoft delivered the Xero Exchange Network with Agfa almost one-year ahead of scheduled launch. This meant that images and reports of patients moving around the region were now fully visible from every partner hospital.

### Xero Exchange Network (XEN)
Xero is an in browser HTML5/Javascript medical imaging viewer capable of showing a wide range of medical imaging, beyond radiology. It aggregates images from all connected sites and shares them across a wide area cloud network without the need to ever install any software.

Xero Extend is an add-on Yorkshire Imaging Collaborative have which brings the full power of 3D multiplanar reconstruction to end users. For the first time, clinical users have been given the power tools usually enjoyed only by radiologists. Whilst many have embraced these tools, for others it has served as a point of appreciation for the technical skill of radiologists in manipulating medical images.

**Crucially, all images and reports are available at the point of care across Yorkshire, the Humber and North Lincolnshire** thanks to the Xero Exchange Network.

Previously this was a tedious, manual task carried out by dedicated staff using the dated Image Exchange Portal.

## Intelerad & Clario Smart Worklist

Following the successful deployment of Enterprise Imaging PACS at our local member sites, our attention turned to **Total Radiology Interoperability(tm)**.

Whilst Xero (XEN) allows clinical grade interoperability, allowing clinians and radiologists to view images and reports from other sites it does not allow full cross site radiology working. The needs of a radiologist are far more sophisticated.

**Following a successful NHS England funded bid for £6.1M** we partnered with Intelerad who are a market leader in cloud PACS and radiology integration solutions. With a reassuring number of similar projects in long service use in Australasia, Canada and North America we felt confident that Intelerad could listen to the bespoke needs of our specific network vision and turn it into a reality.

### The Regional Insource Reporting Network
A central component of our vision is to replace as much private outsourcing as possible with NHS insourcing. This is [additional work carried out on a _fee per service_ basis](/insourcing/) by substantiative NHS Consultant Radioligists and Reporting Radiographers already credentialled by one of our member sites.

This vision requires a sophisticated worklist and workflow solution existing above and outside of the multiple local PACS, as well as a cloud PACS to ensure that remote images and priors are available with good fidelity to allow both in hospital and home based remote reporting.

## Readiness for National Interoperability

Our primary focus is to build a highly performant network for members of Yorkshire Imaging Collaborative to serve their patients with a consistent and high quality medical imaging service.

As a deliberate by-product, those who choose to be members of Yorkshire Imaging Collaborative will achieve an advanced state of readiness for national radiology connectivity.