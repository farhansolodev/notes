>Stems from [[../Project Ideas|this]] project idea.

Can both pddl *and* dynamic programming be used to solve this?
	What kind of problems do dynamic programming solutions solve and how are they different from pddl?

**Mapping policies**

| id  | NAT vendor term          |
| --- | ------------------------ |
| M1  | Endpoint independant     |
| M2  | Address dependant        |
| M3  | Port & address dependent |

**Filtering policies**

| id  | NAT vendor term          | p2p alias                     |
| --- | ------------------------ | ----------------------------- |
| F1  | Endpoint independent     | Full Clone NAT                |
| F2  | Address dependant        | Address restricted NAT        |
| F3  | -no term found-          | Port & Address Restricted NAT |
| F4  | Port & address dependent | Symmetric NAT                 |

# manual attempt

### M1F4 <-> M3F4

| internal source address | destination address | GW  | external source port |
|:-----------------------:|:-------------------:|:---:|:--------------------:|
|         A:5000          |       B:3000        |     |        A:5001        |


pddl planner for generating p2p strategies given: