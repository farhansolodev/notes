SCTP, RTP, QUIC streams vs KCP, all implement some class of **forward error correction** (FEC) for packet recovery in userland over UDP. Means no kernel tweaking. 

# questions

- What about UDT?
- Is RTP better or worse than SCTP?