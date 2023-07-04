package com.server.wishlist.mapper;

import com.server.wishlist.dto.WishlistDto;
import com.server.wishlist.entity.Wishlist;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-05T00:48:59+0900",
    comments = "version: 1.5.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11.0.18 (Oracle Corporation)"
)
@Component
public class WishlistMapperImpl implements WishlistMapper {

    @Override
    public Wishlist wishlistPostDtoToWishlist(WishlistDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Wishlist wishlist = new Wishlist();

        wishlist.setWishlistName( requestBody.getWishlistName() );
        wishlist.setPrice( requestBody.getPrice() );
        wishlist.setCategory( requestBody.getCategory() );
        wishlist.setGoodsImageURL( requestBody.getGoodsImageURL() );

        return wishlist;
    }

    @Override
    public Wishlist wishlistPutDtoToWishlist(WishlistDto.Put requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Wishlist wishlist = new Wishlist();

        wishlist.setWishlistId( requestBody.getWishlistId() );
        wishlist.setPrice( requestBody.getPrice() );
        wishlist.setCategory( requestBody.getCategory() );
        wishlist.setGoodsImageURL( requestBody.getGoodsImageURL() );

        return wishlist;
    }

    @Override
    public WishlistDto.Response wishlistToWishlistResponseDto(Wishlist wishlist) {
        if ( wishlist == null ) {
            return null;
        }

        long wishlistId = 0L;
        BigDecimal price = null;
        String category = null;
        String goodsImageURL = null;

        wishlistId = wishlist.getWishlistId();
        price = wishlist.getPrice();
        category = wishlist.getCategory();
        goodsImageURL = wishlist.getGoodsImageURL();

        String name = null;

        WishlistDto.Response response = new WishlistDto.Response( wishlistId, name, price, category, goodsImageURL );

        return response;
    }

    @Override
    public List<WishlistDto.Response> wishlistsToWishlistResponseDtos(List<Wishlist> wishlists) {
        if ( wishlists == null ) {
            return null;
        }

        List<WishlistDto.Response> list = new ArrayList<WishlistDto.Response>( wishlists.size() );
        for ( Wishlist wishlist : wishlists ) {
            list.add( wishlistToWishlistResponseDto( wishlist ) );
        }

        return list;
    }
}
