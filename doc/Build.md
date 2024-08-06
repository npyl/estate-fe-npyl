# Build Issues, Fixes, Workarounds

[canvas](https://github.com/Automattic/node-canvas) and [path2d-polyfill](https://www.npmjs.com/package/path2d-polyfill) are optional packages from [pdfjs-dist](https://www.npmjs.com/package/pdfjs-dist) that cause vm to crash.

We do not require them (they are only required for Node.JS environment) so we run yarn with `--ignore-optional` and have setup `overrides` on `package.json`:

```
"overrides": {
    "canvas": "empty-npm-package@1.0.0",
    "path2d-polyfill": "empty-npm-package@1.0.0"
},
```
