import os
import subprocess

CONF_TEMPLATE = """
server {
    listen 80;
    server_name %(domain_name)s www.%(domain_name)s;
    
    client_max_body_size 15m;
    
    access_log %(project_root)s/prod/logs/nginx-access.log;
    error_log %(project_root)s/prod/logs/nginx-error.log;

    location = /favicon.ico {access_log off; log_not_found off; }
    location /static/ {
        alias %(static_root)s;
    }

    location / {
        proxy_set_header        Host             $host;
        proxy_set_header        X-Forwarded-Host $server_name;
        proxy_set_header        X-Real-IP        $remote_addr;
        proxy_set_header        X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_pass              http://unix:%(project_root)s/prod/run/gunicorn.sock;
    }

}
"""

# listen 443 ssl; # managed by Certbot
# ssl_certificate /etc/letsencrypt/live/asapsports.com/fullchain.pem; # managed by Certbot
# ssl_certificate_key /etc/letsencrypt/live/asapsports.com/privkey.pem; # managed by Certbot
# include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
# ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


# if ($scheme != "https") {
#     return 301 https://$host$request_uri;
# } # managed by Certbot

NGINX_DIR = '/etc/nginx'

def create_conf_file(domain_name, project_root, project_name, static_root):
    if len(static_root) > 1 and static_root[-1] != '/':
        static_root = static_root + '/'
    conf = CONF_TEMPLATE % locals()
    nginx_conf_filename = f'{NGINX_DIR}/sites-available/{project_name}'
    with open(nginx_conf_filename, 'w')as f:
        f.write(conf)
    if not os.path.exists(f'{NGINX_DIR}/sites-enabled/{project_name}'):
        os.symlink(nginx_conf_filename, f'{NGINX_DIR}/sites-enabled/{project_name}')
    subprocess.call(['sudo', 'service', 'nginx', 'restart'])
