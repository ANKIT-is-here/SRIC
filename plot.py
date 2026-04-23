import matplotlib.pyplot as plt

# Data
results = [978, 443, 61]
time = [1623346, 1252214, 1357750]

# Sort data by X (important for proper line plotting)
sorted_data = sorted(zip(results, time))
results_sorted, time_sorted = zip(*sorted_data)

# Create plot
plt.figure(figsize=(8, 5))

plt.plot(results_sorted, time_sorted, marker='o', linewidth=2)

# Labels and title
plt.xlabel("Number of Results", fontsize=12)
plt.ylabel("Time (us)", fontsize=12)
plt.title("Query Performance: Results vs Time", fontsize=14)

# Grid for professional look
plt.grid(True, linestyle='--', alpha=0.6)

# Annotate each point
for x, y in zip(results_sorted, time_sorted):
    plt.text(x, y, f"({x}, {y})", fontsize=9, ha='right')

# Tight layout
plt.tight_layout()

# Save figure (optional)
plt.savefig("results_vs_time.png", dpi=300)

# Show plot
plt.show()