package com.server.total.entity;

import com.server.member.entity.Member;
import com.server.trade.entity.Trade;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "total")
public class Total {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long totalId;

    private BigDecimal totalIncome;
    private BigDecimal totalOutcome;
    private BigDecimal goal;

    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "memberId", nullable = false)
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        member.getTotalList().add(this);
    }


    @OneToMany(mappedBy = "total", cascade = CascadeType.ALL)
    private List<Trade> tradeList = new ArrayList<>();




}