# Height.go 🚀

Height.go is integration tool for [height.app](https://height.app).

## Setup

Height.go is written in TypeScript and uses ESM loader.

1. `git clone git@github.com:pwnlabs/heightgo.git`
2. `npm install`
3. `cp config.json.tpl config.json`
4. `./heightgo tasks/[name]`

## Usage

```
./heightgo tasks/trello config.js
```

## Tasks

### Trello

Migrate all trello cards with comments to [height.app](https://height.app).

```
./heightgo tasks/trello.ts
```
