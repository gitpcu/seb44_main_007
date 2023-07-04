package com.server.wishlist.repository;

import com.server.wishlist.entity.Wishlist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    Wishlist findByName(String name);

    @Query(value = "SELECT * FROM Wishlist WHERE price < limitAccount ORDER BY price DESC")
    Page<Wishlist> findWishlistsByLA(Pageable pageable);
}

