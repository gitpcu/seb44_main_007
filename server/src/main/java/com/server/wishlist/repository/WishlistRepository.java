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

    @Query(value = "SELECT w FROM Wishlist w JOIN w.limitAccount la WHERE w.price < la.limitAccount ORDER BY w.price DESC")
    Page<Wishlist> findWishlistsByLA(Pageable pageable);
}

