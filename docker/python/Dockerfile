FROM python:3.7

# EXPOSE 8888

# RUN mkdir -p /usr/src/app

# WORKDIR /usr/src/app

RUN python -m pip install --upgrade pip

RUN pip install tornado

RUN python -m pip install pymongo



ENTRYPOINT ["python3", "app.py"]