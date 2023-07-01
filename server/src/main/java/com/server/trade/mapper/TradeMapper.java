package com.server.trade.mapper;

import com.server.trade.dto.TradeDto;
import com.server.trade.entity.Trade;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TradeMapper {
    @Mapping(target = "date", source = "requestBody.date")
    Trade tradePostDtoToTrade(TradeDto.Post requestBody);
//    @Mapping(target = "date", source = "requestBody.date")
//    Trade tradePatchDtoToTrade(TradeDto.Patch requestBody);
//    TradeDto.Response tradeToResponseDto(Trade trade);
//    List<TradeDto.Response> tradesToResponseDtos(List<Trade> trades);
}
