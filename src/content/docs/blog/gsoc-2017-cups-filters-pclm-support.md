---
title: "Add PCLm support to cups-filters"
description: "My GSoC 2017 project to add PCLm support to cups-filters for driverless printing on Linux."
excerpt: "A summary of my Google Summer of Code 2017 project, which brought PCLm support to Linux's printing system for modern, driverless printers."
date: 2022-02-05
tags:
  - Projects
  - Work
  - Google Summer of Code
---

## Introduction

This project aims at writing the first implementation of the `PCLm` format convertor, which is a strict subset of the `PDF` format and lets printers low on memory print the files without any issues.
This project was done during the [Google Summer of Code 2017](https://summerofcode.withgoogle.com) program: [Add support to `CUPS`-FILTERS for enabling conversion to and printing of PCLm files supported by IPP everywhere printers](https://summerofcode.withgoogle.com/archive/2017/projects/5722648516493312/), under the mentorship of [The Linux Foundation](https://www.linuxfoundation.org/) as guiding organization.

## Mentors

1. **Till Kamppeter**: Till Kamppeter is the project leader for OpenPrinting. He was invited in 2006 to work for the Free Standards Group (now [The Linux Foundation](https://www.linuxfoundation.org/)) merging <http://linuxprinting.org> into [OpenPrinting](http://openprinting.org/) and leading the OpenPrinting project full time. With OpenPrinting, he leads the development of new printing architectures, technologies, printing infrastructure, and interface standards for Linux and Unix-style operating systems. For this he is in contact with the leading printer manufacturers, all relevant free software projects, and the distribution vendors.
Till is also a distinguished [Linux Foundation Fellow](https://www.linuxfoundation.org/about/linux-foundation-fellows/). 
 
  - Contact: `till [dot] kamppeter [at] gmail [dot] com`
  - Github: [tillkamppeter](https://github.com/tillkamppeter)

2. **Jay Berkenbilt**: Jay is the creator and maintainer of the widely used [`QPDF`](https://github.com/qpdf/qpdf) library. He is currently the Principal Release Manager at [Appian](https://www.appian.com/).

  - Contact: `ejb [at] ql [dot] org`
  - Github: [jberkenbilt](https://github.com/jberkenbilt)

## Background

### `CUPS` and `CUPS`-filters

[`CUPS`](https://www.cups.org/) is the standards-based, open source printing system developed by Apple Inc. for macOS® and other UNIX®-like operating systems. `CUPS` uses the Internet Printing Protocol (IPP) to support printing to local and network printers. `CUPS` is the primary printing software. `CUPS-FILTERS` is a software which is shipped with `CUPS` and is mainly responsible for, as the name suggests, filtering the data that goes to the printer, for example converting the print file to a format supported by the printer, getting [IPP](https://en.wikipedia.org/wiki/Internet_Printing_Protocol) attributes from the printer, etc.


### Internet Printing Protocol (IPP)

The [Internet Printing Protocol](https://en.wikipedia.org/wiki/Internet_Printing_Protocol) is an Internet protocol for communication between computers and printers (or print server). It allows programs to send one or more print jobs to the printer or print server and perform administration such as querying the status of a printer, obtaining the status of print jobs, or cancelling individual print jobs.

Printers have always come with a driver installation when you buy it, which contained all the drivers and necessary software to print a file. The drivers contained instructions for how the operating system should interact with the printer, and what language the printer understands. So the printer manufactures had no rules or conventions on how to make a printer, what languages should it support, etc. All they did was put the CD with the printer. But then came smartphones, iPads, etc., devices where printer manufactures could not put the CDs. Hence came into picture Internet Printing Protocol or the IPP. This was a protocol as to how the printers should be made in order to support printing without a manufacturer specific software, or basically **driverlessly**. This is very similar to `HTTP`, the protocol you use to get a web page. When you click on a web page, your browser first contact the `DNS` provider which gives the equivalent `IP` address of the server, then your browser sends a `GET` Request to that `IP` of the server to get data. Similarly, in modern day wireless printers, you do an `IPP GET` request. You have a software which contacts a `DNS` service on your machine to get the `IP` of the printer, and then asks for the printer for all the capabilities it has, for instance does it support 2-side printing, duplex printing, etc. The with the same process you transfer a file to the printer to print, via `IPP`, along with the options we feel, like `color_printing = false`, and you have your print in the printer. This is `IPP`, the future of printing.

### About PCLm

PCLm is a file format which was created by [HP](https://en.wikipedia.org/wiki/Hewlett-Packard), and is a light-weight, strict subset of PDF which makes printing fast and efficient. That means that it can be viewed by a normal PDF viewer. It is streamable, i.e. can be printed page by page unlike PDFs, where PDF files require them to be loaded completely to the printer memory to be printed. Many cheap printers which are low on memory have this limitation of printing large PDF files, and here PCLm comes to the rescue. It also makes printing faster for high end printers. PCLm is also one of the standard file formats supported by [Wifi-Direct](https://www.wi-fi.org/discover-wi-fi/wi-fi-direct) and [Mopria](http://mopria.org/) printing standards.

## Problem at hand

Until now, there were no open source softwares which could create a PCLm file. The only software which is paid is [PCLWorks](http://www.pclworks.com/), which is a proprietary software. Other implementations of PCLm include the softwares included by the printer manufacturers, but they are not available for linux operating systems. Hence, this project is an attempt at converting an input file to a valid PCLm file for the printer to print it.

## Impact

There are millions of printers today which are certified by  [Wifi-Direct](https://www.wi-fi.org/discover-wi-fi/wi-fi-direct) and/or [Mopria](http://mopria.org/) printing standards. All those printers support PCLm, and the success of this project means that all printers designed for driverless printing (typically the ones where the manufacturer tells you can print from a phone or tablet on it) should print via `CUPS`. Most modern network printers do this, many USB printers, too.

## Challenges

The biggest challenge was lack of resources. Since there were no previous implementations of PCLm, everything had to be done from scratch. There was one implementation [here](https://github.com/ibevilinc/WFDSPrintPlugin/tree/master/jni/wprint/plugins/genPCLm/src), but it was an obsolete android application which could not build. Hence, for about one and a half month we had no idea if we could pull it off or not. Also, this implementation was very heavy and would have increased the size of the `cups-filter` software by manifolds and would have been extremely unmaintainable.

Since PCLm was a subset of PDF, we decided we would modify an already existing filter which converts PWG Raster file format to PCLm. The filter was already using [`QPDF`](https://github.com/qpdf/qpdf), hence we decided we would use [`QPDF`](https://github.com/qpdf/qpdf) to do our task. 

However, mid-July we realized that it was impossible for [`QPDF`](https://github.com/qpdf/qpdf) to do some tasks which were required by PCLm. To facilitate that, we had to try making changes to [`QPDF`](https://github.com/qpdf/qpdf) as well so that it support PCLm conversion.

The other big challenge was debugging PCLm files. There was a time when they were displayed correctly by the PDF viewer, but the printer would say that it encountered a `**document-format-error**` while printing the file. No error logs, no data, nothing. Hence debugging was also a very difficult task here.

## Achievements

The code changes made and features added in this project have made it to `cups-filters v1.17.0`. Also, [`QPDF`](https://github.com/qpdf/qpdf) has also been released to `v7.0.0` and facilitates PCLm creation mode. PCLm compatibility will be first introduced as a new feature in **Ubuntu 17.10 Artful**! This will make Ubuntu Artful be as capable as many mobile devices when it comes to printing.

## Code Links

1. The `cups-filters` source does not use Git, but Bazaar. The source can be found here: <http://bzr.linuxfoundation.org/loggerhead/openprinting/`CUPS`-filters/changes>
2. My commits in the bazaar repository of `CUPS`-filters can be found her
 - <http://bzr.linuxfoundation.org/loggerhead/openprinting/`CUPS`-filters/changes/7682.1.5>
 - <http://bzr.linuxfoundation.org/loggerhead/openprinting/`CUPS`-filters/changes/7696.1.1>
3. Since all the development of `cups-filter` happens in bazaar and I have chosen git to work with, all the changes in the commits in this repository(except [39aefc](https://github.com/sahilarora535/`CUPS`-filters/commit/39aefcbe6ea2e89f4c4ce7223c7a60f28dae3e71), [d686a9](https://github.com/sahilarora535/`CUPS`-filters/commit/d686a9f66d44a0fb732cad94fc25e376be9f65a1), [ccb47b](https://github.com/sahilarora535/`CUPS`-filters/commit/ccb47b24178fc454713fd7b1051d80c1389db81b) and [964e63](https://github.com/sahilarora535/`CUPS`-filters/commit/964e634fbe6e8a243fdd423d6fd92e1c3c45db33)) have been done by me. You can find the commits here: <https://github.com/sahilarora535/`CUPS`-filters/commits/master>.
4. I also had to make changes to `QPDF` for completing this project. The commit for which can be found here: <https://github.com/qpdf/qpdf/commit/b19210fa7dbab7efa7a3cd65653be4ff2f6e08e9>
5. To test the code, I created a tool to create some sample PCLm files from raster images. You can also find some saple PCLm files here. This has also been completely written by me, and can be found here: <http://github.com/sahilarora535/raster-to-pclm/>.

## Footnotes

### cups-filters
`CUPS`-filters got split out of `CUPS` for `CUPS` version 1.6.x, containing the filters and backends which Apple does not need for Mac OS X and therefore did not want to maintain any more. [Till Kamppeter](https://github.com/tillkamppeter) had overtaken this part as an OpenPrinting project named `CUPS`-filters. He added `CUPS`-browsed as `CUPS` itself did not automatically make remote `CUPS` queues available locally any more. He also took maintainership on all `CUPS` features which Apple has given up. With the time, `CUPS`-filters got improved `CUPS`-filters, especially switched to a PDF-based printing workflow, added legacy `CUPS` broadcasting/browsing, sophisticated filtering of remote printers, auto setup of remote IPP printers, driverless printing, etc., and all the time kept it compatible with new `CUPS` features.

### Internet Printing Protocol

IPP was created in the late 1990s and was base of `CUPS` which got 1.0 in 2000, well before smartphones appeared, but IPP 2.0 added things like the possibility to poll the full set of printer capabilities to allow driverless printing.
