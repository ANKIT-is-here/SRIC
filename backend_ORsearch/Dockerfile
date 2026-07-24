FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    g++ \
    make \
    python3 \
    python3-pip \
    python3-venv \
    redis-server \
    libgmp-dev \
    libgmpxx4ldbl \
    libhiredis-dev \
    libssl-dev \
    pkg-config \
    git \
    wget \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN git clone --depth 1 --branch 1.3.12 https://github.com/sewenew/redis-plus-plus.git /tmp/redis-plus-plus \
    && cd /tmp/redis-plus-plus \
    && mkdir build && cd build \
    && apt-get update && apt-get install -y cmake \
    && cmake -DREDIS_PLUS_PLUS_CXX_STANDARD=17 .. \
    && make -j$(nproc) \
    && make install \
    && ldconfig \
    && rm -rf /tmp/redis-plus-plus

WORKDIR /app

COPY . .

RUN pip3 install --no-cache-dir fastapi uvicorn pydantic PyPDF2

RUN chmod +x entrypoint.sh build.sh 2>/dev/null || true

RUN bash -c ' \
    echo "Attempting AVX-512 build..." && \
    g++ -std=c++17 -O2 -maes -march=native -mavx512f -mavx512vl -fpermissive \
        odxt_cli.cpp aes.cpp rawdatautil.cpp ecc_x25519.cpp \
        ./c/blake_hash.cpp ./c/blake3.c ./c/blake3_dispatch.c ./c/blake3_portable.c \
        ./c/blake3_avx2.c ./c/blake3_avx512.c ./c/blake3_sse2.c ./c/blake3_sse41.c \
        odxt_main_single_thread.cpp utils.cpp main_single_thread.cpp \
        -lgmpxx -lgmp -lredis++ -lhiredis -lpthread -o odxt-cli \
    && echo "AVX-512 build succeeded!" \
    || ( \
        echo "AVX-512 failed, falling back to AVX2..." && \
        g++ -std=c++17 -O2 -maes -march=native -mavx2 -fpermissive \
            odxt_cli.cpp aes.cpp rawdatautil.cpp ecc_x25519.cpp \
            ./c/blake_hash.cpp ./c/blake3.c ./c/blake3_dispatch.c ./c/blake3_portable.c \
            ./c/blake3_avx2.c ./c/blake3_avx512.c ./c/blake3_sse2.c ./c/blake3_sse41.c \
            odxt_main_single_thread.cpp utils.cpp main_single_thread.cpp \
            -lgmpxx -lgmp -lredis++ -lhiredis -lpthread -o odxt-cli \
        && echo "AVX2 build succeeded!" \
        || ( \
            echo "AVX2 failed, falling back to generic x86_64 build..." && \
            g++ -std=c++17 -O2 -maes -fpermissive \
                odxt_cli.cpp aes.cpp rawdatautil.cpp ecc_x25519.cpp \
                ./c/blake_hash.cpp ./c/blake3.c ./c/blake3_dispatch.c ./c/blake3_portable.c \
                ./c/blake3_avx2.c ./c/blake3_avx512.c ./c/blake3_sse2.c ./c/blake3_sse41.c \
                odxt_main_single_thread.cpp utils.cpp main_single_thread.cpp \
                -lgmpxx -lgmp -lredis++ -lhiredis -lpthread -o odxt-cli \
            && echo "Generic build succeeded!" \
        ) \
    )'

EXPOSE 8001

ENTRYPOINT ["./entrypoint.sh"]
