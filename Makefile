HOSTNAME=gcr.io
PROJECT_NAME=where2watch-370905
IMAGE_NAME=app

REGION=us-east4

TAG=$(shell git rev-parse --short HEAD)

DOCKER_FILE=${HOSTNAME}/${PROJECT_NAME}/${IMAGE_NAME}:${TAG}

authenticate-docker:
	gcloud auth configure-docker

build-docker:
	docker build -f Dockerfile . -t ${DOCKER_FILE} --platform linux/amd64

publish-docker:
	docker push ${DOCKER_FILE}