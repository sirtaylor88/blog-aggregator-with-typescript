# GATOR aka aggreGATOR

A RSS feed aggregator in Go. This CLI tool allows users to:

- Add RSS feeds from across the internet to be collected
- Store the collected posts in a PostgreSQL database
- Follow and unfollow RSS feeds that other users have added
- View summaries of the aggregated posts in the terminal, with a link to the full post

## Installation

### Install Drizzle ORM and PostgreSQL support

```node
npm i drizzle-orm postgres
```

### Install Drizzle Kit

```node
npm i -D drizzle-kit
```

## DB Migrations

### Make migrations

```node
npx drizzle-kit generate
```

or

```node
npm run generate
```

### Apply migrations

```node
npx drizzle-kit migrate
```

or

```node
npm run migrate
```

## PostgreSQL

### Installation

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

### Update postgres password

```bash
sudo passwd postgres
```

### Launch PostgreSQL server

```bash
sudo service postgresql start
```

### Connect to psql as user `postgres`

```bash
sudo -u postgres psql
```

### Check PostgreSQL version

```sql
SELECT version();
```

### Create DB gator

```sql
CREATE DATABASE gator;
```

### Connect ot DB gator

```psql
\c gator
```

### Modify user `postgres` password

```sql
ALTER USER postgres PASSWORD <password>;
```

### Quit psql

```psql
\q
```
