# Security Notes

## Goal
Until it doesn't make sense anymore, I will try to get an `A` in the [Observatory by Mozilla](https://observatory.mozilla.org/) test page.
- [Tag v1.0.0](https://github.com/gvela024/etisbew/releases/tag/v1.0.0), the score of [etisbew](https://github.com/gvela024/etisbew/) is a big fat `F` with 0/100.
- [Tag v1.1.0](https://github.com/gvela024/etisbew/releases/tag/v1.1.0) still has an `F`, but the score raised to 20/100 after implementing HTTP to HTTPS redirection.

## Scratchpad

### Tools
- `$tcpdump`:  will dump all the network messages going back and forth on the machine.
  - `$sudo tcpdump -X host etisbew.herokuapp.com`: with this command, I can see all the network information between my machine and my website. The `-X` will allow me to see the packet contents in hex and in plain ASCII.

### HTTP To HTTPS Automatic Redirection
Since I am using the default Heroku domain, I can use their SSL Endpoint encryption already. Otherwise, the [Heroku SSL Endpoint](https://devcenter.heroku.com/articles/ssl-endpoint) suggest that I purchase an add-on. Ain't nobody got money for that! I installed a NPM package that will do the redirects for me called [express-sslify](https://github.com/florianheinemann/express-sslify). In the background, this will re-route all HTTP requests to HTTPs requests.

### HTTP Strict-Transport-Security
`Strict-Transport-Security` is a header in HTML that tells browsers that they should only be communicating with HTTPS. The reason being if the website redirects from HTTP to HTTPS, the user may initially send unsafe data through HTTP. Here, instead of redirecting every request, the header will tell the browser to only use HTTPS for some determined amount of time. Once that time runs out, the requests will go back to HTTP. Whenever the page is loaded, the timeout is refreshed, so sites that are visited often will effectively never expire. Google has a HSTS preload service that will put a site in a preload list of pages that will only be accessed via HTTPS [[Source: MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)].
I used [helmetjs](https://github.com/helmetjs)'s [hsts](https://github.com/helmetjs/hsts) package to add the HSTS header to my website's header. To test, I followed the [OWASP](https://www.owasp.org/index.php/Main_Page) standard method of [testing HSTS in the header](https://www.owasp.org/index.php/Test_HTTP_Strict_Transport_Security_(OTG-CONFIG-007)) which is simply using the `curl` command as follows:
```bash
$ curl -s -D- https://etisbew.herokuapp.com/ | grep Strict
```
and the result was the following:
```bash
Strict-Transport-Security: max-age=5184000; includeSubDomains
```

#### Todo
Try this [stack overflow post](http://stackoverflow.com/questions/7185074/heroku-nodejs-http-to-https-ssl-forced-redirect) out.
