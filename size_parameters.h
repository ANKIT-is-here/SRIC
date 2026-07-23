#ifndef SIZEPARAMETERS_H
#define SIZEPARAMETERS_H

extern int N_keywords;
extern int N_max_ids;
extern int N_row_ids;
extern int BF_length;

#define N_HASH 1                            //Equal to N_Threads     (Also change in BloomFilter.h)
#define MAX_BF_BIN_SIZE 8388608              //2^23 bits              (Also change in BloomFilter.h)
#define N_BF_BITS 23                         //log2(MAX_BF_BIN_SIZE) = number of bits for BF index


#endif // SIZEPARAMETERS_H
