package com.server.login;

import com.server.member.service.MemberService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@WebMvcTest
public class MemberControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    MemberService memberService;

    @Test
    @DisplayName("회원가입 성공")
    void join_success() throws Exception {
        // Given
        String email = "abcd@gmail.com";
        String password = "1234";

        mockMvc.perform(post("/members/join")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\": \"abcd@gmail.com\", \"password\": \"1234\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string("회원가입에 성공했습니다."));
    }

//    @Test
//    @DisplayName("회원가입 실패 - email 중복")
//    void join_duplicateEmail() throws Exception {
//        // Given
//        String email = "abcd@gmail.com";
//        String password = "1234";
//
//        // 이메일 중복 상황을 가정하여 이미 동일한 이메일을 가진 회원이 존재한다고 가정합니다.
//        given(memberService.Join(email, password))
//                .willThrow(new RuntimeException(email + "은 이미 존재하는 이메일입니다."));
//
//        // When
//        mockMvc.perform(post("/join")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content("{\"email\": \"abcd@gmail.com\", \"password\": \"1234\"}"))
//                .andExpect(status().isConflict())
//                .andExpect(content().string("회원가입에 실패했습니다."));
//
//         //Then
//         //회원가입 실패에 대한 처리를 확인하는 추가적인 검증 로직을 작성합니다.
//    }



    @Test
    @DisplayName("로그인 성공")
    void login_success() throws Exception {
//        String email = "kim@gmail.com";
//        String password = "1q2w3e";
//
//        when(MemberService.login(any(), any()))
//                .thenReturn("token");
//
//
//        mockMvc.perform(post("member/login")
//                .comtentType(MediaType.APPLICATION_JSON)
//                .content(ObjectMapper.writeValueAsBytes(new UserLoginRequest(userName, password))))
//                .andDo(print())
//                .andExpect(status().isOk());

    }

    @Test
    @DisplayName("로그인 실패 - email 없음")
    void login_fail_1() throws Exception {
//        String email = "kim@gmail.com";
//        String password = "1q2w3e";
//
//        when(MemberService.login(any(), any()))
//                .thenReturn(new BusinessLogicException(ExceptionCode.EMAIL_NOT_FOUND));
//
//
//        mockMvc.perform(post("member/login")
//                        .comtentType(MediaType.APPLICATION_JSON)
//                        .content(ObjectMapper.writeValueAsBytes(new UserLoginRequest(userName, password))))
//                .andDo(print())
//                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("로그인 실패 - 비밀번호 틀림")
    void login_fail_2() throws Exception {

    }



}
