package ee.silves.rendipood.repository;

import ee.silves.rendipood.entity.Film;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FilmRepository extends JpaRepository<Film, Long> {
    List<Film> findAllByOrderByIdAsc();
    List<Film> findByRentedFalseOrderByIdAsc();
    List<Film> findByRentedTrueOrderByIdAsc();
}
