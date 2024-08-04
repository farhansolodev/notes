EIM is what was happening at `codespaces.com` -> the mapped port seems to not care about what endpoint its hitting, its mapping strategy seems to only take the internal port into account.

![[stun terms-20231130044500656.webp|380]]

> Port 50002 was also getting mapped to 1024 every time without fail even on a different day…meaning atleast as of 30th November 2023 their router's mapping policy is pretty static - not all routers may have static policies.

Mapping policies are for outbound packets & Filtering policies are for inbound packets.

---

Address and Port Dependant Filtering looks like symmetric NAT

![[stun terms-20231130133530058.webp|399]]

In that case, my `stunting` p2p go code works with symmetric nat since `codespaces` showed *address & port dependent mapping* on using `stunclient`.

Yup, I was right :)

![[stun terms-20231130135613770.webp|680]]
^bf75bd

Wow, well there you have it, simple and to the point. No detective work needed. Just use STUN (`stunclient` works VERY good for this cuz it gives you exactly these configurations) and depending on the configuration, apply the apt strategy. And you just know when TURN is needed. No guess work.  

Last 3 images are from [here](https://www.netmanias.com/en/post/techdocs/6062/nat-network-protocol/nat-behavioral-requirements-as-defined-by-the-ietf-rfc-4787-part-2-filtering-behavior) (SUCH a good resource!!).

---
# Hairpinning

![[stun terms-20231130141638387.webp]]

Interesting! So does that mean that those under the same ISP can communicate well but those under different ISP have to use a TURN server meaning the ISP can block/severely rate limit that centralised TURN server? 🤔 
