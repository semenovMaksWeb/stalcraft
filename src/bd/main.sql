CREATE TABLE public.item (
	id varchar NOT NULL,
	"name" varchar NULL,
	category varchar NULL,
	is_barter bool NULL,
	baza varchar NULL,
	"money" int4 NULL,
	preitemid _varchar NULL,
	rang varchar NULL,
	CONSTRAINT item_pk PRIMARY KEY (id)
);

CREATE TABLE public.barter_count (
	id_item int4 NOT NULL,
	id_barter varchar NOT NULL,
	count int4 NOT NULL,
	id int4 GENERATED ALWAYS AS IDENTITY NOT NULL,
	CONSTRAINT barter_count_pk PRIMARY KEY (id)
);

ALTER TABLE public.barter_count ALTER COLUMN id_item TYPE varchar USING id_item::varchar;
 
CREATE TABLE public.barter_count_item (
	id int GENERATED ALWAYS AS IDENTITY NOT NULL,
	id_item varchar NULL,
	count varchar NULL,
	CONSTRAINT barter_count_item_pk PRIMARY KEY (id)
);
COMMENT ON TABLE public.barter_count_item IS 'Таблица которая говорит сколько шмота нужно для получения всего шмота';
COMMENT ON TABLE public.barter_count IS 'Таблица которая хранит сслыку ММ предмета и бартера который нужен';


-- получить список нужного бартера
-- select bi."name" as barter, i."name", count
-- from barter_count bc 
-- left join barter_item bi on bi.id = bc.id_barter
-- left join item i on i.id = bc.id_item
-- получить список