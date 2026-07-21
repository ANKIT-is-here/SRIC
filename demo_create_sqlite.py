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
NAMES = [f"Employee_{j}" for j in range(1, 801)]  # 800 unique names, ensuring some duplicate names across 1000 rows


def create_database():
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    # Table 1: employees
    cur.execute("""
        CREATE TABLE employees (
            employee_id INTEGER PRIMARY KEY,
            name TEXT,
            dept TEXT,
            city TEXT,
            level TEXT,
            country TEXT,
            exp INTEGER
        )
    """)

    # Table 2: employee2
    cur.execute("""
        CREATE TABLE employee2 (
            employee_id INTEGER PRIMARY KEY,
            name TEXT,
            employee_father_name TEXT,
            employee_mother_name TEXT,
            blood_group TEXT
        )
    """)

    # Step 1: Generate random base data
    rows1 = []
    rows2 = []
    for i in range(1, TOTAL_ROWS + 1):
        emp_name = random.choice(NAMES)
        rows1.append({
            "employee_id": i,
            "name": emp_name,
            "dept": random.choice(DEPTS),
            "city": random.choice(CITIES),
            "level": random.choice(LEVELS),
            "country": random.choice(COUNTRIES),
            "exp": random.choice(EXPERIENCE),
        })
        rows2.append({
            "employee_id": i,
            "name": emp_name,
            "employee_father_name": f"Father_{i}",
            "employee_mother_name": f"Mother_{i}",
            "blood_group": random.choice(["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"]),
        })

    # Step 2: Apply constraints (configurable) to rows1
    def apply_constraint(count, updater):
        selected = random.sample(range(TOTAL_ROWS), count)
        for idx in selected:
            updater(rows1[idx])

    apply_constraint(CONFIG["engineering_newyork"],
        lambda r: r.update({"dept": "Engineering", "city": "New York"}))

    apply_constraint(CONFIG["engineering_senior"],
        lambda r: r.update({"dept": "Engineering", "level": "Senior"}))

    apply_constraint(CONFIG["engineering_exp_10"],
        lambda r: r.update({"dept": "Engineering", "exp": 10}))

    apply_constraint(CONFIG["engineering_usa"],
        lambda r: r.update({"dept": "Engineering", "country": "USA"}))

    # Step 3: Insert into tables
    cur.executemany("""
        INSERT INTO employees (employee_id, name, dept, city, level, country, exp)
        VALUES (:employee_id, :name, :dept, :city, :level, :country, :exp)
    """, rows1)

    cur.executemany("""
        INSERT INTO employee2 (employee_id, name, employee_father_name, employee_mother_name, blood_group)
        VALUES (:employee_id, :name, :employee_father_name, :employee_mother_name, :blood_group)
    """, rows2)

    conn.commit()
    conn.close()


if __name__ == "__main__":
    create_database()