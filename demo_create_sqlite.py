import sqlite3
import os
import random

DB_PATH = "demo.db"
TOTAL_ROWS = 1000

CONFIG = {
    "engineering_newyork": 5,
    "engineering_senior": 50,
    "engineering_exp_10": 200,
    "engineering_usa": 400,
}

DEPTS = ["Engineering", "Marketing", "HR", "Sales"]
CITIES = ["New York", "San Francisco", "Chicago", "Austin"]
LEVELS = ["Junior", "Mid", "Senior"]
COUNTRIES = ["USA", "India", "UK"]
EXPERIENCE = list(range(1, 21))


def create_database():
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    # Single table with all columns
    cur.execute("""
        CREATE TABLE employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            dept TEXT,
            city TEXT,
            level TEXT,
            country TEXT,
            exp INTEGER
        )
    """)

    # Step 1: Generate random base data
    rows = []
    for i in range(TOTAL_ROWS):
        rows.append({
            "name": f"Employee_{i}",
            "dept": random.choice(DEPTS),
            "city": random.choice(CITIES),
            "level": random.choice(LEVELS),
            "country": random.choice(COUNTRIES),
            "exp": random.choice(EXPERIENCE),
        })

    # Step 2: Apply constraints (configurable)
    def apply_constraint(count, updater):
        selected = random.sample(range(TOTAL_ROWS), count)
        for i in selected:
            updater(rows[i])

    apply_constraint(CONFIG["engineering_newyork"],
        lambda r: r.update({"dept": "Engineering", "city": "New York"}))

    apply_constraint(CONFIG["engineering_senior"],
        lambda r: r.update({"dept": "Engineering", "level": "Senior"}))

    apply_constraint(CONFIG["engineering_exp_10"],
        lambda r: r.update({"dept": "Engineering", "exp": 10}))

    apply_constraint(CONFIG["engineering_usa"],
        lambda r: r.update({"dept": "Engineering", "country": "USA"}))

    # Step 3: Insert into table
    cur.executemany("""
        INSERT INTO employees (name, dept, city, level, country, exp)
        VALUES (:name, :dept, :city, :level, :country, :exp)
    """, rows)

    conn.commit()
    conn.close()

    # print("✅ Single table created with 4000 rows")


if __name__ == "__main__":
    create_database()