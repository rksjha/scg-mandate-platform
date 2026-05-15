FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY google-apps-script-webhook.js /usr/share/nginx/html/google-apps-script-webhook.js
EXPOSE 80
