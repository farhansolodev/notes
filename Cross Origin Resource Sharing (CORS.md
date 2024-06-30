The `Origin` request header can't be spoofed inside a browser context[^1]. Meaning every request from a site is guaranteed to be from that site - from the same origin.

---

According to MDN:
>(Allowing) credentials (to be) sent in cross-origin requests (...) can make a site vulnerable to CSRF attacks.

This is correct, because when a user goes on a malicious site that sends requests to `vulnerable-bank.com` and that user's cookies get sent to that site, the malicious script gets authorized as the user, i.e: the user is "hacked". This is classic CSRF.

---

`HttpOnly` cookies don't help here since the malicious site can't access the user's cookies for the target site using Javascript anyway. This **does** however protect cookies from being extracted via XSS attacks.

> I think this property doesn't prevent unsafe requests like `POST/PUT/DELETE` from being sent to the target domain with cookies though. So XSS **can** still cause harm even with `HttpOnly` set.

---

`SameSite=Lax` cookies do help here since the only requests the malicious site could make to the target domain is from hyperlinks to the target site, which is always a `GET` request anyway, and any sensitive data returned from that request would only be available to the target site, not the site where the request originated from.

>But what if it's not `vulnerable-bank.com` and instead `vulnerable-api.com` that accepts requests from any origin?

An API **cannot** accept authenticated requests from "any origin" if cookies are involved. This is because browsers won't show the client the response body after a cross-origin request with cookies if the `Access-Control-Allow-Origin` header is set to `*`.

Therefore if an API needs to be able to accept authenticated requests from any origin, they **must** use *tokens* instead of cookies.

For a BFF (backend-for-frontend) with cookies meant for authorization, I figured it made sense for those cookies to have `SameSite=Strict` since normally the request to log in or sign up comes from within the target site, but I think `SameSite=Lax` actually provides a better user experience since any user that already has a session on that target site would immediately be authorized following a hyperlink.

Or I'm assuming in the case of OAuth services, you'd need to atleast have `SameSite=Lax` for quicker automatic authentication, otherwise the user would need to log in to Google/Facebook/Apple etc. every time they want to sign up with OAuth. Although admittedly this isn't all that frequent per device.

---

For cross-origin requests, the browser will allow the client to access the response body if the following preconditions are true:
- The request is a simple request, meaning it is **not preflighted**
- The `Access-Control-Allow-Origin` response header is set to the origin that the client sent the request from

Alternatively, the browser will allow the client to access the response body if these preconditions are true instead:
- The request is **not** a [simple request](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#simple_requestscontains), i.e: it is preflighted. Specifically it includes credentials such as cookies, TLS client certificate, username & password in the header. In the case of cookies, none are sent in complex requests by default unlike in simple requests, unless at least one of these is configured:
	- XMLHttpRequest: xhr.withCredentials = true;
	- Fetch: credentials: ‘include’
- The `Access-Control-Allow-Credentials` response header is set to `true`
- The `Access-Control-Allow-Origin` response header is set to the origin that the client sent the request from

[Web Security: an Overview of SOP, CORS, and CSRF](https://maddevs.io/blog/web-security-an-overview-of-sop-cors-and-csrf/) seems like a good resource for this.


[^1]: It can be spoofed if the user downloads a maliciously patched browser, but in this scenario not only could CORS just be removed entirely but the malicious browser would just have read access to the user's cookies anyway.