# superdeep.link

[![Build Status](https://travis-ci.org/bengreenier/superdeep.link.svg?branch=master)](https://travis-ci.org/bengreenier/superdeep.link)
[![Deploy to Azure](http://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/)

deeplink redirects for protocol handlers

# API

## /

Shows a landing page

## /&lt;placeToRedirectTo&gt;

Redirects the caller (with a `301`) to the given location.

### Examples

With a uri:

```
GET http://superdeep.link/customProtocol://path/?to=thing HTTP/1.1

HTTP/1.1 301 Moved Permanently
Location: customProtocol://path/?to=thing
```

With a urn:

```
GET http://superdeep.link/spotify:track:5mQNY6pTeSDl2doFB7uLbE HTTP/1.1

HTTP/1.1 301 Moved Permanently
Location: spotify:track:5mQNY6pTeSDl2doFB7uLbE
```

## License

MIT