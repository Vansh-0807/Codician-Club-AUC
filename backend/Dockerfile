FROM python:3.13-slim

WORKDIR /app

# Install system dependencies (e.g. default-libmysqlclient-dev for MySQL)
RUN apt-get update && apt-get install -y \
    pkg-config \
    default-libmysqlclient-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy dependencies list
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Expose Django server port
EXPOSE 8000

# Run Django dev server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
