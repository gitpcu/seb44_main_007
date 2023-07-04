package com.server.wishlist.entity;


import com.server.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@NoArgsConstructor
@Getter @Setter
@Entity
public class Wishlist extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long wishlistId;

    @Column(length = 100, nullable = false)
    private String wishlistName;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(length = 100, nullable = false)
    private String category;

    @Column
    private String goodsImageURL;

    @OneToOne
    @JoinColumn(name = "limitAccountId")
    private LimitAccount limitAccount;

    public Wishlist (long wishlistId) {this.wishlistId = wishlistId;}

    public Wishlist(BigDecimal price, String wishlistName, String category, BigDecimal limitAccount, String goodsImageURL) {
        this.price = price;
        this.wishlistName = wishlistName;
        this.category = category;
        this.goodsImageURL = goodsImageURL;
    }
}

