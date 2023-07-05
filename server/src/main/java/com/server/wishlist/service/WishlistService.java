package com.server.wishlist.service;

import com.server.exception.BusinessLogicException;
import com.server.exception.ExceptionCode;
import com.server.wishlist.entity.Wishlist;
import com.server.wishlist.repository.WishlistRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Transactional
@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;

    public WishlistService(WishlistRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }

    public Wishlist createWishlist(Wishlist wishlist) {

        return wishlistRepository.save(wishlist);
    }

    public Wishlist updateWishlist(Wishlist wishlist) {
        Wishlist findWishlist = findWishlist(wishlist.getWishlistId());

        return wishlistRepository.save(findWishlist);
    }

    @Transactional(readOnly = true)
    public Wishlist findWishlist(long wishlistId) {
        Wishlist findWishlist = wishlistRepository.findById(wishlistId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.WISHLIST_NOT_FOUND));
        return findWishlist;
    }

    @Transactional(readOnly = true)
        public Page<Wishlist> findWishlistsByCategory(int page, int size, String tab) {
            Page<Wishlist> pageWishlist;
        if (tab.equals("latest")) {
            pageWishlist = wishlistRepository.findAll(PageRequest.of(page, size, Sort.by(
                    Sort.Direction.DESC, "wishlistId")));
        } else if (tab.equals("limitAccount")) {
            pageWishlist = wishlistRepository.findWishlistsByLA(PageRequest.of(page, size));
        } else {
            throw new IllegalArgumentException("Invalid sort parameter");
        }

        return pageWishlist;
    }

    public void deleteWishlist(long wishlistId) {
        Wishlist findWishlist = findWishlist(wishlistId);
        wishlistRepository.delete(findWishlist);
    }
}
