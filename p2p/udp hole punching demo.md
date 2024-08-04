UDP hole punching is better than upnp, nat-pmp and pcp for a few reasons:
- the latter all depend on the gateway supporting either nat-pmp, pcp or the correct version of upnp; udp is ubiquitous
- they all compromise a shared gateway exposing other clients to attack vectors/increasing attack surface 
- because of the above, they are mostly disabled on routers

# Demo

![[2023-11-19 01-19-32.mp4]]

Couldnt figure out how to make the listener on windows print in the same terminal as the talking prompt, so i decided to make listening and talking 2 different functions that you call in 2 different terminals.
And because of that, i couldnt (easily) share the same socket, which meant i had to use 2 diff source ports, meaning i had to punch 2 holes, meaning i had to have 2 scripts on replit

### What did I learn?
- Windows complains if you try to bind a socket to a port that another socket is already bound to.
- But if you try to bind to the same port more than once from the same socket, windows doesn’t complain - could be an idempotent thing where any extra bind attempts are no-ops.
- The stateful part about UDP hole punching isn’t in the STUN servers, but in the gateways themselves. The mapping (hole) isn’t discarded for a short amount of time.
- Signalling servers are stateful too, since it essentially functions as a handshake between two peers for them to share their IPs, but it has nothing to do with the UDP hole punching itself.
- You're supposed to use STUN servers for NAT traversal, but I didn't here. [[why stun|How did that work?]] 

# Resources:

- [[NAT_Traversal.pdf|Large Scale Symmetric NAT Traversal with Two Stage Hole Punching]]