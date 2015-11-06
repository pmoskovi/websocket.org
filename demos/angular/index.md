---
layout: demo-details
title: AngularJS AMQP WebSocket Demo
github-repo-user: achmadns
github-repo-name: kaazing-amqp-angular
categories: [demo]
language: javascript
protocol: amqp091
contributor: community
live-demo-url: run/
#youtube-url: //www.youtube.com/embed/uuGVshDM5Hc
#vimeo-url: //player.vimeo.com/video/32956007
images:
- filename: angular.png
  comment: HTML form created with AngularJS
summary: An AngularJS powered HTML form, communicating with the RabbitMQ message broker through AMQP 0-9-1 over WebSocket.
---

## Details

This demo was built by [Achmad Nasirudin Sandi](https://github.com/achmadns), as community contribution. The app uses [AngularJS](https://angularjs.org/) to render the form, and connects to the Kaazing Sandbox service through **AMQP 0-9-1 over WebSocket**: `ws://sandbox.kaazing.net/amqp091`.

To try out the demo, enter your name, and age. Open the page in a second browser window, and your name will render in both windows.