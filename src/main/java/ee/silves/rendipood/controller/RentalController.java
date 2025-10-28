package ee.silves.rendipood.controller;

import ee.silves.rendipood.entity.Film;
import ee.silves.rendipood.entity.Rental;
import ee.silves.rendipood.model.FilmRental;
import ee.silves.rendipood.repository.FilmRepository;
import ee.silves.rendipood.repository.RentalRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class RentalController {

    private final int premiumPrice = 4;
    private final int basicPrice = 3;
    private final int regularFreeDays = 3;
    private final int oldFreeDays = 5;

    /* Dependency injection */
    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private FilmRepository filmRepository;

    @GetMapping("rentals")
    public ResponseEntity<List<Rental>> getAllRentals() {
        return ResponseEntity.status(200).body(rentalRepository.findAll());
    }

    @Transactional
    @PostMapping("start-rental")
    public Rental startRental(@RequestBody List<FilmRental> filmRentals){
        Rental rental = new Rental();
        rental.setCreated(new Date());
        // Rental dbRental = rentalRepository.save(rental);
        List<Film> rentalFilms = new ArrayList<>();

        double sum = 0;
        for (FilmRental filmRental:filmRentals) {
            Film film = filmRepository.findById(filmRental.getFilmId()).orElseThrow();
            rentalFilms.add(film);
            film.setRental(rental);

            if (film.getDays() != 0) {
                throw new RuntimeException("Film is already rented out!");
            }
            film.setDays(filmRental.getRentedDays());

            filmRepository.save(film);
            switch (film.getType()) {
                case NEW -> sum += film.getDays() * premiumPrice;
                case REGULAR -> {
                    if (regularFreeDays < film.getDays()) {
                        sum += (film.getDays() - regularFreeDays) * basicPrice;
                    } else {
                        sum += basicPrice;
                    }
                }
                case OLD -> {
                    if (oldFreeDays < film.getDays()) {
                        sum += (film.getDays() - oldFreeDays) * basicPrice;
                    } else {
                        sum += basicPrice;
                    }
                }
            }
        }
        rental.setFilms(rentalFilms);
        rental.setInitialFee(sum);
        return rentalRepository.save(rental);
    }

    @PutMapping("end-rental")
    public Rental endRental(@RequestParam Long rentalId, @RequestParam int extraDays){
        Rental dbRental = rentalRepository.findById(rentalId).orElseThrow();
        long millisPerDay = 1000 * 60 * 60 * 24;
        long millis = new Date().getTime() - dbRental.getCreated().getTime();
        int fullDaysPassed = Math.toIntExact(millis / millisPerDay) + extraDays;

        double lateFee = 0;
        for (Film film : dbRental.getFilms()) {
            if (film.getDays() != 0) {
                if (film.getDays() < fullDaysPassed) {
                    switch (film.getType()) {
                        case NEW -> lateFee += premiumPrice * (fullDaysPassed - film.getDays());
                        case REGULAR, OLD -> lateFee += basicPrice * (fullDaysPassed - film.getDays());
                    }
                }
                film.setDays(0);
                film.setRental(null);
                filmRepository.save(film);
            }
        }

        dbRental.setLateFee(lateFee);
        return rentalRepository.save(dbRental);
    }
}
