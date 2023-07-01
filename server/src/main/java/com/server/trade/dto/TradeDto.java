package com.server.trade.dto;

import com.server.trade.entity.Category;
import com.server.trade.entity.Trade;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

public class TradeDto {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
        private String type; //수입 or 지출
        private String tradeName; //내역
        private BigDecimal amount; //금액
        private String note; //비고
        private LocalDate date;
        private Category category;

    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private long tradeId;
        private String type; //수입 or 지출
        private String tradeName; //내역
        private BigDecimal amount; //금액
        private String note; //비고
        private LocalDate date;
        private Category category;


        public static Response response(Trade trade) {
            return Response.builder()
                    .tradeId(trade.getTradeId())
                    .type(trade.getType())
                    .tradeName(trade.getTradeName())
                    .amount(trade.getAmount())
                    .note(trade.getNote())
                    .date(trade.getDate())
                    .category(trade.getCategory())
                    .build();
        }
    }


}
