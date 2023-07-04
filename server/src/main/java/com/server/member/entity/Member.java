package com.server.member.entity;

import com.server.audit.Auditable;
import com.server.exception.BusinessLogicException;
import com.server.exception.ExceptionCode;
import com.server.fixed.entity.Fixed;
import com.server.total.entity.Total;
import com.server.trade.entity.Trade;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter @Setter
@Entity
public class Member extends Auditable implements Principal {

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
    private Integer phoneNumber;

    @Column
    private String imageURL;

    @Column
    private boolean premium;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
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

    //Constructor

    public Member(long memberId) {this.memberId = memberId;}

    public Member(String email, String password, String name, Integer phoneNumber) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
    }

    //Utility
    public static void checkExistEmail(Member targetMember) {
        if(targetMember != null) throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

}
