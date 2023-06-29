
* install postgress

docker run --name my-postgres -p 54322:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres

docker exec -it my-postgres psql -U postgres -c "CREATE DATABASE homefinance"
