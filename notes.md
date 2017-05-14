# Security Notes

## Goal
Until it doesn't make sense anymore, I will try to get an `A` in the [Observatory by Mozilla](https://observatory.mozilla.org/analyze.html?host=etisbew.herokuapp.com) test page. As of [tag v1.0.0](https://github.com/gvela024/etisbew/releases/tag/v1.0.0), the score of [etisbew](https://github.com/gvela024/etisbew/) is a big fat `F`.

## Scratchpad

### Tools
- `$tcpdump`:  will dump all the network messages going back and forth on the machine.
  - `$sudo tcpdump -X host etisbew.herokuapp.com`: with this command, I can see all the network information between my machine and my website. The `-X` will allow me to see the packet contents in hex and in plain ASCII.

### HTTP To HTTPS Automatic Redirection
Since I am using the default Heroku domain, I can use their SSL Endpoint encryption already. Otherwise, the [Heroku SSL Endpoint](https://devcenter.heroku.com/articles/ssl-endpoint) suggest that I purchase an add-on. Ain't nobody got money for that!

#### Todo
Try this [stack overflow post](http://stackoverflow.com/questions/7185074/heroku-nodejs-http-to-https-ssl-forced-redirect) out.
