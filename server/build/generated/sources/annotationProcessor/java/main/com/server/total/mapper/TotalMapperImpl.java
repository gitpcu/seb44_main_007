package com.server.total.mapper;

import com.server.total.dto.TotalDto;
import com.server.total.entity.Total;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-03T15:41:37+0900",
    comments = "version: 1.5.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11 (Oracle Corporation)"
)
@Component
public class TotalMapperImpl implements TotalMapper {

    @Override
    public Total totalPostDtoToTotal(TotalDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Total total = new Total();

        total.setTotalIncome( requestBody.getTotalIncome() );
        total.setTotalOutcome( requestBody.getTotalOutcome() );
        total.setGoal( requestBody.getGoal() );

        return total;
    }

    @Override
    public Total totalPutDtoToTotal(TotalDto.Put requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Total total = new Total();

        total.setTotalId( requestBody.getTotalId() );
        total.setTotalIncome( requestBody.getTotalIncome() );
        total.setTotalOutcome( requestBody.getTotalOutcome() );
        total.setGoal( requestBody.getGoal() );

        return total;
    }

    @Override
    public TotalDto.Response totalToResponseDto(Total total) {
        if ( total == null ) {
            return null;
        }

        TotalDto.Response.ResponseBuilder response = TotalDto.Response.builder();

        response.totalId( total.getTotalId() );
        response.totalIncome( total.getTotalIncome() );
        response.totalOutcome( total.getTotalOutcome() );
        response.goal( total.getGoal() );

        return response.build();
    }

    @Override
    public List<TotalDto.Response> totalsToResponseDtos(List<Total> totalList) {
        if ( totalList == null ) {
            return null;
        }

        List<TotalDto.Response> list = new ArrayList<TotalDto.Response>( totalList.size() );
        for ( Total total : totalList ) {
            list.add( totalToResponseDto( total ) );
        }

        return list;
    }
}
