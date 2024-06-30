---
tags:
---

TIL you can `import . "fmt"` in Go. It's called *"dot imports"* apparently.

---

> Hmm I just realised that I wasn't considering keep-alive messages as part of the traffic that idle timeouts watch for 🤔

While idle timeouts may work to detect inactivity during transmission, it does not account for situations where long idle times during transmission is *expected*. Example: your client might be streaming data from a server *on-demand*, meaning that the data may not be ready when it is requested, causing the client to wait (idly). As a result you are dealing with bursts of traffic with long periods of idle time in between.

Sure, those idle periods are usually never that long, but like Amos said, [if it can happen it does happen](https://fasterthanli.me/articles/i-want-off-mr-golangs-wild-ride#:~:text=if%2Dit%2Dcan%2Dhappen%2Dit%2Ddoes%2Dhappen). So how do you distinguish between waiting for data to be ready and simply waiting for nothing? 

>Well obviously you use keep-alive messages. These would signal to the client that "hey dont leave im a bit slow at getting things ready but im not dead!"

That way you don't even need to track idle timeouts client-side. To put it in code I guess it would look something like:

```js TI:"pseudo code"
host = "datastreamer.com"
tcp.options = {
	dialTimeout: "15s",
	expectKeepAliveEvery: "10s",
}
sock, err = tcp.requestConnection(host) // blocks until timeout, refused or accepted
must(err)

ByteBuffer toBeUsedElseWhere;
data, err = sock.readAll() // just blocks until server closes connection or expectKeepAliveEvery exceeded
if err != nil && err != TCP_CLOSE {
	panic(err) // expectKeepAliveEvery exceeded, toBeUsedElseWhere gets nothing 
}
verifyAndPanicIfIncomplete(data) // maybe a md5 hash check 🤷‍♂️
toBeUsedElseWhere = data
```

Of course in this imaginary scenario this assumes you are able to make the server send keep-alive messages. If that is something out of your control AND the server is taking a long time between bursts of traffic then probably just resort to **long polling**.