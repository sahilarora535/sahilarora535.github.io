---
layout: archive
permalink: /blog/
title: "Blog"
author_profile: false
sidebar:
  nav: "blog"
excerpt: "Stuff I would love to share."
header:
  overlay_image: /assets/images/blog.jpg
  og_image: /assets/images/blog.jpg
  caption: "Photo taken by me on the way from Kamand to Mandi."
---

<h3 class="archive__subtitle">All Posts</h3>

{% for post in site.posts %}
  {% include archive-single.html %}
{% endfor %}
