package com.server.trade.dto;

import com.server.response.PageInfo;
import com.server.trade.entity.Category;
import com.server.trade.entity.Trade;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.util.Assert;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class TradeDto {
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Post {
        private String type; //수입 or 지출
        private String tradeName; //내역
        @NotNull
        private BigDecimal amount; //금액
        private String note; //비고
        private LocalDate date;
        private Category category;

    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Put {
        private long tradeId;
        private String type; //수입 or 지출
        private String tradeName; //내역
        @NotNull
        private BigDecimal amount; //금액
        private String note; //비고
        private LocalDate date;
        private Category category;

        public TradeDto.Put addTradeId(Long tradeId) {
            Assert.notNull(tradeId, "trade id must not be null.");
            this.tradeId = tradeId;
            return this;
        }

    }



    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class ResponseDto<T> {
        private List<T> data;
        private PageInfo pageInfo;
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





    @Getter
    @Builder
    @AllArgsConstructor
    public static class TradeInfo {
        private long tradeId;
        private String type; //수입 or 지출
        private String tradeName; //내역
        private BigDecimal amount;
        private String note; //비고
        private LocalDate date;
        private Category category;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class ListElement {
        private long tradeId;
        private String type; //수입 or 지출
        private String tradeName; //내역
        private BigDecimal amount;
        private String note; //비고
        private LocalDate date;
        private Category category;
    }

    public static List<ListElement> getList(List<Trade> trades) {
        return trades.stream()
                .map(trade -> ListElement.builder()
                        .tradeId(trade.getTradeId())
                        .type(trade.getType())
                        .tradeName(trade.getTradeName())
                        .amount(trade.getAmount())
                        .note(trade.getNote())
                        .date(trade.getDate())
                        .category(trade.getCategory())
                        .build()
                )
                .collect(Collectors.toList());
    }



}
