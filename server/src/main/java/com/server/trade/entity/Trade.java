package com.server.trade.entity;

import com.server.member.entity.Member;
import com.server.total.entity.Total;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "trades")
@Builder
public class Trade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tradeId;

    @Column(nullable = false)
    private String type; //수입 or 지출

    @Column(nullable = false)
    private String tradeName; //내역

    @NotNull
    @Column(nullable = false, length = 128)
    @Length(min = 1, max = 128)
    private BigDecimal amount; //금액정확도를 위해 BigDecimal 타입을 사용했습니다.

    @Column
    private String note; //비고

    @Column(nullable = false)
    private LocalDate date; //날짜 LocalDate.of(2023, 7, 1);

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId", nullable = false)
    private Member member;

    public void setMember(Member member){
        this.member = member;
    }



    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "totalId", nullable = true)
    private Total total;

    public void setTotal(Total total) {
        this.total = total;
        total.getTradeList().add(this);
    }


    public void setDate(LocalDate date) {
        this.date = date;
    }

    public BigDecimal getTotalIncome() {
        return total.getTotalIncome();
    }
    public BigDecimal getTotalOutcome() {
        return total.getTotalOutcome();
    }
    public BigDecimal getGoal() {
        return total.getGoal();
    }



}
