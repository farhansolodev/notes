> Before saying anything its important to note that we're **probably** just talking about potential max rates. My assumption is that an OS/HDD may or may not choose to use the full bandwidth to read/write data. Obviously using the full bandwidth is faster for a single operation but on a multitasking system I am assuming that isn't the most efficient approach.

TIL the HDD data transfer rate advertised is very usually just the external rate, i.e: buffer/cache-to-computer. This may or may not be higher than SATA II (3Gb/s) or SATA III (6Gb/s) speeds (300MB/s & 600MB/s respectively due to 8b/10b encoding) but whats important to note is that the internal (disk-to-buffer/cache) speeds are rarely advertised since they are much slower[^2] (200MB/s on SATA II & 200-350MB/s on SATA III depending on the drive[^1]). 

This can ofcourse be tested using *random reads*[^2] as it will make it much more difficult for modern consumer HDDs to offer up cached data[^3] and will presumably lead to alot of cache misses as opposed to when reading data in a more predictable fashion (temporally local, physically local etc). 

I assume you could also read large continuous files (typical for movies etc) or write large files (e.g. isos) to remove inflated performance from caching during tests since both techniques limit the data transfer speed to the actual RPM of the spindles.

General consumers really should just get an SSD. Spindles can't even keep up with SATA II and it will only get better and further out of reach of consumer grade spindle disks.

[^1]: Not sure why the internal speed varies with the interface
[^2]: https://superuser.com/a/453243
[^3]: How does an HDD actually decide this? Does it store a hash of each block for faster parity checks?
