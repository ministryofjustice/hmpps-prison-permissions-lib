[< Back](../README.md)
---

## Publishing to NPM

There is a Github actions pipeline to publish new releases of sub-packages.
When a new version needs to be released, these steps should be followed as part of the usual pull request process…

1) Make necessary changes, ensuring that tests are up-to-date.
2) Ensure the README.md and CHANGELOG.md files are correct.
3) Update version in package.json.
4) Create pull request and review as usual.
5) Create a tag on the `main` branch for the pull request’s squashed merge commit.
   The tag name should match the version (e.g. '0.0.1-alpha.3'), but automation does not rely on this.
   So run `git fetch --tags` to get all the existing tags, `git tag` to list the tags and, for example, run

 ```shell
 git tag 0.0.1-alpha.3
 git push origin tag 0.0.1-alpha.3
 ```

6) On Github, create a new release from this tag. This kicks off the Github actions pipeline to publish changed packages
   to npmjs.com and as tarball attachments to the release itself.
