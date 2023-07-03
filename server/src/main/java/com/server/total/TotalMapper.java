package com.server.total;

import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TotalMapper {

    Total totalPostDtoToTotal(TotalDto.Post requestBody);
    Total totalPutDtoToTotal(TotalDto.Put requestBody);
    TotalDto.Response totalToResponseDto(Total total);
    List<TotalDto.Response> totalsToResponseDtos(List<Total> totalList);

}
