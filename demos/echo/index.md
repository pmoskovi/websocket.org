---
layout: demo-details
title: WebSocket JavaScript Echo Demo
github-repo-user: kaazing
github-repo-name: kaazing-client-javascript-demo
categories: [demo]
language: javascript
protocol: websocket
live-demo-url: run/
#youtube-url: //www.youtube.com/embed/uuGVshDM5Hc
#vimeo-url: //player.vimeo.com/video/32956007
images:
- filename: echo1.png
- filename: echo2.png
  comment: Making a secure connection
- filename: echo3.png
- filename: echo4.png
summary: A JavaScript client for WebSocket that sends messages to the server which echoes them back.
---

## Details

In the demo, enter the connection URL in the **Location** field and press **Connect**. If you don't have your own KAAZING Gateway running, you can connect to `ws://sandbox.kaazing.net/echo`. You can also use `ws://echo.websocket.org` which is hosted on <a href="http://websocket.org/echo.html" target="_blank">http://websocket.org/echo.html</a>.

### Secure connectivity

Both **sandbox.kaazing.net** and **echo.websocket.org** are configured for secure connectivity, so you can also connect to `wss://sandbox.kaazing.net/echo` or `wss://echo.websocket.org`. (See the difference? The scheme in those URLs changed from `ws://` to `wss://`. This is like the difference between `http://` and `https://`.)

In fact, connecting securely is the recommended configuration for communication over the Web to remove interference from intermediaries like firewalls and proxies.

#### Running in your own environment

If you have a KAAZING Gateway running locally, you can connect to it by setting the **Location** to your URL, such as `ws://localhost/echo`. You can change **localhost** to whatever hostname or IP address your gateway is configured to use.

If not already configured, your gateway will need an echo service like the following:

```xml
<service>
    <name>echo</name>
    <description>Simple echo service</description>
    <accept>ws://localhost:80/echo</accept>
    <type>echo</type>
</service>
```
