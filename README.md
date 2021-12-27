# Start develop

## Start docker

```
docker run --rm -it --name node-docddker -v $PWD:/home/app -w /home/app -e "NODE_OPTIONS=--openssl-legacy-provider" -p 6006:6006 -u node node:latest /bin/bash
```

or

```
npm run docker
```

## Start watcher

http://localhost:6006/

```
npm start
```

## Build and publish to NPM

```
npm run build
npm publish
```
