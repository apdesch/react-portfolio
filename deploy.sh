# update packages
npm i
# rebuild build client and api server
npm run build-server
npm run build-client
# restart api server
pm2 restart apdesch-api
# restart server
systemctl restart nginx
systemctl restart redis-server
