% prepara el repositorio para su despliegue. 
release: sh -c 'cd decide && python manage.py collectstatic --noinput && python manage.py migrate && python manage.py flush --no-input && python manage.py loaddata db.json'
% especifica el comando para lanzar Decide
web: sh -c 'cd decide && gunicorn decide.wsgi --log-file -'
