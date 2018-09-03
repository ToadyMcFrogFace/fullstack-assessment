FROM python:3.7

EXPOSE 5000

RUN python -m pip install pymongo

RUN pip install flask 

RUN pip install flask-cors

ENTRYPOINT ["python", "app.py"]