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
        return filmRepository.findAll();
    }

    public Film getFilmById(Long id) {
        return filmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Film not found with id: " + id));
    }

    public void addFilm(Film film) {
        if (film.getId() != null) {
            throw new RuntimeException("Cannot add film with an existing ID");
        }
        filmRepository.save(film);
    }

    public void updateFilm(Film film) {
        if (film.getId() == null) {
            throw new RuntimeException("Film ID is required for update");
        }
        if (!filmRepository.existsById(film.getId())) {
            throw new RuntimeException("Film not found with id: " + film.getId());
        }
        filmRepository.save(film);
    }

    public void deleteFilm(Long id) {
        if (!filmRepository.existsById(id)) {
            throw new RuntimeException("Film not found with id: " + id);
        }
        filmRepository.deleteById(id);
    }
//
//    public List<Film> getRentedFilms() {
//        return filmRepository.findByRentedTrueOrderByIdAsc();
//    }

    public Film unrentFilm(Long id) {
        Film film = filmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Film not found with id: " + id));
//        if (!film.isRented()) {
//            throw new RuntimeException("Film is not currently rented");
//        }
//        film.setRented(false);
        return filmRepository.save(film);
    }
}
