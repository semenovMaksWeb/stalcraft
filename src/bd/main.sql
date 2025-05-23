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


CREATE TABLE public.my_item (
	id int GENERATED ALWAYS AS IDENTITY NOT NULL,
	id_item varchar NOT NULL,
	count int NULL,
	CONSTRAINT my_item_pk PRIMARY KEY (id)
);


-- Весь бартер кол-во
-- SELECT  bi."name" as name_barter, SUM((bci.count::int- COALESCE(mi.count, 0)) * bc.count::int) as sym FROM public.barter_count_item bci
-- left join item i on i.id = bci.id_item
-- left join barter_count bc on bc.id_item = bci.id_item
-- left join barter_item bi on bi.id = bc.id_barter
-- left join my_item mi on mi.id_item = bc.id_barter or mi.id_item  = i.id
-- where bci.count::int <> 0 and (bc.count notnull and bc.count <> 1)
-- group by bi."name" ;

-- ТЕСТ! отладка
-- SELECT i."name" as name_item, bci.count as item_count, bi."name" as name_barter, bc.count  as count_barter FROM public.barter_count_item bci
-- left join item i on i.id = bci.id_item
-- left join barter_count bc on bc.id_item = bci.id_item
-- left join barter_item bi on bi.id = bc.id_barter
-- where bci.count::int <> 0 and (bc.count notnull and bc.count <> 1)