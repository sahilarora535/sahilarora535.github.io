---
title: "Improving bannertopdf filter to use QPDF instead of Poppler APIs"
description: "Google Summer of Code 2018 Project to improve bannertopdf to use QPDF instead of Poppler APIs"
excerpt: "[Google Summer of Code](https://summerofcode.withgoogle.com) 2018 project to replace unsupported [poppler](https://poppler.freedesktop.org/) APIs with [qpdf](https://github.com/qpdf/qpdf)'s APIs in [bannertopdf](https://github.com/OpenPrinting/cups-filters/blob/master/filter/bannertopdf.c) filter in [cups-filters](https://github.com/openprinting/cups-filters)."
date: 2022-02-05
tags:
  - Projects
---

## Introduction

The [`banner`](https://www.cups.org/doc/spec-banner.html) file format is a format to generate sample print pages in [`cups`](https://www.cups.org). [`cups-filters`](https://github.com/openprinting/cups-filters) has a [`bannertopdf`](https://github.com/OpenPrinting/cups-filters/blob/master/filter/bannertopdf.c) filter user to conver [`banner`](https://www.cups.org/doc/spec-banner.html) files to `PDF`s, but it used unsupported APIs of [`poppler`](https://poppler.freedesktop.org/). The project aimed at replacing the [`poppler`](https://poppler.freedesktop.org/) APIs with that of [`qpdf`](https://github.com/qpdf/qpdf).

This repository was one of the projects in the [Google Summer of Code](https://summerofcode.withgoogle.com) Program, 2018 - [Improving bannertopdf filter to use QPDF instead of Poppler APIs](https://summerofcode.withgoogle.com/archive/2018/projects/5412668647145472/), under the mentorship of [The Linux Foundation](https://www.linuxfoundation.org/) as the mentoring organization.

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


## Problem at hand

[`banner`](https://www.cups.org/doc/spec-banner.html) file format was a format which was specifically created to print test pages or 1 page banners. It takes in a one page PDF as input, does some processing on it, like filling a form if necessary, and creates a new PDF. The official specifications of the `banner` file format can be found here: [CUPS Banner file format](https://www.cups.org/doc/spec-banner.html). The actual specification of `banner` in linux, i.e. in `bannertopdf`, varies a little, but more or less it's the same. Examples are great to understand the banner file format and how bannertopdf works on those PDFs. I created a repository specifically for testing bannertopdf, and you can find it here: [@sahilarora535/bannertopdf-test](https://github.com/sahilarora535/bannertopdf-test).

[`bannertopdf`](https://github.com/OpenPrinting/cups-filters/blob/master/filter/bannertopdf.c), as the name suggests, is the filter which is part of the [cups-filter](https://github.com/openprinting/cups-filters) source, responsible for reading banner files and doing appropriate operations on the PDF files.

When the [`bannertopdf`](https://github.com/OpenPrinting/cups-filters/blob/master/filter/bannertopdf.c) filter was originally written, it used XPDF APIs of [Poppler](https://poppler.freedesktop.org/). However, those APIs were unsupported in the recent versions of [Poppler](https://poppler.freedesktop.org/) and completely removed from [Poppler's](https://poppler.freedesktop.org/) source code. This affected `cups-filters` repository since `bannertopdf` filter was now unable to build or be used by anyone in any operating system. This also affected `cups-filters` as a whole, because it was unable to build. Hence, it was very important to find a solution to this problem.

## Solution

The solution which was approached was to replace all the functionalities of `bannertopdf` which used Poppler with [QPDF](http://qpdf.sourceforge.net/) APIs.

## Challenges

QPDF did not have features required to handle forms, hence it was required to add form handling features to QPDF. With some extremely valuable inputs from Tobias and discussing how to deal with the problem, we added new form handling features to QPDF. See the issue and pull request for more information on this.

- Issue: <https://github.com/qpdf/qpdf/issues/178>
- Pull request: <https://github.com/qpdf/qpdf/pull/213>

## Achievements

With all these, we are able to correctly replicate all the required functionalities of  [`bannertopdf`](https://github.com/OpenPrinting/cups-filters/blob/master/filter/bannertopdf.c), at the same time eliminating Poppler from its source. The code has been merged in the [master branch of `cups-filters`](https://github.com/OpenPrinting/cups-filters) and will be released first as a long standing bug fix in **Ubuntu 18.10 Cosmic Cuttlefish**.

## Code Links

### Issues resolved

1. [bannertopdf should not depend on Poppler #8](https://github.com/OpenPrinting/cups-filters/issues/8)
2. [PDF forms converted using bannertopdf show gibberish text when the form is edited. #14](https://github.com/OpenPrinting/cups-filters/issues/14)
3. [Feature request: Higher level abstractions for objects such as forms in a PDF. #178](https://github.com/qpdf/qpdf/issues/178)

### Pull requests created

1. [Rewrite bannertopdf to use QPDF instead of Poppler #25](https://github.com/OpenPrinting/cups-filters/pull/25)

### Commits

All the commits can be found in the pull request. Here is the list of commits which are present in the pull-request:

1. [Makefile.am: Compile bannertopdf with QPDF instead of Poppler.](https://github.com/OpenPrinting/cups-filters/pull/25/commits/bd7584f24fe6755c73ede52a0f6bc25c05844f6d)
2. [Rewrite 'bannertopdf' filter to use QPDF instead of Poppler.](https://github.com/OpenPrinting/cups-filters/pull/25/commits/d67f22bc0168c6d6a07bb9fc1e00b73915b333f1)
3. [COPYING: Update copyright information.](https://github.com/OpenPrinting/cups-filters/pull/25/commits/e23bae861d9226b8096534905e4bbe9790e691df)

## Acknowledgements

I would like to express my sincere vote of thanks to my mentors, Till and Jay, for being extremely supportive throughout the project. I would also like to thank **[Tobias Hoffman](https://github.com/smilingthax)**, one of the contributors to [`cups-filters`](https://github.com/openprinting/cups-filters), for his extremely valuable inputs without which the project could not have been complete. Lastly, I would like to express my gratitide to **Aveek Basu** (`basu [dot] aveek [at] gmail [dot] com`), who found me last year during the Google Summer of Code selections, and for selecting me to contribute to such great projects.

## Footnotes

### cups-filters
cups-filters got split out of CUPS for CUPS version 1.6.x, containing the filters and backends which Apple does not need for Mac OS X and therefore did not want to maintain anymore. [Till Kamppeter](https://github.com/tillkamppeter) had overtaken this part as an OpenPrinting project named cups-filters. He added cups-browsed as CUPS itself did not automatically make remote CUPS queues available locally anymore. He also took maintainership on all CUPS features which Apple has given up. With the time, cups-filters got improved cups-filters, especially switched to a PDF-based printing workflow, added legacy CUPS broadcasting/browsing, sophisticated filtering of remote printers, auto setup of remote IPP printers, driverless printing, etc., and all the time kept it compatible with new CUPS features.
