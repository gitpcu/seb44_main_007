package com.server.wishlist.controller;

import com.server.dto.ResponseDto;
import com.server.utils.UriCreator;
import com.server.wishlist.dto.WishlistDto;
import com.server.wishlist.entity.Wishlist;
import com.server.wishlist.mapper.WishlistMapper;
import com.server.wishlist.service.WishlistService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/wishlists")
@Validated
@Slf4j
@RequiredArgsConstructor
public class WishlistController {

    private final static String WISHLIST_DEFAULT_URL = "/wishlists";
    private final WishlistService wishlistService;
    private final WishlistMapper wishlistMapper;

    @PostMapping
    public ResponseEntity postWishlist(@Valid @RequestBody WishlistDto.Post requestBody) {
        Wishlist wishlist = wishlistMapper.wishlistPostDtoToWishlist(requestBody);

        Wishlist createWishlist = wishlistService.createWishlist(wishlist);
        URI location = UriCreator.createUri(WISHLIST_DEFAULT_URL, createWishlist.getWishlistId());

        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{wishlist-id}")
    public ResponseEntity putWishlist(@PathVariable("wishlist-id") @Positive long wishlistId,
                                      @Valid @RequestBody WishlistDto.Put requestBody) {
        Wishlist wishlist =
                wishlistService.updateWishlist(wishlistMapper.wishlistPutDtoToWishlist(requestBody));

        return new ResponseEntity<>(
                new ResponseDto.SingleResponseDto<>(wishlistMapper.wishlistToWishlistResponseDto(wishlist)),
                HttpStatus.OK);
    }

    @GetMapping("/{wishlist-id}")
    public ResponseEntity getMember(
            @PathVariable("wishlist-id") @Positive long wishlistId) {
        Wishlist wishlist = wishlistService.findWishlist(wishlistId);
        return new ResponseEntity<>(
                new ResponseDto.SingleResponseDto<>(wishlistMapper.wishlistToWishlistResponseDto(wishlist))
                , HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getWishlists(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size,
                                       @RequestParam String tab) {
        Page<Wishlist> pageWishlists = wishlistService.findWishlistsByCategory(page, size, tab);
        List<Wishlist> wishlists = pageWishlists.getContent();
        return new ResponseEntity<>(
                new ResponseDto.MultiResponseDto<>(wishlistMapper.wishlistsToWishlistResponseDtos(wishlists), pageWishlists)
                , HttpStatus.OK);
    }

    @DeleteMapping("/wishlist-id")
    public ResponseEntity deleteWishlist(
            @PathVariable("wishlist-id") @Positive long wishlistId) {
        wishlistService.deleteWishlist(wishlistId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
