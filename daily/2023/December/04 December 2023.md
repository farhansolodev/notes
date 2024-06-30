---
tags:
---

I think Go might be encouraging users to use pointer receivers, because if you implement an interface `Bar` with `Foo`, you don't get an error if you `var bar Bar = &foo`, but if you implement it with `*Foo`, you _do_ get a compiler error if you `var bar Bar = foo`.

So I guess we're to always use **pointer receivers** to implement interfaces.

---

[Recording debug sessions](https://rr-project.org/) (debugs Go too apparently)