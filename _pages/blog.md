---
layout: archive
permalink: /blog/
title: "Blog"
author_profile: false
sidebar:
  nav: "blog"
---

<h3 class="archive__subtitle">All Posts</h3>

{% for post in site.posts %}
  {% include archive-single.html %}
{% endfor %}
