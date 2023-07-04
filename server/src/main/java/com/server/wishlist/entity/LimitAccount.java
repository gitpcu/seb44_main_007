package com.server.wishlist.entity;

import com.server.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class LimitAccount extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long limitAccountId;

    @Column
    private BigDecimal limitAccount;

    public LimitAccount(BigDecimal limitAccount) {
        this.limitAccount = limitAccount;
    }
}
