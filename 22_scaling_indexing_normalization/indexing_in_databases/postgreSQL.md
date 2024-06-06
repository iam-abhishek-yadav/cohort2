# Indexing in Postgres

### Setting up Postgres Locally

- Create a postgres DB locally (don't use neon, we have a lot of data to store, it will be very slow):

  ```bash
  docker run -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres
  ```

- Connect to it and create some dummy data in it:
  ```bash
  docker exec -it container_id /bin/bash
  psql -U postgres
  ```

### Creating Schema

Create the schema for a simple medium-like app:

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255)
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

### Inserting Dummy Data

```sql
DO $$
DECLARE
    returned_user_id INT;
BEGIN
    -- Insert 5 users
    FOR i IN 1..5 LOOP
        INSERT INTO users (email, password, name) VALUES
        ('user'||i||'@example.com', 'pass'||i, 'User '||i)
        RETURNING user_id INTO returned_user_id;

        FOR j IN 1..500000 LOOP
            INSERT INTO posts (user_id, title, description)
            VALUES (returned_user_id, 'Title '||j, 'Description for post '||j);
        END LOOP;
    END LOOP;
END $$;
```

### Analyzing Query Execution Time

Try running a query to get all the posts of a user and log the time it took:

```sql
EXPLAIN ANALYSE SELECT * FROM posts WHERE user_id=1 LIMIT 5;
```

### Adding Index

Focus on the execution time. Add an index to `user_id`:

```sql
CREATE INDEX idx_user_id ON posts (user_id);
```

Notice the execution time now. What do you think happened that caused the query time to go down by so much?

### How Indexing Works (Briefly)

When you create an index on a field, a new data structure (usually B-tree) is created that stores the mapping from the index column to the location of the record in the original table. Search on the index is usually log(n).

The data pointer (in case of postgres) is the page and offset at which this record can be found. Think of the index as the appendix of a book and the location as the page + offset of where this data can be found.

### Complex Indexes

You can have an index on more than one column for more complex queries. For example, "Give me all the posts of a user with a given id with title 'Class 1'." The index needs to have two keys now:

```sql
CREATE INDEX idx_posts_user_id_title ON posts (description, title);
```

Try searching before the index is added and after it is added:

```sql
SELECT * FROM posts WHERE title='title' AND description='my title';
```
