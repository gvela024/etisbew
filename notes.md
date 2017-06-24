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
I used [`helmetjs`](https://github.com/helmetjs)'s [`hsts`](https://github.com/helmetjs/hsts) package to add the HSTS header to my website's header. To test, I followed the [OWASP](https://www.owasp.org/index.php/Main_Page) standard method of [testing HSTS in the header](https://www.owasp.org/index.php/Test_HTTP_Strict_Transport_Security_(OTG-CONFIG-007)) which is simply using the `curl` command as follows:
```bash
$ curl -s -D- https://etisbew.herokuapp.com/ | grep Strict
```
and the result was the following:
```bash
Strict-Transport-Security: max-age=5184000; includeSubDomains
```

### Clickjacking
Clickjacking is when an attacker puts a transparent layer over an existing website so that a user will unknowingly click on a malicious site when the user thought they were clicking on a regular site. Hence the term "clickjacking". Keystrokes can also be hijacked by, through some creative work, putting in a malicious text box on top of a regular one to steal the users keystrokes. There are several ways to protect against clickjacking, the main one being the proper `X-Frame-Options`. Setting the proper `X-Frame-Options` will not allow framing by other domains, essentially not allowing your page to be framed by another page [Source: OWASP](https://www.owasp.org/index.php/Clickjacking). To do this, I used [`helmetjs`](https://github.com/helmetjs)'s [`frameguard`](https://github.com/helmetjs/frameguard) package. `frameguard` will securely set the correct `X-Frame-Options`. To test, I again followed [OWASP](https://www.owasp.org/index.php/Main_Page) standard [test for clickjacking](https://www.owasp.org/index.php/Testing_for_Clickjacking_(OTG-CLIENT-009)):
1. Load true page in `iframe` of another page using the following HTML:
```html
<html>
   <head>
     <title>Clickjack test page</title>
   </head>
   <body>
     <p>Website is vulnerable to clickjacking!</p>
     <iframe src="http://etisbew.herokuapp.com" width="500" height="500"></iframe>
   </body>
</html>
```
I created a [`clickjack-testing-etisbew`](https://github.com/gvela024/clickjack-testing-etisbew) repo for testing this and without `X-Frame-Options`, I am able to see `etisbew` inside of `clickjack-testing-etisbew`.

### X-Content-Type-Options
"X-Content-Type-Options is a header supported by Internet Explorer, Chrome and Firefox 50+ that tells it not to load scripts and stylesheets unless the server indicates the correct MIME type. Without this header, these browsers can incorrectly detect files as scripts and stylesheets, leading to XSS attacks. As such, all sites must set the X-Content-Type-Options header and the appropriate MIME types for files that they serve." - [Mozilla Security](https://wiki.mozilla.org/Security/Guidelines/Web_Security#X-Content-Type-Options)

### Content Security Policy
Cross site scripting is when malicious code (JavaScript, HTML, or any other web embeddable code) is embedded into a trusted website. The malicious code is capable of doing many things. Often, the malicious code gathers information that only the trusted page has access to (cookies and other session data) and sends it to the attacker. XSS has been expanded to have at the moment 2 different categories. `Stored` (or persistend) is when the malicious code is stored in the server of the vulnerable site and is loaded by the client. `Relfected` (or non-persistent) is when the malicious code is sent to the client in an a notification or email when the malicious code travels to the vulnerable site and is executed since it is from a trusted source [Source: OWASP](https://www.owasp.org/index.php/Cross-site_Scripting_%28XSS%29).
There really isn't an easy way to test this. I tried several things like putting HTML or JavaScript into the URL or other inputs. I'm sure if I was an expert hacker, I could expose some vulnerability. In any case, the Mozilla Observatory recommends setting the `X-Content-Type-Options` in the header to prevent browsers from incorrectly detecting non-scripts as scripts.
The content security policy I implemented was as secure as I could make it. I had to permit several modules to be loaded from an external site. One of the modules was for charting the data, and the other was the CSS bootstrap that I used to make my site look good.

### Device Authentication
Difference between Authentication & Authorization

#### Authentication
Verifying the identity of a person or system in a secure manner (i.e. login credentials).

#### Authorization
The level of privileges that a user is given (i.e. read/write privilages).

#### Protection Methods
There are several different protection methods that can be used to authenticate users. They include:
1. Email authentication: sending an email to authenticate user
2. Password authentication: user has to enter a known key
3. Social network authentication: user has to sign into specific social network in order to gain access
4. Biometrics: using constant human characteristics such as fingerprints or retinal scans
5. Two factor authentication: using something that is known (password) with something the user has (card, or code sent to mobile)

Unfortunately, the above doesn't really provide what I need. I think instead, I will create a handshake method for the device to be authenticated, and stored in a list of "trusted devices".
[Source: TheNextWeb "Ultimate guide to device authentication"](https://thenextweb.com/future-of-communications/2016/02/17/the-ultimate-guide-to-selecting-a-device-authentication/#.tnw_6OXYfJ3R)

#### Todo
Research Mutilidae & Nowasp
