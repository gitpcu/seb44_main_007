package com.server.trade.mapper;

import com.server.trade.dto.TradeDto.Post;
import com.server.trade.entity.Trade;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-01T10:52:06+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11 (Oracle Corporation)"
)
@Component
public class TradeMapperImpl implements TradeMapper {

    @Override
    public Trade tradePostDtoToTrade(Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Trade trade = new Trade();

        trade.setDate( requestBody.getDate() );
        trade.setType( requestBody.getType() );
        trade.setTradeName( requestBody.getTradeName() );
        trade.setAmount( requestBody.getAmount() );
        trade.setNote( requestBody.getNote() );
        trade.setCategory( requestBody.getCategory() );

        return trade;
    }
}
