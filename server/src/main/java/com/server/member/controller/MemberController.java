package com.server.member.controller;

import com.server.dto.ResponseDto;
import com.server.fixed.dto.FixedDto;
import com.server.member.dto.MemberDto;
import com.server.member.entity.Member;
import com.server.member.mapper.MemberMapper;
import com.server.member.service.MemberService;
import com.server.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/members")
@Validated
@Slf4j
@RequiredArgsConstructor
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper memberMapper;





    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = memberMapper.memberPostDtoToMember(requestBody);

        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        return new ResponseEntity<>(MemberDto.Response.response(member), HttpStatus.CREATED);
    }

    @PutMapping ("/{member-id}")
    public ResponseEntity putMember(@PathVariable("member-id") @Positive long memberId,
                                    @Valid @RequestBody MemberDto.Put requestBody) {

        Member member =
                memberService.updateMember(memberMapper.memberPutDtoToMember(requestBody.addMemberId(memberId)));

        return new ResponseEntity<>(
                new ResponseDto.SingleResponseDto<>(memberMapper.memberToMemberResponseDto(member)),
                HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(
            @PathVariable("member-id") @Positive long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(
                new ResponseDto.SingleResponseDto<>(memberMapper.memberToMemberResponseDto(member))
                , HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Member> pageMembers = memberService.findMembers(page - 1, size);
        List<Member> members = pageMembers.getContent();
        return new ResponseEntity<>(
                new ResponseDto.MultiResponseDto<>(memberMapper.membersToMemberResponseDtos(members), pageMembers),
                HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(
            @PathVariable("member-id") @Positive long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}