# Postify

Post current url to external http server.

## Install

First, build xpi file

```shell
make build-xpi
```

Next, change firefox extension signature preferences

* open `about:config`
* change `xpinstall.signatures.required` to `false`

Finally, install extension via "Install Add-on from a file".

## See also

* https://github.com/ibizaman/jsondispatch
