CREATE TABLE public.item (
	id varchar NOT NULL,
	name varchar NULL,
	category varchar NULL,
	CONSTRAINT item_pk PRIMARY KEY (id)
);
ALTER TABLE public.item ADD is_barter boolean NULL;