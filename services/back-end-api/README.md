npx typeorm migration:create ./src/database/migrations/Category

npx typeorm-ts-node-esm migration:run -d src/data-source.ts


keypar aws 
ec2_backend

ssh -i "ec2_backend.pem" ubuntu@ec2-34-224-174-41.compute-1.amazonaws.com
ssh -i "ec2_backend.pem" ubuntu@ec2-54-80-242-96.compute-1.amazonaws.com
curl http://0.0.0.0:3001/api