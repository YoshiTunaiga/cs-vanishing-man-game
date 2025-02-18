export const dbaKeyTerms = {
  "database model":
    "A conceptual framework for database systems, consisting of data structures, operations, and rules that govern data.",
  "data structures": "Prescribe how data is organized within a database model.",
  operations:
    "Define how data structures can be manipulated within a database model.",
  rules: "Govern the validity and integrity of data within a database model.",
  "relational model":
    "A database model based on a tabular data structure, introduced by E. F. Codd in 1970 and standardized in SQL.",
  SQL: "A universal query language used to manage and manipulate relational databases.",
  "hierarchical database":
    "A database model that organizes data in a tree-like structure, optimized for performance in early computing.",
  "network database":
    "A database model that represents relationships using graph-like structures, commonly used before relational databases became dominant.",
  "big data":
    "Characterized by unprecedented data volumes and rapidly changing data structures, emerging with the rise of the internet in the 1990s.",
  set: "An unordered collection of elements enclosed in braces, such as {a, b, c}.",
  tuple:
    "An ordered collection of elements enclosed in parentheses, such as (a, b, c).",
  table:
    "A structure in a relational database that has a name, a fixed tuple of columns, and a varying set of rows.",
  column: "A named structure within a table that has a specific data type.",
  row: "An unnamed tuple of values within a table, where each value corresponds to a column.",
  "data type": "A named set of values from which column values are drawn.",
  "relational algebra":
    "A theoretical foundation of SQL, consisting of operations that generate result tables from input tables.",
  select: "A relational operation that selects a subset of rows from a table.",
  project:
    "A relational operation that eliminates one or more columns from a table.",
  product:
    "A relational operation that lists all combinations of rows from two tables.",
  join: "A relational operation that combines two tables by comparing related columns.",
  union: "A relational operation that selects all rows from two tables.",
  intersect: "A relational operation that selects rows common to two tables.",
  difference:
    "A relational operation that selects rows appearing in one table but not another.",
  rename: "A relational operation that changes a table name.",
  aggregate:
    "A relational operation that computes functions over multiple table rows, such as sum and count.",
  "relational rules":
    "Logical constraints that ensure data validity in a relational database.",
  "unique primary key":
    "A rule stating that all tables must have a primary key column, or group of columns, in which values may not repeat.",
  "unique column names":
    "A rule ensuring that different columns in the same table have distinct names.",
  "no duplicate rows":
    "A rule preventing two rows in the same table from having identical values in all columns.",
  "business rules":
    "Database-specific constraints based on business policies, such as requiring valid department codes in an Employee table.",
  constraints:
    "SQL rules enforced by the database system to maintain data integrity.",
};
