---
tags:
---

```lua ti:"lapis html templating"
lapis = require "lapis"

class extends lapis.Application
  -- Define a basic pattern that matches /
  "/": =>
    profile_url = @url_for "profile", name: "leafo"
    -- Use HTML builder syntax helper to quickly and safely write markup
    @html ->
      h2 "Welcome!"
      text "Go to my "
      a href: profile_url, "profile"

  -- Define a named route pattern with a variable called name
  [profile: "/:name"]: =>
    @html ->
      div class: "profile", ->
        text "Welcome to the profile of ", @params.name
```

![[vulkan pipeline.webp|457]]

- [ ] Look up:
	- how data is added to objects after already allocating them, like in JS or even in C