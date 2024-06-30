---
tags:
---

Running this with a different pathname changes the bash script to have that name instead of `example-app`:
`curl -s https://laravel.build/example-app | bash`
...pretty cool, and very beginner friendly. Try running it with different paths in the browser.

---
 TIL about [**Bash Completions**](https://getcomposer.org/doc/03-cli.md#bash-completions)

*Example:*
To install bash completions you can run `composer completion bash > completion.bash`. This will create a `completion.bash` file in the current directory.
Then execute `source completion.bash` to enable it in the current terminal session.
Move and rename the `completion.bash` file to `/etc/bash_completion.d/composer` to make it load automatically in new terminals.

---
