CREATE TABLE "koalas" (
	"id" serial primary key,
	"name" varchar(80) not null,
	"gender" varchar(1) not null,
	"age" integer not null,
	"ready_to_transfer" boolean default false,
	"notes" varchar(255)
	);
	
INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
VALUES ('Scotty', 'M', '4', 'true', 'Born in Guatemala'),
('Jean', 'F', '5', 'true', 'Allergic to lots of lava'),
('Ororo', 'F', '7', 'false', 'Loves listening to Pala (Abdul)'),
('Logan', 'M', '15', 'false', 'Loves the sauna'),
('Charlie', 'M', '9', 'true', 'Favorite band is Nirvana'),
('Betsy', 'F', '4', 'true', 'Has a pet iguana');

SELECT * from "koalas";

UPDATE "koalas" SET "ready_to_transfer"=(NOT "ready_to_transfer") WHERE "id" = 1;

DELETE FROM "koalas" WHERE "id" = 1;