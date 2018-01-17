# viron-doc

## How to Develop

```
$ cd website
$ npm install
$ npm run start
```

then access to [here]( http://localhost:3000).

## How to Add Documents

1. Add new `.md` files in `./docs/` directory.
2. Edit `website/sidebars.json` file.

## How to Publish

```
$ cd website
$ GIT_USER=<GIT_USER> USE_SSH=true npm run publish-gh-pages
```

`GIT_USER`: The username for a GitHub account that has commit access to this repo.
