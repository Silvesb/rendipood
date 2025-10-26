package ee.silves.rendipood.service;

import ee.silves.rendipood.entity.Film;
import ee.silves.rendipood.repository.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FilmService {

    @Autowired
    private FilmRepository filmRepository;

    public List<Film> getAllFilms() {
        return filmRepository.findAllByOrderByIdAsc();
    }

    public List<Film> getAvailableFilms() {
        return filmRepository.findByRentedFalseOrderByIdAsc();
    }

    public Film getFilmById(Long id) {
        return filmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Film not found with id: " + id));
    }

    public Film addFilm(Film film) {
        if (film.getId() != null) {
            throw new RuntimeException("Cannot add film with an existing ID");
        }
        return filmRepository.save(film);
    }

    public Film updateFilm(Film film) {
        if (film.getId() == null) {
            throw new RuntimeException("Film ID is required for update");
        }
        if (!filmRepository.existsById(film.getId())) {
            throw new RuntimeException("Film not found with id: " + film.getId());
        }
        return filmRepository.save(film);
    }

    public void deleteFilm(Long id) {
        if (!filmRepository.existsById(id)) {
            throw new RuntimeException("Film not found with id: " + id);
        }
        filmRepository.deleteById(id);
    }

    public Film rentFilm(Long id) {
        Film film = filmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Film not found with id: " + id));
        if (film.isRented()) {
            throw new RuntimeException("Film is already rented");
        }
        film.setRented(true);
        return filmRepository.save(film);
    }

    public List<Film> getRentedFilms() {
        return filmRepository.findByRentedTrueOrderByIdAsc();
    }

    public Film unrentFilm(Long id) {
        Film film = filmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Film not found with id: " + id));
        if (!film.isRented()) {
            throw new RuntimeException("Film is not currently rented");
        }
        film.setRented(false);
        return filmRepository.save(film);
    }
}
