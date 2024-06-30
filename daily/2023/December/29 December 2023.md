---
tags:
---

I think I am going to give up trying to host snapdrop. Idk. Maybe another day i'll be more successful but for now i will give it a rest. Few things I learned though:

- You can [apparently](https://lmei88.medium.com/websocket-with-cloudflare-tunnel-reversed-proxy-to-self-hosted-ubuntu-server-95625475c610) tunnel protocols (like `ws:`) only if the tunnel was created from the `cloudflared` cli using some YAML config. They call this a "locally managed tunnel".
- Locally managed tunnels cannot be managed in the web dashboard, they have to be explicitly migrated (there's a whole UI flow for this 😐).

If I do ever get it to work, the way it would have to work is:
```
client --https-> cf --ws-> server
client <-https-- cf <-ws-- server
```

So from the client side it would be entirely http based, no websockets at all: the proxy becomes the websocket client 🤥.

That is...unless cloudflare transparently proxy the websocket requests, making it a stickier proxy holding on to state for longer.

---

As for **winget.pro**, I don't really see its utility unless there are atleast 5-10 packages I would regularly need. On top of that ever since adding my own source to the cli it's been bugging out like crazy 🙃. So yeah, this one is going on hiatus too.