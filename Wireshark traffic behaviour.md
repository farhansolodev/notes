**Any subnet, same VLAN Switch:**
If IP addresses are in the same or different subnets on the same VLAN switch:
- Gratuitous ARP is sent to every machine.
- During a ping, "Who Has?" and "Is At" ARP messages are observed.

**Any subnet, diff VLAN Switch:**
If IP addresses are in the same or different subnets on different VLAN switches:
- No specific activities are noted during an IP to the same/different subnet or ping.

**Any subnet Hub:**
If IP addresses are in the same or different subnets on a hub:
- Gratuitous ARP is sent to every machine.
- During a ping, "Who Has?" and "Is At" ARP messages are observed, along with ICMP traffic between other machines.
