---
layout: demo-details
title: Multi-User Todo Application
github-repo-user: kaazing
github-repo-name: tutorials/tree/develop/todomvc
categories: [demo]
language: javascript
protocol: amqp091
live-demo-url: run/index.html
images:
- filename: todomvc.jpg
summary: Shared TodoMVC application using WebSocket.
---

## Details

This application adds multi-user functionality to the AngularJS flavor of the 'traditional' [TodoMVC application](http://www.todomvc.com).
To test the multi-user functionality, open the application in two or more browser windows simultaneously.
Any running instance of the application notifies other instances when any of the following events take place:
- An item is created
- An item is marked complete/incomplete
- An item is edited
- An item is 'locked', that is the item is being edited through another browser window.
Upon receipt of a message, the application updates the state of items as well as disables the items that are being worked on by any other instance.