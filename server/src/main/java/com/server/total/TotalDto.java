package com.server.total;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.util.Assert;

import java.math.BigDecimal;

public class TotalDto {


    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public class Post {
        private BigDecimal totalIncome;
        private BigDecimal totalOutcome;
        private BigDecimal goal;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public class Put {
        private long totalId;
        private BigDecimal totalIncome;
        private BigDecimal totalOutcome;
        private BigDecimal goal;

        public TotalDto.Put addTotalId(Long totalId) {
            Assert.notNull(totalId, "total id must not be null.");
            this.totalId = totalId;
            return this;
        }
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private BigDecimal totalIncome;
        private BigDecimal totalOutcome;
        private BigDecimal goal;

        public static Response response(Total total) {
            return Response.builder()
                    .totalIncome(total.getTotalIncome())
                    .totalOutcome(total.getTotalOutcome())
                    .goal(total.getGoal())
                    .build();
        }
    }


}
