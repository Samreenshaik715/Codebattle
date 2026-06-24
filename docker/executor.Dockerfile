FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    python3 \
    default-jdk \
    g++ \
    nodejs \
    npm \
    coreutils \
    procps \
    ca-certificates \
  && rm -rf /var/lib/apt/lists/*

RUN ln -sf /usr/bin/python3 /usr/bin/python

WORKDIR /workspace

CMD ["sh"]
