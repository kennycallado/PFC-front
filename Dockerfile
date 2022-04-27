## NOTAS
# PRIMERO:
# - compilar angular
# - luego crear imagen
# - último publicar imagen
#
# `cd angular && ng build && cd ..`
# podman build --no-cache --pull --platform linux/arm64 -t kennycallado/sensacion_web:vX-nginx-arm64 .
# podman push --format docker kennycallado/sensacion_web:vX-nginx-arm64

FROM nginx:alpine

COPY . /usr/share/nginx/html
