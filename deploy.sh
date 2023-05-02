# update packages
npm i
# rebuild build client and api server
npm run build:api
npm run build:client
# restart api server
pm2 restart server/dist/index.js
# restart server
sudo systemctl restart nginx
sudo systemctl restart redis-server
