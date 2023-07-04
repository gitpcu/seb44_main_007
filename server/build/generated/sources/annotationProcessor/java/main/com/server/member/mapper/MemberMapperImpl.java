package com.server.member.mapper;

import com.server.member.dto.MemberDto;
import com.server.member.entity.Member;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-05T00:48:59+0900",
    comments = "version: 1.5.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11.0.18 (Oracle Corporation)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberPostDtoToMember(MemberDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member.MemberBuilder member = Member.builder();

        member.email( requestBody.getEmail() );
        member.password( requestBody.getPassword() );
        member.name( requestBody.getName() );
        member.phoneNumber( requestBody.getPhoneNumber() );

        return member.build();
    }

    @Override
    public Member memberPutDtoToMember(MemberDto.Put requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member.MemberBuilder member = Member.builder();

        member.memberId( requestBody.getMemberId() );
        member.name( requestBody.getName() );
        if ( requestBody.getPhoneNumber() != null ) {
            member.phoneNumber( String.valueOf( requestBody.getPhoneNumber() ) );
        }

        return member.build();
    }

    @Override
    public MemberDto.Response memberToMemberResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }

        long memberId = 0L;
        String name = null;
        String email = null;
        Integer phoneNumber = null;
        String createdAt = null;

        memberId = member.getMemberId();
        name = member.getName();
        email = member.getEmail();
        if ( member.getPhoneNumber() != null ) {
            phoneNumber = Integer.parseInt( member.getPhoneNumber() );
        }
        if ( member.getCreatedAt() != null ) {
            createdAt = DateTimeFormatter.ISO_LOCAL_DATE_TIME.format( member.getCreatedAt() );
        }

        MemberDto.Response response = new MemberDto.Response( memberId, name, email, phoneNumber, createdAt );

        return response;
    }

    @Override
    public List<MemberDto.Response> membersToMemberResponseDtos(List<Member> members) {
        if ( members == null ) {
            return null;
        }

        List<MemberDto.Response> list = new ArrayList<MemberDto.Response>( members.size() );
        for ( Member member : members ) {
            list.add( memberToMemberResponseDto( member ) );
        }

        return list;
    }
}
