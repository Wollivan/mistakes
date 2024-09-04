# The SQL we did before making the client and server

```sql
CREATE TABLE mistakes (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  maker TEXT,
  blunder TEXT
);

INSERT INTO mistakes (maker, blunder) VALUES
('Tim', 'Deleted a project repository'),
('Jez', 'Exposed his environment variables');

SELECT * from mistakes;
```
