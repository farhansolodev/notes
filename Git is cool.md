Today I used `git rebase -i` (for moving & squashing), `git restore --stage <file/directory>` or `git reset <file/directory>` (for unstaging), `git add -p <file/directory>` (for patch adding), `git remote set-url --push origin <url>` & `git branch --set-upstream-to origin/main` (in combination with `gh repo fork` within a cloned dir for changing upstream to a forked repo)

All this along with `git worktree` and damn, pretty great software...

---
[This SO answer about why commits are duplicated after a rebase](https://stackoverflow.com/questions/9264314/git-commits-are-duplicated-in-the-same-branch-after-doing-a-rebase)is a goldmine.
**TLDR:**
If rebasing after you've already pushed changes and trying to push again, git will say something like this:
```
To git@bitbucket.org:username/test1.git
 ! [rejected]        dev -> dev (non-fast-forward)
error: failed to push some refs to 'git@bitbucket.org:username/test1.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```
Basically when you `git rebase`, git will rehash every commit since the oldest one that was edited. This means that the commits you have locally - while they are the same as the ones on the server - have different hashes so git now considers those commits on the server as incoming changes so it asks you to `git pull` when you try to `git push`. This would however pollute your local commit tree with "duplicate" commits whose only difference is their hashes. So instead of listening to git and running `git pull`, run `git push --force` instead to overwrite the commits on the server with the ones you have locally.

If however you've already made the mistake of running `git pull`, you can `git reflog` to get the SHA of the commit before the pull and then just `git reset --hard <commit-sha>` to that commit, and _then_ run `git push --force`.

**WARNING: `git reset --hard` works like `git restore` in that [unlike other reset modes](https://stackoverflow.com/questions/24568936/what-is-difference-between-git-reset-hard-head1-and-git-reset-soft-head), file changes in your working tree WILL be lost.**

In terms of "losing" commits in your commit history after the reset point, you can always use `git reflog` to either `git reset` [back to the future](https://philna.sh/blog/2017/01/04/git-back-to-the-future/) (thank GOD this exists) if you're on the same branch, or `git cherry-pick` if you're on a different branch.

- [ ] Read more about `git push --force-with-lease` and what to run before it (`git fetch`? `git pull --rebase`? something else?)

---
Another gem on SO [explaining the following image:](https://stackoverflow.com/questions/1587846/how-do-i-show-the-changes-which-have-been-staged/1587952#1587952)

![[git is cool-20231214014817810.webp|458]]

Basically: `git diff HEAD`=`git diff`+`git diff --cached`

---
Useful article on [how to fix git mistakes](https://ohshitgit.com)

\^Both this article and another one on Atlassian urge to not **rebase public history**, so I guess this is a common rule to follow.