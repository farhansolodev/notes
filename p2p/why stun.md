[[udp hole punching demo|This demo]] involved talking to a Replit server from my home network. A single peer on each network was able to send packets to the other peer targeting an external port that **MATCHED** the internal port number used by the other peer to create their hole.

If the ports did *not* match, then it would be a case of port preservation, where the external source ports are assigned based on some policy rather than forwarding the internal source port verbatim. So we can assume that neither networks on either side had PAT enabled.

Now, this setup would have *theoretically* worked with symmetric NAT on either side (for receiving packets, obviously), and if that’s true then it would have worked on any NAT configuration. As for this setup, after mucking about in replit I found that hitting my external source ip:port from an unknown IP fails, so my router atleast does not support Full Clone NAT.

>What is symmetric NAT? (retrospectively, it is [[stun terms#^bf75bd|this]]) Well in simple terms it is a stricter NAT table query that checks whether the incoming packet's source and destination ip:port match the destination and external source ip:port respectively, of any **ONE** entry in the IP table. It's *symmetric* because the source and destination are checked for a single entry, as opposed to some other NAT types where the source and destination may also be checked but they don't necessarily have to be part of the same entry. 
>
>Since the external and internal ports (probably) match in this setup, as well as the fact that the holes are targeted directly at the peer that wants to do p2p comms with us, it *theoretically* works under symmetric NAT conditions.

## What if ports were **not** preserved on a router?
🤷‍♂️ %% I can think up of an answer but its 4am on a Thursday so I will write this part when I can %%

# Resources:

- NAT Vendor Terminologies vs RFC 3489 Terminologies
  https://learningnetwork.cisco.com/s/question/0D56e0000CWxJ9sCQF/lets-explain-in-details-full-cone-nat-restricted-cone-nat-and-symmetric-nat-terminologies-vs-cisco-nat-terminologies