---
layout: demo-details
title: Real-Time Smart Buildings
#github-repo-name: kaazing-client-javascript-demo
categories: [demo]
language: javascript
protocol: amqp091
live-demo-url: run/local.html
images:
- filename: kaazing.iot.buildings.web.jpg
summary: See the impact of using real-time IoT in a smart buildings context.
---

## Details

The request/response model we have all come to know and love is starting to feel a little dated.  What makes it dated?  While HTTP 1.1 is more than 15-years old, new models of interaction are emerging across the physical world.  IoT on open Web standards is powerful, but IoT on modern Web standards such as WebSocket is a far better fit.

This example shows the value of real-time IoT in a smart buildings context.  The foundation of this example is drawn from modernizing a commercial HVAC unit.  While using request/response to view data coming from an HVAC system is helpful, it does not draw a complete picture of what is going on inside the system.

In this example, start off by seeing what IoT looks like in a request/response world.  Then use the controls provided to move to polling at five-second and one-second intervals.  Finally, go real-time with Kaazing Gateway, and see a pattern emerge - a pattern that was there all along, but that request/response was unable to surface.

The question to ask is "Why have some of the data some of the time, when you can have all the data, all the time?"  To learn more about the impact of real-time IoT on smart buildings, read the [Real-Time Smart Buildings](/blog/real-time-smart-buildings) blog post.
