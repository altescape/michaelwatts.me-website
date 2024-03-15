---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Making links more accessible"
pubDate: 2023-08-19
description: "Making links more accessible for screen readers"
author: "Michael Watts"
image:
  url: "https://docs.astro.build/assets/full-logo-light.png"
  alt: "A link image"
tags: ["accessibility"]
---

Although I've been involved in website and app development for quite some time, it's only recently that I've started to appreciate the importance of addressing the difficulties faced by people with disabilities. While I had previously come across accessibility standards and guidelines, I'm now beginning to genuinely understand how important it is for people with disabilities.

## Here's an eye-opening statistic

> At least 1 in 5 people in the UK have a long term illness, impairment or disability. Many more have a temporary disability.
>
> &mdash; <cite>gov.uk website - Understanding accessibility</cite>

There are [16 million people in the UK](https://www.scope.org.uk/media/disability-facts-figures/) who have a long term disability, many more with a temporary disability. Any one of us, at any given time, could encounter an injury resulting in some form of disability, whether it's related to mobility, hearing, vision, or any other potential impairment.

## Navigating web pages with a screen reader

Testing pages with a screen reader is relatively easy if you're on windows you can grab a copy of NVDA which is free.
NVDA documentation provides a list of shortcuts to navigate a website ([see here for a full list](https://webaim.org/resources/shortcuts/nvda)).

### Navigating pages

If you have not used a screen reader to navigate a web page, the amount of information fed back to you can be overwhelming. It can be a bit like visiting one of those busy old websites from the 90s, with flashing gifs, tickers, rainbows, etc. There is too much noise.

One thing I've learned is the need for manually testing components with a screen reader during development. In the context of delivering information concisely to the user, the main objective is to provide an experience that is both minimalistic and tranquil so that the user does not feel overwhelmed, does not waste time and gets the information they are looking for. It's worth noting that automated methods such as UI or unit testing were less effective in attaining this goal. I'm not yet aware of any automated testing software that help in this regard.

### Building a web component that provides concise information

Below is an example of a very simple web component that provides too much information (for what it is conveying) and another example with improvements.

#### Example component before improvement:

##### HTML

```html
<li>
  <a href="https://example.com">
    <img
      src="https://example.com/source.png"
      alt="A description about this image"
    />
  </a>
  <div>
    <h6>
      <a href="https://example.com">Example Link</a>
    </h6>
    <p>Jan 02, 2023</p>
  </div>
</li>
```

##### Screen reader output:

1. link image to https://example.com,
2. Image alt: "A description about this image"
3. Heading tag H6 0. Link "Example Link" to "https://example.com"
4. Jan 02, 2023

This is part of a list so it is worth considering that if there are many more items it could potentially overwhelm users relying on screen readers.

Changing the previous block to the following and using a neat little trick adopted by the BBC you can cut down the chatter to a single line:

#### Component after improvement:

##### HTML

```html
<ul>
  <li class="article-block">
    <div class="order-2">
      <p class="h6">
        <a href="https://example.com">Example Link</a>
      </p>
      <p>Jan 02, 2006</p>
    </div>
    <div>
      <img
        src="https://example.com/source.png"
        alt="A description about this image"
      />
    </div>
  </li>
  <ul>
    <style>
      .article-block {
        display: flex;
        position: relative;

        a {
          &:after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 2;
          }
        }
      }
    </style>
  </ul>
</ul>
```

##### Screen reader output:

1. "Example Link" link
