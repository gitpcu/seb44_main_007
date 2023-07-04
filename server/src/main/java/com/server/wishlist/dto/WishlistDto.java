package com.server.wishlist.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.util.Assert;

import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;

public class WishlistDto {

    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank
        private String wishlistName;

        @NotBlank
        private BigDecimal price;

        @NotBlank
        private String category;

        private String goodsImageURL;
    }

    @Getter
    @AllArgsConstructor
    public static class Put{

        private long wishlistId;

        private String name;

        private BigDecimal price;

        private String category;

        private String goodsImageURL;

        public Put addwishlistId(Long wishlistId) {
            Assert.notNull(wishlistId, "wishlist Id must not be Null");
            this.wishlistId = wishlistId;
            return this;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Response{
        private long wishlistId;
        private String name;
        private BigDecimal price;
        private String category;
        private String goodsImageURL;
    }
}
