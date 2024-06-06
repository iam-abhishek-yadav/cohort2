# Normalization

Normalization in databases is a systematic approach to decomposing tables to eliminate data redundancy and improve data integrity. The process typically progresses through several normal forms, each building on the last.

### 1NF (First Normal Form)

- A single cell must not hold more than one value (atomicity).
- There must be a primary key for identification.
- No duplicated rows.
- Each column must have only one value for each row in the table.

#### Example:

Consider a table `StudentPhones`:
| StudentID | PhoneNumbers |
| --------- | ---------------- |
| 1 | 1234567890, 9876543210 |
| 2 | 9876543210, 8765432109 |

This violates 1NF because the `PhoneNumbers` column holds multiple values in a single cell. To normalize it to 1NF, we split it into separate rows:

| StudentID | PhoneNumber |
| --------- | ----------- |
| 1         | 1234567890  |
| 1         | 9876543210  |
| 2         | 9876543210  |
| 2         | 8765432109  |

### 2NF (Second Normal Form)

- A table is said to be in 2NF if it meets the following criteria:
  - It is already in 1NF.
  - It has zero partial dependency.

#### Example of Partial Dependency:

Consider a table `Enrollments`:
| StudentID | CourseID | CourseName | InstructorName |
| --------- | -------- | ---------- | -------------- |
| 1 | 101 | Math | Mr. Smith |
| 1 | 102 | Physics | Mr. Johnson |
| 2 | 101 | Math | Mr. Smith |

Here, `CourseName` and `InstructorName` are dependent only on `CourseID`, not on the whole primary key `(StudentID, CourseID)`. To normalize it to 2NF, we split it into two tables:

`Courses`:
| CourseID | CourseName |
| -------- | ---------- |
| 101 | Math |
| 102 | Physics |

`Instructors`:
| CourseID | InstructorName |
| -------- | -------------- |
| 101 | Mr. Smith |
| 102 | Mr. Johnson |

### 3NF (Third Normal Form)

- When a table is in 2NF, it eliminates repeating groups and redundancy, but it does not eliminate transitive partial dependency.
- For a table to be in 3NF, it must:
  - Be in 2NF.
  - Have no transitive partial dependency.

#### Example of Transitive Dependency:

Consider a table `Employees`:
| EmployeeID | DepartmentID | DepartmentName |
| ---------- | ------------ | -------------- |
| 1 | 101 | Finance |
| 2 | 102 | HR |
| 3 | 101 | Finance |

Here, `DepartmentName` depends on `DepartmentID`, not directly on `EmployeeID`. To normalize it to 3NF, we create a separate `Departments` table:

`Departments`:
| DepartmentID | DepartmentName |
| ------------ | -------------- |
| 101 | Finance |
| 102 | HR |
