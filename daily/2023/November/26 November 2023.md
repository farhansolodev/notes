---
tags:
---

Figured out how to get it to work. Instead of redirecting `jq` directly into the `settings.json`, I redirect it into a temporary `settings1.json` file, delete the original `settings.json` and rename the new one to that.