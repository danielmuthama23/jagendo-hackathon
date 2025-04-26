FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Install system dependencies for Unstructured
RUN apt-get update && apt-get install -y \
    poppler-utils \
    tesseract-ocr \
    libmagic-dev \
    && rm -rf /var/lib/apt/lists/*

ENV PYTHONPATH=/app
ENV OPENAI_API_KEY=""
ENV HF_HOME="/app/models"

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]