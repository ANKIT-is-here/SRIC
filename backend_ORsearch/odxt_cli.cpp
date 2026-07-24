// odxt_cli.cpp
// -----------------------------------------------------------------------------
// Bridges odxt_main_single_thread.{h,cpp} into the FastAPI main.py contract
// (see main.py's run_binary()/SETUP_BINARY/SEARCH_BINARY and the frontend's
// sseSearch() stdout parsing: "Searching for", "N IDs TSet:", "Nmatch:",
// "Search time = ... micro-seconds").
// -----------------------------------------------------------------------------

#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <string>
#include <unordered_set>
#include <chrono>
#include <filesystem>
#include <cstdlib>

#include "odxt_main_single_thread.h"

using namespace std;

#define TIME_MARKER() chrono::high_resolution_clock::now()
#define TIME_ELAPSED(a, b) chrono::duration_cast<chrono::microseconds>(b - a).count()

// Declared/defined in main_single_thread.cpp / odxt_main_single_thread.h
extern string widxdb_file;
extern std::map<std::string, unsigned int> update_count;
extern MKW_Converter *mdb;
extern string subdir_name;
int ODXT_SetUp_Top();

static const string CONFIG_FILE       = "odxt_config.txt";
static const string UPDATE_COUNT_FILE = "update_count.csv";
static const string DB_DAT_PATH       = "db6k.dat";

static void write_config(int bucketSize, int isOptimized) {
    ofstream f(CONFIG_FILE);
    f << bucketSize << "," << isOptimized << "\n";
}

static bool read_config(int &bucketSize, int &isOptimized) {
    ifstream f(CONFIG_FILE);
    if (!f.good()) return false;
    string line;
    getline(f, line);
    auto comma = line.find(',');
    if (comma == string::npos) return false;
    bucketSize  = stoi(line.substr(0, comma));
    isOptimized = stoi(line.substr(comma + 1));
    return true;
}

static void build_updates_file(const string &dat_path, const string &out_path) {
    ifstream in(dat_path);
    ofstream out(out_path);
    string line;
    while (getline(in, line)) {
        if (line.empty()) continue;
        vector<string> cols;
        size_t start = 0, comma;
        while ((comma = line.find(',', start)) != string::npos) {
            cols.push_back(line.substr(start, comma - start));
            start = comma + 1;
        }
        cols.push_back(line.substr(start));
        if (cols.size() < 2) continue;
        const string &word_id = cols[0];
        for (size_t i = 1; i < cols.size(); i++) {
            out << word_id << "," << cols[i] << "\n";
        }
    }
}

static int run_setup() {
    int bucketSize  = getenv("ODXT_BUCKET_SIZE") ? stoi(getenv("ODXT_BUCKET_SIZE")) : 5;
    int isOptimized = getenv("ODXT_OPTIMIZED")   ? stoi(getenv("ODXT_OPTIMIZED"))   : 1;

    subdir_name = "live";
    filesystem::create_directories("./test_vectors/" + subdir_name);
    filesystem::create_directories("./results/" + subdir_name);

    if (filesystem::exists(UPDATE_COUNT_FILE)) filesystem::remove(UPDATE_COUNT_FILE);
    update_count.clear();

    if (!filesystem::exists(DB_DAT_PATH)) {
        cerr << "Missing " << DB_DAT_PATH << endl;
        return 1;
    }
    build_updates_file(DB_DAT_PATH, widxdb_file);

    mdb = new MKW_Converter(bucketSize, isOptimized);

    auto t0 = TIME_MARKER();
    int rc  = ODXT_SetUp_Top();
    auto t1 = TIME_MARKER();

    write_config(bucketSize, isOptimized);

    cout << "Setup complete" << endl;
    cout << "Entries indexed: " << update_count.size() << endl;
    cout << "Setup time = " << TIME_ELAPSED(t0, t1) << " micro-seconds" << endl;
    return rc;
}

static int run_search(const vector<string> &word_ids) {
    int bucketSize, isOptimized;
    if (!read_config(bucketSize, isOptimized)) {
        cerr << "No setup found - upload files first" << endl;
        return 1;
    }
    if (!filesystem::exists(UPDATE_COUNT_FILE)) {
        cerr << "No " << UPDATE_COUNT_FILE << " found - upload files first" << endl;
        return 1;
    }

    Redis_Init();
    update_count.clear();
    {
        ifstream f(UPDATE_COUNT_FILE);
        string line;
        while (getline(f, line)) {
            auto comma = line.find(',');
            if (comma == string::npos) continue;
            update_count[line.substr(0, comma)] = stoi(line.substr(comma + 1));
        }
    }

    mdb = new MKW_Converter(bucketSize, isOptimized);

    cout << "Searching for  ";
    for (auto &w : word_ids) cout << w << " ";
    cout << endl;

    vector<int> query_line;
    for (auto &w : word_ids) query_line.push_back(strToInt(w));

    auto t0 = TIME_MARKER();
    auto buckets = mdb->bucketize_query(query_line);

    unordered_set<string> res;
    int ntset = 0;
    for (size_t i = 0; i < buckets.size(); i++) {
        auto mkws = mdb->convert_query(buckets[i]);
        if (mkws.empty()) continue;

        pair<int, int> sterm = {(int)update_count[intToStr(mkws[0])], 0};
        for (size_t j = 1; j < mkws.size(); j++) {
            int cnt = (int)update_count[intToStr(mkws[j])];
            if (cnt < sterm.first) sterm = {cnt, (int)j};
        }
        swap(mkws[0], mkws[sterm.second]);

        vector<string> mkw_str;
        for (auto mkw : mkws) mkw_str.push_back(intToStr(mkw));

        unordered_set<string> bucket_res;
        ODXT_Search(&bucket_res, mkw_str, sterm.first);
        res.insert(bucket_res.begin(), bucket_res.end());
        ntset++;
    }
    auto t1 = TIME_MARKER();

    cout << "N IDs TSet: " << ntset << endl;
    cout << "Nmatch: " << res.size() << endl;
    cout << "Search time = " << TIME_ELAPSED(t0, t1) << " micro-seconds" << endl;
    return 0;
}

int main(int argc, char **argv) {
    if (argc == 1) return run_setup();
    vector<string> word_ids(argv + 1, argv + argc);
    return run_search(word_ids);
}
