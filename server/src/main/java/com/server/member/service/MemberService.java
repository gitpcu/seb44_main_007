package com.server.member.service;


import com.server.advice.BusinessLogicException;
import com.server.advice.ExceptionCode;
import com.server.auth.CustomAuthorityUtils;
import com.server.member.entity.Member;
import com.server.member.repository.MemberRepository;
import com.server.utils.CustomBeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final CustomBeanUtils<Member> beanUtils;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;


    public MemberService(MemberRepository memberRepository, CustomBeanUtils<Member> beanUtils, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.beanUtils = beanUtils;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    public Member createMember(Member member) {
        // 기존 메일 여부 확인
        Optional<Member> findMemberOptional = memberRepository.findByEmail(member.getEmail());
        if (findMemberOptional.isPresent()) {
            throw new RuntimeException(member.getEmail() + "은 이미 존재하는 이메일입니다.");
        }

        // 비밀번호 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);
        member.setRoles(authorityUtils.createRoles(member.getEmail()));
        return memberRepository.save(member);
    }

//    public Member createMember(Member member) {
//        // 기존 메일 여부 확인
//        Member findMember = memberRepository.findByEmail(member.getEmail());
//        Member.checkExistEmail(findMember);
//
//        //비밀번호 암호화
//        member.setPassword(passwordEncoder.encode(member.getPassword()));
//        //
//
//
//        return memberRepository.save(member);
//    }

    public Member updateMember(Member member) {
        Member findMember = findMember(member.getMemberId());

        return memberRepository.save(member);
    }

    public Member updateMemberPassword(long memberId, String currentPwd, String newPwd) {
        Member findMember = memberRepository.findById(memberId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        if(!passwordEncoder.matches(currentPwd, findMember.getPassword()))
            throw new BusinessLogicException(ExceptionCode.PASSWORD_INCORRECT);

        findMember.setPassword(passwordEncoder.encode(newPwd));
        return memberRepository.save(findMember);
    }


    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
        Member findMember = memberRepository.findById(memberId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    @Transactional(readOnly = true)
    public Page<Member> findMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size, Sort.by("memberId").descending()));
    }

    public void deleteMember (long memberId) {
        Member findMember = findMember(memberId);
        findMember.setMemberStatus(Member.MemberStatus.MEMBER_WITHDRAW);
    }
}
