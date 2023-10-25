docker pull node

# build image (when you build images, you build it from the base image in the dockerfile specifies)
docker build -t myapp .

# create an instance and detach from the image, mapping local port 4000 to the port 4000 that is exposed by the container. 
docker run --name myapp_c1 -p 4000:4000 -d myapp

docker stop myapp_c1

# start an existing container
docker start myapp_c1



# make a new image again, docker store image in each layer. (layer caching)
docker build -t myapp2 .

docker run --name myapp_c2 -p 4000:4000 -d myapp2



# manage docker image
docker images

# list out all the running containers.
docker ps

# list out all the containers.
docker ps -a

# stop all the containers
docker stop $(docker ps -a -q)

docker image rm myapp2
cannot remove image "myapp2" because it is being used by one or more running containers.

# force remove image
docker image rm myapp2 -f 

# remove container
docker container rm myapp_c2 myapp_c1

# rm all images, all containers and all volumes and all build caches
docker system prune -a
##### or 
docker image rm $(docker images -q)
docker container rm $(docker ps -a -q)
docker volume rm $(docker volume ls -q)

docker images
docker ps -a

# build a new image from scratch
docker build -t myapp:v1 .
docker run --name myapp_c1 -p 4000:4000 -d myapp:v1

# rm the instance and its file system once the instance exits
docker run --name myapp_c1_nodemon -p 4000:4000 --rm myapp:nodemon

# adding volume flag
docker run --name myapp_c1_nodemon -p 4000:4000 --rm -v {absolute_dir_path}:/app -v /app/node_modules myapp:nodemon

# compose gives docker instructions and make all the above easier 
docker-compose up


# delete all the instances, containers and volumes
docker-compose down --rmi all -v