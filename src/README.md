Reproduction repo for a minification issue with `webpack` and `react-router-dom@6.12.1`.

Building/running dev mode works fine:

```
npm ci
npm start
```

But building for production breaks because the `React.startTransition` call
inside of React Router ends up never getting called due to the minification:

```
NODE_ENV=production npm run build
cd dist
npx http-server
```
