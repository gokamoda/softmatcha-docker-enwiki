FROM ubuntu:24.04

# Add the UV binary to the image
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Set environment variables to avoid interaction during installation
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
apt-get install -y --no-install-recommends \
ca-certificates \
curl \
build-essential \
git \
pkg-config \
python3-icu \
libtbb-dev \
libicu-dev && \
rm -rf /var/lib/apt/lists/*

# Install Node.js (using NodeSource repository for latest LTS)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
apt-get install -y nodejs && \
rm -rf /var/lib/apt/lists/*

RUN df -h
RUN uname
RUN uname -m 

USER ubuntu

WORKDIR /app


RUN uv python install 3.11
RUN uv python pin 3.11

COPY --chown=ubuntu ./scripts /app/scripts
COPY --chown=ubuntu ./src /app/src
COPY --chown=ubuntu ./frontend /app/frontend
COPY --chown=ubuntu ./templates /app/templates
COPY --chown=ubuntu ./pyproject.toml /app/pyproject.toml

# Build React frontend
RUN cd frontend && npm install && npm run build

RUN bash scripts/0_setup_cpu.sh
RUN bash scripts/1_prep.sh
# CMD [".venv/bin/python", "src/run_demo.py"]