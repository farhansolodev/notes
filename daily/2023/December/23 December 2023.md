---
tags:
---

In a PSA about making chrome return mdns addresses instead of local ip addresses from webrtc api:

>We believe the connectivity impact stems primarily from connections that previously worked host-to-host, but do not work with mDNS, and cannot fall back to STUN due to lack of hairpin support in the NAT.

Interesting that lack of hairpin in the NAT makes it such that a client cannot use STUN. DG home network works fine with local webrtc and it doesn't support hairpin ([[testing STUN clients|testing STUN clients]]), so I guess the network just supports mdns.