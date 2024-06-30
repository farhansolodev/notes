---
tags:
---

[Decent article](https://berthub.eu/articles/posts/reed-solomon-for-programmers/) on Reed-Solomon fec:

interesting take:
>The odds of an error cropping up in RAM is quite low. It can happen in unused parts of RAM or in transient data that's about to be written over anyway, which makes the impacts of these errors even more minor. However, when left on for a long time, the errors can begin to stack. The first error might not cause much issue, maybe the second won't either, nor the third, fourth, fifth, etc. But eventually, if enough errors occur and aren't corrected, something will go wrong. A reboot that totally clears the RAM will correct all the errors by its nature.