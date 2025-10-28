package ee.silves.rendipood.model;

import lombok.Data;

@Data
public class FilmRental {
    private Long rentalId;
    private Long filmId;
    private int rentedDays;
}
