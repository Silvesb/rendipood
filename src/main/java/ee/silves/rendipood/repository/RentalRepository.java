package ee.silves.rendipood.repository;

import ee.silves.rendipood.entity.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentalRepository extends JpaRepository<Rental, Long> {
}
