**clients used:**
- stuntman
- stun-client
- pion/stun
- winstun

| network x application | stuntman | stun-client |                           pion/stun/traversal                           | winstun | direct udp | nature                                                                        |
| --------------------- | :------: | :---------: | :---------------------------------------------------------------------: | ------- | :--------: | ----------------------------------------------------------------------------- |
| replit                |    ❌     |      ❌      | ❌ blocks at `(*net.UDPConn).ReadFromUDP` as it isn't receiving anything | 🚫 dna  |     ✅      |                                                                               |
| codespaces            |    ✅     |      ✅      |                                    ✅                                    | 🚫 dna  |     ❌      |                                                                               |
| windows@home          |  🚫 dna  |   🚫 dna    |                                    ✅                                    | ✅       |     ✅      | port preserved, independant mapping, port dependant filtering, no hairpinning |
| windows@data          |  🚫 dna  |   🚫 dna    |                                                                         | ✅       |     ❌      | random port, independant mapping, port dependant filtering, can hairpin       |
