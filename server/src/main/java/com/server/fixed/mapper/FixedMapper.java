package com.server.fixed.mapper;

import com.server.fixed.dto.FixedDto;
import com.server.fixed.entity.Fixed;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;


@Mapper(componentModel = "spring")
public interface FixedMapper {
    @Mapping(target = "date", source = "requestBody.date")
    Fixed fixedPostDtoToFixed(FixedDto.Post requestBody);

    @Mapping(target = "date", source = "requestBody.date")
    Fixed fixedPutDtoToFixed(FixedDto.Put requestBody);

    FixedDto.Response fixedToResponseDto(Fixed fixed);
    List<FixedDto.Response> fixedsToResponseDtos(List<Fixed> fixedList);



}