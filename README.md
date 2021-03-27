# Git Commit Helper

This will be a plug-in for git to allow for a custom interactive commit, which
is useful for teams that want commit messages to adhere to a specific format.
This is originally being written to work with
[changelog-maker](https://github.com/rvagg/changelog-maker).  This project was
inspired by [commitizen](https://github.com/commitizen).

I am not sure who came up with the commit guidelines that the changelog-maker
parses, but I first ran across it on the [Node.js](https://nodejs.org) project.
You can read about there in their
[CONTRIBUTING.md](https://github.com/rvagg/node/blob/master/CONTRIBUTING.md#commit),
which is extremely similar to the one in this repository as well.


### Theoretical Usage

```text
$ git [something-other-than-`commit`]

? Choose a subsystem:
> subsystem-a-defined-in-a-config-file
> subsystem-b
> sybsystem-c
...

? Brief description: (single line)
>

? Detailed description: (multiple lines)
>

? Fixes:
> [list of open github issues on repo]
```

The commit would look like this:

```text
subsytem-b: brief description

Detailed description.

Fixes: #3
Reviewed-By: Your Name <your.email@address.com>
```
