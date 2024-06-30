---
tags:
---

I think i get it now

- **MinGW** is a C/C++ compiler suite which allows you to create Windows executables - you only need the normal MSVC runtimes, which are part of any normal Microsoft Windows installation.

- **Git bash** uses **MSYS2** to provide GNU utilities such as `bash`, `make`, `gawk` and `grep` to allow building of applications and programs which depend on traditionally UNIX tools to be present. It is intended to supplement **MinGW** and the deficiencies of the cmd shell.
  >An example would be building a library that uses the `autotools` build system. Users will typically run `./configure.sh` then `make` to build it. The `configure` shell script requires a shell script interpreter which is not present on Windows systems, but *is* provided by **MSYS2**.

- **Cygwin** is an attempt to create a complete UNIX/POSIX environment on Windows. So by design its closer to **WSL1**. Cygwin provides a runtime library called cygwin1.dll that provides the POSIX compatibility layer where necessary. The **MSYS2** variant of this library is called msys-2.0.dll and includes "Automatic path mangling of command line arguments and environment variables to Windows form on the fly" to support using native Windows programs.