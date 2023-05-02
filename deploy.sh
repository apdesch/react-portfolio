npm i
# rebuild build client and api server
npm run build:api
npm run build:client
# restart api server
pm2 restart dist/index.js
# restart server
systemctl restart nginx
systemctl restart redis-server
