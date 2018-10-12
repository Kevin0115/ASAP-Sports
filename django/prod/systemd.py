import subprocess

SYSTEMD_CONF_TEMPLATE = """
[Unit]
Description="ASAP Sports web application"
After=network.target

[Service]
User=asapsports
Group=webapps
WorkingDirectory=/webapps/asapsports/ASAP-Sports/django
Environment=LANG=en_US.UTF-8,LC_ALL=en_US.UTF-8
ExecStart=/webapps/asapsports/asapsports/bin/gunicorn \
            --access-logfile /webapps/asapsports/ASAP-Sports/django/prod/logs/gunicorn_access.log \
            --error-logfile /webapps/asapsports/ASAP-Sports/django/prod/logs/gunicorn_error.log \
            --workers 3 \
            --bind unix:/webapps/asapsports/ASAP-Sports/django/prod/run/gunicorn.sock asapsports.wsgi:application

[Install]
WantedBy=multi-user.target
"""

SYSTEMD_SERVICE_ROOT = '/etc/systemd/system'

def create_conf_file(project_name):
    with open(f'{SYSTEMD_SERVICE_ROOT}/{project_name}.service', 'w') as f:
        f.write(SYSTEMD_CONF_TEMPLATE)
    subprocess.call(['systemctl', 'start', f'{project_name}'])
