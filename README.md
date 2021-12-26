# Start develop

```
docker run --rm -it --name node-docddker -v $PWD:/home/app -w /home/app -e "NODE_OPTIONS=--openssl-legacy-provider" -p 6006:6006 -u node node:latest /bin/bash
```
