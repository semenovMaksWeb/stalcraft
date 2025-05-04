CREATE TABLE public.item (
	id varchar NOT NULL,
	name varchar NULL,
	category varchar NULL,
	CONSTRAINT item_pk PRIMARY KEY (id)
);
ALTER TABLE public.item ADD is_barter boolean NULL;

CREATE TABLE public.barter_item (
	id varchar NOT NULL,
	"name" varchar NULL,
	CONSTRAINT barter_item_pk PRIMARY KEY (id)
);

CREATE TABLE public.barter_count (
	id_item int4 NOT NULL,
	id_barter varchar NOT NULL,
	count int4 NOT NULL,
	id int4 GENERATED ALWAYS AS IDENTITY NOT NULL,
	CONSTRAINT barter_count_pk PRIMARY KEY (id)
);

ALTER TABLE public.barter_count ALTER COLUMN id_item TYPE varchar USING id_item::varchar;
ALTER TABLE public.item ALTER COLUMN preitemid TYPE varchar USING preitemid::varchar;

-- получить список нужного бартера
select bi."name" as barter, i."name", count
from barter_count bc 
left join barter_item bi on bi.id = bc.id_barter
left join item i on i.id = bc.id_item

-- получить список