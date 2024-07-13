

---
>tags: #cpu #til
>
# p-states & cpu freq scaling
TIL there are ways to do direct CPU frequency scaling from userland in Linux but not in Windows. That is, you can not only set individual cores to operate at certain p-states but you can also adjust the p-states themselves.

Interesting to note (from 2012):
![[2023-12-12-20231212225620904.webp|363]]

Came across [this p-state linux driver](https://github.com/pyamsoft/pstate-frequency)before, pretty nice.

AFAICT, you can adjust voltages and turn off turbo boost from Windows userland but cant directly affect the CPU frequency.

---
>tags: #tcp
>
# tcp window scaling

The TCP mechanism was designed for network bandwidth that’s orders of magnitude slower than what we have today. So some implementations still enforce a maximum window size of 64KB. You can get around this by enabling **TCP windows scaling**, which allows windows of up to 1GB.

Window scaling was introduced in [RFC 1323](https://www.ietf.org/rfc/rfc1323.txt) to solve the problem of TCP windowing on fast, reliable networks. It’s available as an option in any modern TCP implementation. The only question is whether it’s been enabled properly.

In all recent Microsoft Windows implementations, windows scaling is enabled by default. You‘ll find places on the Internet telling you to change registry values to increase your window size, but depending on the Windows version you’re using, these changes will have no effect. The values may no longer even exist. Bottom line, you don’t need to fix TCP windowing in Windows, either on clients or servers.

On Linux systems, you can check that full TCP window scaling is enabled by looking at the value in `/proc/sys/net/ipv4/tcp_window_scaling`.

---
>*Last modified: `=this.file.mtime`*