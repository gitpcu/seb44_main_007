package com.server.member.entity;

import com.server.audit.Auditable;
import com.server.advice.BusinessLogicException;
import com.server.advice.ExceptionCode;
import com.server.fixed.entity.Fixed;
import com.server.total.entity.Total;
import com.server.trade.entity.Trade;
import lombok.*;

import javax.persistence.*;
import java.util.*;

import static javax.persistence.CascadeType.ALL;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Entity
@Table(name = "members")
public class Member extends Auditable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;
    //login ID
    @Column(unique = true, nullable = false)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(nullable = false)
    private String phoneNumber;

    @Column
    private String imageURL;

    @Column
    private boolean premium;


    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = true)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Total> totalList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Trade> tradeList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Fixed> fixedList = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)  //시큐리티로 추가
    private List<String> roles = new ArrayList<>();


    public enum MemberStatus {

        MEMBER_ACTIVE ("활동중"),

        MEMBER_SLEEP ("휴먼 계정"),

        MEMBER_WITHDRAW ("계정 탈퇴");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }




    public Member(long memberId) {this.memberId = memberId;}


    //Utility
    public static void checkExistEmail(Member targetMember) {
        if(targetMember != null) throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    public static void isExistEmail(Optional<Member> targetMember) {
        if(targetMember.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    public Member(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }



}
