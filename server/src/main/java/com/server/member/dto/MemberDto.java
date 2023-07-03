package com.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.util.Assert;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;


public class MemberDto {

    @Getter
    @AllArgsConstructor
    public static class Post{
        @NotBlank
        @Email
        private String email;

        @NotBlank
        private String password;

        @NotBlank(message = "이름은 공백이 아니어야합니다.")
        private String name;

        @NotBlank
        @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$",
                message = "휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다")
        private Integer phoneNumber;

    }

    @Getter
    @AllArgsConstructor
    public static class Put {

        private long memberId;

        private String name;

        @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$",
                message = "휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다")
        private Integer phoneNumber;

        public Put addMemberId(Long memberId){
            Assert.notNull(memberId, "Member Id must not beNull");
            this.memberId = memberId;
            return this;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class PatchPassword {

        private long memberId;

        @NotBlank
        private String currentPassword;

        @NotBlank
        private String newPassword;

        public PatchPassword addMemberId(Long memberId){
            Assert.notNull(memberId, "Member Id must not beNull");
            this.memberId = memberId;
            return this;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Response{
        private long memberId;
        private String name;
        private String email;
        private Integer phoneNumber;
        private String createdAt;
    }
}
