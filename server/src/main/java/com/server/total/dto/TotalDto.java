package com.server.total.dto;

import com.server.total.entity.Total;
import com.server.trade.entity.Trade;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.util.Assert;

import java.math.BigDecimal;
import java.util.List;

public class TotalDto {
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        private BigDecimal goal;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {
        private BigDecimal goal;

    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private BigDecimal goal;

        public static Response response(Total total) {
            return Response.builder()
                    .goal(total.getGoal())
                    .build();
        }
    }

}
