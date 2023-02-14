ryuzu
=====

## Development

Install dependencies:

```bash
$ pnpm install
```

Build TypeScript files:

```bash
$ pnpm run build
```

## Deploy to GAS

1. Set up your own Google Apps Script environment.
2. Put `.clasp.json` file in root of this repository (it would be ignored from VCS).
3. Build the package (see above for commands).
4. Run `pnpm clasp push`.
