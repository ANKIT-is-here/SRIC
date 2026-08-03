CC = g++
LD = g++

# Compilation flags — cloud-safe: SSE2 only, no AVX2/AVX512/SSE4.1
# BLAKE3_NO_SSE41, BLAKE3_NO_AVX2, BLAKE3_NO_AVX512 disable SIMD variants
# that require CPU features not available on all cloud build machines.
CFLAGS = -I. -I./blake3/ -w -O2 -std=c++17 -msse2 -fpermissive -fopenmp \
         -DBLAKE3_NO_SSE41 -DBLAKE3_NO_AVX2 -DBLAKE3_NO_AVX512

# Linker flags
LDFLAGS = -lcryptopp -lpthread -lgmpxx -lssl -lhiredis -lredis++ -lcrypto -lntl -lgmp -lm -lrt -lgomp

# Only include portable + SSE2 blake3 sources (SSE41 and AVX2 are disabled)
BLAKE3_SRCS = ./blake3/blake_hash.cpp ./blake3/blake3.c ./blake3/blake3_dispatch.c ./blake3/blake3_portable.c ./blake3/blake3_sse2.c

# Targets
ntru-oqxt-setup: rawdatautil.cpp bloom_filter.cpp AES_256GCM.c \
  ./falcon-round3/Extra/c/shake.c ./falcon-round3/Extra/c/common.c \
  ./falcon-round3/Extra/c/keygen.c ./falcon-round3/Extra/c/fft.c \
  ./falcon-round3/Extra/c/fpr.c ./falcon-round3/Extra/c/vrfy.c \
  ./falcon-round3/Extra/c/codec.c ./falcon-round3/Extra/c/sign.c \
  ./falcon-round3/Extra/c/rng.c $(BLAKE3_SRCS) ntru-oqxt-setup.cpp
	$(CC) $(CFLAGS) -o ntru-oqxt-setup $^ $(LDFLAGS)

ntru-oqxt-search: rawdatautil.cpp bloom_filter.cpp AES_256GCM.c \
  ./falcon-round3/Extra/c/shake.c ./falcon-round3/Extra/c/common.c \
  ./falcon-round3/Extra/c/keygen.c ./falcon-round3/Extra/c/fft.c \
  ./falcon-round3/Extra/c/fpr.c ./falcon-round3/Extra/c/vrfy.c \
  ./falcon-round3/Extra/c/codec.c ./falcon-round3/Extra/c/sign.c \
  ./falcon-round3/Extra/c/rng.c $(BLAKE3_SRCS) ntru-oqxt-search.cpp
	$(CC) $(CFLAGS) -o ntru-oqxt-search $^ $(LDFLAGS)

clean_all:
	rm -rf *.o setup *.gch oqxt_falcon_setup oqxt_falcon_search EDB_test.csv bloom_filter.dat ntru-oqxt-setup ntru-oqxt-search
	@redis-cli flushall
	@redis-cli save
