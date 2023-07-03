package com.server.fixed.mapper;

import com.server.fixed.dto.FixedDto.Post;
import com.server.fixed.dto.FixedDto.Put;
import com.server.fixed.dto.FixedDto.Response;
import com.server.fixed.dto.FixedDto.Response.ResponseBuilder;
import com.server.fixed.entity.Fixed;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-03T08:11:07+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11 (Oracle Corporation)"
)
@Component
public class FixedMapperImpl implements FixedMapper {

    @Override
    public Fixed fixedPostDtoToFixed(Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Fixed fixed = new Fixed();

        fixed.setDate( requestBody.getDate() );
        fixed.setFixedName( requestBody.getFixedName() );
        fixed.setType( requestBody.getType() );
        fixed.setAmount( requestBody.getAmount() );
        fixed.setNote( requestBody.getNote() );
        fixed.setCategory( requestBody.getCategory() );

        return fixed;
    }

    @Override
    public Fixed fixedPutDtoToFixed(Put requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Fixed fixed = new Fixed();

        fixed.setDate( requestBody.getDate() );
        fixed.setFixedId( requestBody.getFixedId() );
        fixed.setFixedName( requestBody.getFixedName() );
        fixed.setType( requestBody.getType() );
        fixed.setAmount( requestBody.getAmount() );
        fixed.setNote( requestBody.getNote() );
        fixed.setCategory( requestBody.getCategory() );

        return fixed;
    }

    @Override
    public Response fixedToResponseDto(Fixed fixed) {
        if ( fixed == null ) {
            return null;
        }

        ResponseBuilder response = Response.builder();

        response.fixedId( fixed.getFixedId() );
        response.type( fixed.getType() );
        response.fixedName( fixed.getFixedName() );
        response.amount( fixed.getAmount() );
        response.note( fixed.getNote() );
        response.date( fixed.getDate() );
        response.category( fixed.getCategory() );

        return response.build();
    }

    @Override
    public List<Response> fixedsToResponseDtos(List<Fixed> fixedList) {
        if ( fixedList == null ) {
            return null;
        }

        List<Response> list = new ArrayList<Response>( fixedList.size() );
        for ( Fixed fixed : fixedList ) {
            list.add( fixedToResponseDto( fixed ) );
        }

        return list;
    }
}
