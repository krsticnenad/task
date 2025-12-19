# MDS Frontend Zadatak

Frontend aplikacija razvijena u okviru selekcionog zadatka, namenjena prikazu i upravljanju listom korisnika. Aplikacija je implementirana u **React**-u, uz korišćenje **PrimeReact** komponenti za UI i **TanStack Query** za rad sa API podacima.

## Tehnologije i alati

- **React** – osnovni framework za izradu UI-a i komponentnog pristupa.
- **PrimeReact** – biblioteka UI komponenti koja omogućava brzo kreiranje tabela, formi i interaktivnih elemenata.
- **TanStack Query** – upravljanje asinhronim podacima i keširanje rezultata API poziva.
- **TypeScript** – korišćen za tipizaciju koja smanjuje mogućnost grešaka.
- **Vite** – alat startovanje i bundlovanje aplikacije.
- **pnpm** – package manager za instalaciju zavisnosti i pokretanje projekta.

## Funkcionalnosti

1. **Prikaz liste korisnika**

   - Dinamičko učitavanje podataka preko REST API-ja.
   - Tabela sa paginacijom, sortiranjem i filtriranjem po ključnim kolonama (ID, ime, prezime, email, zemlja, uloga).

2. **Brisanje korisnika**

   - Omogućeno selektivno brisanje korisnika direktno iz tabele.
   - Konfirmacija pre brisanja kako bi se sprečile greške.
   - Automatsko osvežavanje liste nakon brisanja.

3. **Query parametri i validacija**

   - URL query parametri omogućavaju sortiranje i filtriranje liste.
   - Parametri su validirani i ograničeni na definisane vrednosti.

4. **Responsive dizajn**
   - Tabela i UI elementi optimizovani za različite veličine ekrana.

## Struktura koda

- `api/` - konfiguracija REST API poziva i query hook-ova
- `assets` - statički resursi
- `components/` - generičke UI komponente
- `constants` - definisani default parametri i druge konstante
- `features` - specifične funkcionalnosti i moduli aplikacije
- `hooks/` - custom hook-ovi
- `utils` - pomoćne funkcije i alati
- `views/` - stranice aplikacije

## Organizacija projekta

- Kod i struktura projekta su definisani prema principu **Separation of Concerns (SoC)**.
- Svaka komponenta, funkcija i modul ima jasno definisanu odgovornost, što olakšava održavanje i skaliranje aplikacije.
- Sve funkcionalnosti su dokumentovane kroz **docstring-ove**, tako da je lako razumeti kako funkcionišu bez dodatnog komentarisanja.
- Primenjen je princip **Self-Documenting Code** u nazivima funkcija i promenljivih tako da njihova imena jasno opisuju svrhu i ponašanje.

## Pokretanje aplikacije

#### 1. Klonirajte repozitorijum:

```bash
git clone https://github.com/krsticnenad/task.git
```

#### 2. Otvorite projekat:

```bash
cd task
```

#### 3. Instalirajte pakete:

```bash
pnpm install
```

#### 4. Kreirajte .env fajl na osnovu primera:

```bash
cp .env.example .env
```

> Napomena: U fajlu `.env.example` je podešen primer API URL-a `http://localhost:1008`. Ako je potrebno zamenite ga odgovarajućim.

#### 5. Pokrenite dev server:

```bash
pnpm run dev
```
