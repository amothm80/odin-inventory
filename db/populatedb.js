#! /usr/bin/env node

import pg from "pg";
import "dotenv/config";
const { Client } = pg;

const SQL = `
drop table items;
drop table categories;
create table if not exists categories (
id integer primary key generated always as identity,
name varchar(255));


create table if not exists items (
id integer primary key generated always as identity,
name varchar (255),
make varchar (255),
price numeric (10,2),
quantity integer,
category integer references categories);


insert into categories (name) values ('Mobile Phones'),('Computer Parts'),('Laptops');
insert into items (name,make,price,quantity,category) values 
('Iphone 16 Pro','Apple',999.95,12,1),
('Galaxy S25 Ultra','Samsung',899.95,20,1),
('9070XTX','AMD',799.95,50,2),
('RTX5090','nVidia',1999.95,1,2),
('Omen','HP',1599.95,120,3);
`;
// INSERT INTO usernames (username) 
// VALUES
//   ('Bryan'),
//   ('Odin'),
//   ('Damon');
async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.DBUSER}:${process.env.DBPASSWORD}@localhost:5432/odin_inventory`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
