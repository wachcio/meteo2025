# Meteo React

To aplikacja do monitorowania stacji pogodowej, przekonwertowana z Vue.js na React.js.

## Instalacja

1. Sklonuj repozytorium:

```
git clone [adres-repozytorium]
```

2. Przejdź do katalogu projektu:

```
cd meteo-react
```

3. Zainstaluj zależności:

```
npm install
```

4. Uruchom aplikację w trybie deweloperskim:

```
npm start
```

Aplikacja będzie dostępna pod adresem [http://localhost:3000](http://localhost:3000)

## Funkcjonalności

- Wyświetlanie aktualnych odczytów z czujników
- Przeglądanie danych archiwalnych
- Wykresy i statystyki
- Interaktywny interfejs użytkownika

## Zależności

- React 19
- React Router 7
- Recharts (do wykresów)

## Struktura API

Aplikacja korzysta z API, które powinno udostępniać następujące endpointy:

- `/api/sensors` - pobieranie aktualnych danych z czujników
- `/api/archive` - pobieranie danych archiwalnych

## Konfiguracja

Aby dostosować adres API, należy zmodyfikować zmienną `API_BASE_URL` w pliku `src/services/apiService.js`.

```

```
