package com.server.trade.mapper;

import com.server.trade.dto.TradeDto;
import com.server.trade.entity.Trade;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-03T16:14:42+0900",
    comments = "version: 1.5.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11 (Oracle Corporation)"
)
@Component
public class TradeMapperImpl implements TradeMapper {

    @Override
    public Trade tradePostDtoToTrade(TradeDto.Post requestBody) {
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

    @Override
    public Trade tradePutDtoToTrade(TradeDto.Put requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Trade trade = new Trade();

        trade.setDate( requestBody.getDate() );
        trade.setTradeId( requestBody.getTradeId() );
        trade.setType( requestBody.getType() );
        trade.setTradeName( requestBody.getTradeName() );
        trade.setAmount( requestBody.getAmount() );
        trade.setNote( requestBody.getNote() );
        trade.setCategory( requestBody.getCategory() );

        return trade;
    }

    @Override
    public TradeDto.Response tradeToResponseDto(Trade trade) {
        if ( trade == null ) {
            return null;
        }

        TradeDto.Response.ResponseBuilder response = TradeDto.Response.builder();

        response.tradeId( trade.getTradeId() );
        response.type( trade.getType() );
        response.tradeName( trade.getTradeName() );
        response.amount( trade.getAmount() );
        response.note( trade.getNote() );
        response.date( trade.getDate() );
        response.category( trade.getCategory() );

        return response.build();
    }

    @Override
    public List<TradeDto.Response> tradesToResponseDtos(List<Trade> trades) {
        if ( trades == null ) {
            return null;
        }

        List<TradeDto.Response> list = new ArrayList<TradeDto.Response>( trades.size() );
        for ( Trade trade : trades ) {
            list.add( tradeToResponseDto( trade ) );
        }

        return list;
    }
}
