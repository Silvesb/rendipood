package ee.silves.rendipood.controller;

import ee.silves.rendipood.entity.Film;
import ee.silves.rendipood.service.FilmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class FilmController {

    /* Dependency injection */
    @Autowired
    private FilmService filmService;

    // http://localhost:8080/films
    @GetMapping("films")
    public ResponseEntity<List<Film>> getAllFilms() {
        return ResponseEntity.ok().body(filmService.getAllFilms());
    }

    // http://localhost:8080/available-films
    @GetMapping("available-films")
    public List<Film> getAvailableFilms() {
        return filmService.getAllFilms();
    }

    // http://localhost:8080/films/1
    @GetMapping("films/{id}")
    public ResponseEntity<Film> getFilmById(@PathVariable Long id) {
        return ResponseEntity.ok().body(filmService.getFilmById(id));
    }

    // http://localhost:8080/films
    @PostMapping("films")
    public ResponseEntity<List<Film>> addFilm(@RequestBody Film film) {
        if (film.getId() != null) {
            throw new RuntimeException("Cannot add with ID");
        }
        film.setDays(0);
        film.setRental(null);
        filmService.addFilm(film);
        return ResponseEntity.status(201).body(filmService.getAllFilms());
    }

    // http://localhost:8080/films
    @PutMapping("films")
    public ResponseEntity<List<Film>> updateFilm(@RequestBody Film film) {
        filmService.updateFilm(film);
        return ResponseEntity.ok().body(filmService.getAllFilms());
    }

    // http://localhost:8080/films?id=1
    @DeleteMapping("films")
    public ResponseEntity<List<Film>> deleteFilm(@RequestParam Long id) {
        filmService.deleteFilm(id);
        return ResponseEntity.ok().body(filmService.getAllFilms());
    }

    // http://localhost:8080/films/1/rent
//    @PatchMapping("films/{id}/rent")
//    public ResponseEntity<Film> rentFilm(@PathVariable Long id) {
//        return ResponseEntity.ok().body(filmService.rentFilm(id));
//    }

    // http://localhost:8080/rented-films
    @GetMapping("rented-films")
    public ResponseEntity<List<Film>> getRentedFilms() {
        return ResponseEntity.ok().body(filmService.getAllFilms());
    }

    // http://localhost:8080/films/1/unrent
    @PatchMapping("films/{id}/unrent")
    public ResponseEntity<Film> unrentFilm(@PathVariable Long id) {
        return ResponseEntity.ok().body(filmService.unrentFilm(id));
    }
}
