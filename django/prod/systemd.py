import subprocess

SYSTEMD_CONF_TEMPLATE = """
[Unit]
Description="ASAP Sports web application"
After=network.target

[Service]
User=%(project_name)s
Group=webapps
WorkingDirectory=/webapps/%(project_name)s/ASAP-Sports/django
Environment=LANG=en_US.UTF-8,LC_ALL=en_US.UTF-8
ExecStart=/webapps/%(project_name)s/%(project_name)s/bin/gunicorn \
            --access-logfile /webapps/%(project_name)s/ASAP-Sports/django/prod/logs/gunicorn_access.log \
            --error-logfile /webapps/%(project_name)s/ASAP-Sports/django/prod/logs/gunicorn_error.log \
            --workers 3 \
            --bind unix:/webapps/%(project_name)s/ASAP-Sports/django/prod/run/gunicorn.sock asapsports.wsgi:application

[Install]
WantedBy=multi-user.target
"""

SYSTEMD_SERVICE_ROOT = '/etc/systemd/system'

def create_conf_file(project_name):
    with open(f'{SYSTEMD_SERVICE_ROOT}/{project_name}.service', 'w') as f:
        f.write(SYSTEMD_CONF_TEMPLATE % locals())
    subprocess.call(['systemctl', 'start', f'{project_name}'])
