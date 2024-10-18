-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "birthdate" TIMESTAMP(3),

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "genre" TEXT,
    "published_year" INTEGER,
    "price" INTEGER,
    "stock" INTEGER,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookReview" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "review_text" TEXT,
    "rating" INTEGER NOT NULL,
    "reviewer_name" TEXT,
    "review_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookReview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookReview" ADD CONSTRAINT "BookReview_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_authorId_fkey";

-- DropForeignKey
ALTER TABLE "BookReview" DROP CONSTRAINT "BookReview_bookId_fkey";

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookReview" ADD CONSTRAINT "BookReview_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Author_name_key" ON "Author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Book_title_key" ON "Book"("title");

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Ubuntu 14.13-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.13 (Ubuntu 14.13-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Author; Type: TABLE; Schema: public; Owner: system
--

CREATE TABLE public."Author" (
    id integer NOT NULL,
    name text NOT NULL,
    bio text,
    birthdate timestamp(3) without time zone
);


ALTER TABLE public."Author" OWNER TO system;

--
-- Name: Author_id_seq; Type: SEQUENCE; Schema: public; Owner: system
--

CREATE SEQUENCE public."Author_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Author_id_seq" OWNER TO system;

--
-- Name: Author_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: system
--

ALTER SEQUENCE public."Author_id_seq" OWNED BY public."Author".id;


--
-- Name: Book; Type: TABLE; Schema: public; Owner: system
--

CREATE TABLE public."Book" (
    id integer NOT NULL,
    title text NOT NULL,
    "authorId" integer NOT NULL,
    genre text,
    published_year integer,
    price integer,
    stock integer
);


ALTER TABLE public."Book" OWNER TO system;

--
-- Name: BookReview; Type: TABLE; Schema: public; Owner: system
--

CREATE TABLE public."BookReview" (
    id integer NOT NULL,
    "bookId" integer NOT NULL,
    review_text text,
    rating integer NOT NULL,
    reviewer_name text,
    review_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."BookReview" OWNER TO system;

--
-- Name: BookReview_id_seq; Type: SEQUENCE; Schema: public; Owner: system
--

CREATE SEQUENCE public."BookReview_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."BookReview_id_seq" OWNER TO system;

--
-- Name: BookReview_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: system
--

ALTER SEQUENCE public."BookReview_id_seq" OWNED BY public."BookReview".id;


--
-- Name: Book_id_seq; Type: SEQUENCE; Schema: public; Owner: system
--

CREATE SEQUENCE public."Book_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Book_id_seq" OWNER TO system;

--
-- Name: Book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: system
--

ALTER SEQUENCE public."Book_id_seq" OWNED BY public."Book".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: system
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO system;

--
-- Name: Author id; Type: DEFAULT; Schema: public; Owner: system
--

ALTER TABLE ONLY public."Author" ALTER COLUMN id SET DEFAULT nextval('public."Author_id_seq"'::regclass);


--
-- Name: Book id; Type: DEFAULT; Schema: public; Owner: system
--

ALTER TABLE ONLY public."Book" ALTER COLUMN id SET DEFAULT nextval('public."Book_id_seq"'::regclass);


--
-- Name: BookReview id; Type: DEFAULT; Schema: public; Owner: system
--

ALTER TABLE ONLY public."BookReview" ALTER COLUMN id SET DEFAULT nextval('public."BookReview_id_seq"'::regclass);


--
-- Data for Name: Author; Type: TABLE DATA; Schema: public; Owner: system
--

COPY public."Author" (id, name, bio, birthdate) FROM stdin;
1	J.K. Rowling	British author, best known for the Harry Potter series.	1965-07-31 00:00:00
2	George Orwell	English novelist, essayist, journalist, and critic.	1903-06-25 00:00:00
3	Agatha Christie	English writer known for her 66 detective novels.	1890-09-15 00:00:00
7	Raditya Dika	Indonesian novelist, comedian, filmmaker, and social media influencer, known for his humorous storytelling and relatable characters.	1984-12-28 00:00:00
16	Test	This is a test author	\N
\.


--
-- Data for Name: Book; Type: TABLE DATA; Schema: public; Owner: system
--

COPY public."Book" (id, title, "authorId", genre, published_year, price, stock) FROM stdin;
24	Manusia Setengah Salmon	7	Comedy	2011	18	5
29	Koala Kumal	7	Komedi	2015	20	10
47	Test	16	Comedy	2012	20	20
20	Harry Potter and the Philosopher's Stone	1	Fantasy	1997	20	50
21	1984	2	Dystopian	1949	15	30
22	Murder on the Orient Express	3	Mystery	1934	10	40
26	Animal Farm	2	Political satire	1945	12	35
48	test 2	7	Fantasy	2004	24	333
\.


--
-- Data for Name: BookReview; Type: TABLE DATA; Schema: public; Owner: system
--

COPY public."BookReview" (id, "bookId", review_text, rating, reviewer_name, review_date) FROM stdin;
18	20	A magical and thrilling start to an iconic series!	5	Alice	2023-09-01 00:00:00
19	20	A delightful read for all ages!	4	Eva	2023-09-05 00:00:00
20	20	A heartwarming tale of friendship and bravery.	4	Frank	2023-09-10 00:00:00
21	21	A chilling depiction of a dystopian future.	5	Bob	2023-09-02 00:00:00
22	21	An eye-opening look at the human condition.	4	Jack	2023-09-07 00:00:00
23	21	A profound exploration of totalitarianism.	5	Grace	2023-09-11 00:00:00
24	22	A brilliant mystery novel full of twists and turns.	4	Charlie	2023-09-03 00:00:00
25	22	A clever and engaging whodunit.	4	Kathy	2023-09-08 00:00:00
26	22	An engaging plot with well-developed characters.	4	Leo	2023-09-12 00:00:00
27	22	A sharp critique of societal norms.	5	Dave	2023-09-04 00:00:00
29	21	Wow, This is so Eye Opening	4	Ojan	2024-10-07 02:38:55.166
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: system
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
b2169431-024c-47b9-8223-e910ba891b02	23d7067fef2c9f210427613b31b1a574bb46aac79c993d1a936551b973dae040	2024-10-02 10:25:01.776326+07	20241001083350_migrate_init	\N	\N	2024-10-02 10:25:01.755934+07	1
88eee2dc-1409-4239-b262-8726835e7225	68e6ce4e5919c8b0463612306fb116bd4df8e6130e437eae9d155a32b9d0793e	2024-10-02 10:25:11.74331+07	20241002032511_update_relation	\N	\N	2024-10-02 10:25:11.735833+07	1
0ca4ddc0-2fd4-4e98-98a0-2e0f6149e368	6d342e6efedffb6e500242dc6bf0b22ef01ab1edfe4964862ebcf53c18d967aa	2024-10-02 13:39:12.928633+07	20241002063912_add_unique_constrain	\N	\N	2024-10-02 13:39:12.917814+07	1
\.


--
-- Name: Author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: system
--

SELECT pg_catalog.setval('public."Author_id_seq"', 16, true);


--
-- Name: BookReview_id_seq; Type: SEQUENCE SET; Schema: public; Owner: system
--

SELECT pg_catalog.setval('public."BookReview_id_seq"', 30, true);


--
-- Name: Book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: system
--

SELECT pg_catalog.setval('public."Book_id_seq"', 48, true);


--
-- Name: Author Author_pkey; Type: CONSTRAINT; Schema: public; Owner: system
--

ALTER TABLE ONLY public."Author"
    ADD CONSTRAINT "Author_pkey" PRIMARY KEY (id);


--
-- Name: BookReview BookReview_pkey; Type: CONSTRAINT; Schema: public; Owner: system
--

ALTER TABLE ONLY public."BookReview"
    ADD CONSTRAINT "BookReview_pkey" PRIMARY KEY (id);


--
-- Name: Book Book_pkey; Type: CONSTRAINT; Schema: public; Owner: system
--

ALTER TABLE ONLY public."Book"
    ADD CONSTRAINT "Book_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: system
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Author_name_key; Type: INDEX; Schema: public; Owner: system
--

CREATE UNIQUE INDEX "Author_name_key" ON public."Author" USING btree (name);


--
-- Name: Book_title_key; Type: INDEX; Schema: public; Owner: system
--

CREATE UNIQUE INDEX "Book_title_key" ON public."Book" USING btree (title);


--
-- Name: BookReview BookReview_bookId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: system
--

ALTER TABLE ONLY public."BookReview"
    ADD CONSTRAINT "BookReview_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES public."Book"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Book Book_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: system
--

ALTER TABLE ONLY public."Book"
    ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."Author"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

