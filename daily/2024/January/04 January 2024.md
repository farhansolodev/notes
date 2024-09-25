Last modified: *`=this.file.mtime`*

---
tags: #containerization #build-systems 

- docker: chrooted, namespaced (etc) sandbox with sane seccomp defaults (unless you’re on windows, then it’s a type 1 vm using hyper-v)
- ape: compile once run anywhere #bare-metal
- nix: OS (packages, scripts, configs) as config
- nsjail: one place to configure chroot, namespaces, cgroups, seccomp
- firejail: linux namespace & seccomp-bpf sandbox

![[Pasted image 20231114160907.png|350]]
