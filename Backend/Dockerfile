# Use an official Python runtime as a parent image
FROM python:3.11

ARG CACHEBUST=1

# Set the working directory to /app
WORKDIR /app

COPY requirements.txt ./


# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt


# Expose the port that FastAPI will run on
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "src.app.main:app", "--host", "0.0.0.0", "--port", "8000"]


