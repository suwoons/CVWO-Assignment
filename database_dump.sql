PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "tags" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar, "created_at" datetime(6) NOT NULL, "updated_at" datetime(6) NOT NULL, "editable" boolean);
INSERT INTO tags VALUES(1,'personal','2020-01-09 03:30:46.593432','2020-01-09 03:30:46.593432',0);
INSERT INTO tags VALUES(2,'not urgent','2020-01-09 03:30:46.605926','2020-01-09 03:30:46.605926',0);
INSERT INTO tags VALUES(3,'school','2020-01-09 03:30:46.623534','2020-01-09 03:30:46.623534',0);
CREATE TABLE IF NOT EXISTS "tags_todos" ("todo_id" integer NOT NULL, "tag_id" integer NOT NULL);
CREATE TABLE IF NOT EXISTS "todos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar, "done" boolean, "created_at" datetime(6) NOT NULL, "updated_at" datetime(6) NOT NULL, "editable" boolean DEFAULT 0, "tags" varchar);
INSERT INTO todos VALUES(1,'Buy groceries',0,'2020-01-09 03:30:46.647816','2020-01-09 03:30:46.647816',0,NULL);
INSERT INTO todos VALUES(2,'Project discussion with group',0,'2020-01-09 03:30:46.658784','2020-01-09 03:30:46.658784',0,NULL);
INSERT INTO todos VALUES(3,'Finish worksheet',0,'2020-01-09 03:30:46.670743','2020-01-15 17:17:10.694217',0,NULL);
CREATE TABLE IF NOT EXISTS "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar, "created_at" datetime(6) NOT NULL, "updated_at" datetime(6) NOT NULL);
INSERT INTO users VALUES(1,'sarah','2020-01-15 17:14:57.628081','2020-01-15 17:14:57.628081');
CREATE TABLE IF NOT EXISTS "taggings" ("id" integer NOT NULL PRIMARY KEY, "tag_id" integer NOT NULL, "todo_id" integer NOT NULL, "created_at" datetime(6) NOT NULL, "updated_at" datetime(6) NOT NULL, CONSTRAINT "fk_rails_9fcd2e236b"
FOREIGN KEY ("tag_id")
  REFERENCES "tags" ("id")
, CONSTRAINT "fk_rails_dc9f127928"
FOREIGN KEY ("todo_id")
  REFERENCES "todos" ("id")
);
INSERT INTO taggings VALUES(1,1,1,'2020-01-09 03:30:46.713232','2020-01-09 03:30:46.713232');
INSERT INTO taggings VALUES(2,1,2,'2020-01-09 03:30:46.725772','2020-01-09 03:30:46.725772');
INSERT INTO taggings VALUES(3,2,2,'2020-01-09 03:30:46.737302','2020-01-09 03:30:46.737302');
INSERT INTO taggings VALUES(4,3,3,'2020-01-09 03:30:46.749231','2020-01-09 03:30:46.749231');
INSERT INTO taggings VALUES(5,1,3,'2020-01-15 17:17:10.686949','2020-01-15 17:17:10.686949');
CREATE TABLE IF NOT EXISTS "todo_tags" ("id" integer NOT NULL PRIMARY KEY, "todo_id" integer NOT NULL, "tag_id" integer NOT NULL, "created_at" datetime(6) NOT NULL, "updated_at" datetime(6) NOT NULL, CONSTRAINT "fk_rails_9401eeeaaa"
FOREIGN KEY ("tag_id")
  REFERENCES "tags" ("id")
, CONSTRAINT "fk_rails_a37ee945f5"
FOREIGN KEY ("todo_id")
  REFERENCES "todos" ("id")
);
CREATE TABLE IF NOT EXISTS "schema_migrations" ("version" varchar NOT NULL PRIMARY KEY);
INSERT INTO schema_migrations VALUES('20200109021850');
INSERT INTO schema_migrations VALUES('20191212063431');
INSERT INTO schema_migrations VALUES('20191218104441');
INSERT INTO schema_migrations VALUES('20191222141942');
INSERT INTO schema_migrations VALUES('20191222145725');
INSERT INTO schema_migrations VALUES('20191224175811');
INSERT INTO schema_migrations VALUES('20191224182348');
INSERT INTO schema_migrations VALUES('20191224190345');
CREATE TABLE IF NOT EXISTS "ar_internal_metadata" ("key" varchar NOT NULL PRIMARY KEY, "value" varchar, "created_at" datetime(6) NOT NULL, "updated_at" datetime(6) NOT NULL);
INSERT INTO ar_internal_metadata VALUES('environment','development','2020-01-09 03:30:46.162127','2020-01-09 03:30:46.162127');
INSERT INTO ar_internal_metadata VALUES('schema_sha1','1caa28fe42d9c2cbd9577ca553304d9046ba6f34','2020-01-09 03:30:46.179777','2020-01-09 03:30:46.179777');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('tags',3);
INSERT INTO sqlite_sequence VALUES('todos',3);
INSERT INTO sqlite_sequence VALUES('users',1);
CREATE INDEX "index_taggings_on_tag_id" ON "taggings" ("tag_id");
CREATE INDEX "index_taggings_on_todo_id" ON "taggings" ("todo_id");
CREATE INDEX "index_todo_tags_on_tag_id" ON "todo_tags" ("tag_id");
CREATE INDEX "index_todo_tags_on_todo_id" ON "todo_tags" ("todo_id");
COMMIT;
