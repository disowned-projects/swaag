# swaag 😎

> Swagger UI server

When documentating APIs in swagger, using the online editor can cause troubles if we try to split documentation in multiple files. <br>`swaag` helps to easily host swagger-ui locally.<br>

Note that it hosts `swagger-ui`, not `swagger-editor`. You must edit the swagger files on your local editor.

To use the CLI, see [swaag-cli](https://github.com/doshisid/swaag-cli).

## Install

```
$ npm install swaag
```

## Usage

```js
const swaag = require("swaag");

swaag({
  entryPoint: "./docs",
  watch: true
});
```

## API

### swaag([options])

#### options.entryPoint

Type: `string`<br>
Default: `docs/openapi.yaml` in current directory

#### options.port

Type: `string`<br>
Default: `3000`

#### options.watch

Watches the directory of entryPoint

Type: `boolean`<br>
Default: `false`

## License

MIT © [Sid Doshi](https://sid.sh)
