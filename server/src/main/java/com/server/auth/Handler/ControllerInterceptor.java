//package com.server.auth.Handler;
//
//import com.server.auth.jwt.JwtTokenizer;
//import com.server.member.entity.Member;
//import com.server.member.repository.MemberRepository;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jws;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.springframework.web.servlet.HandlerInterceptor;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//@Component
//public class ControllerInterceptor implements HandlerInterceptor {
//
//    @Autowired
//    private JwtTokenizer jwtTokenizer;
//    @Autowired
//    private MemberRepository memberRepository;
//
//    @Override
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        String tokenHeader = request.getHeader("Authorization");
//        if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
//            String token = tokenHeader.replace("Bearer ", "");
//            Jws<Claims> claims = jwtTokenizer.getClaims(token, jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()));
//            Claims body = claims.getBody();
//            String email = (String) body.get("userName");
//            Member member = memberRepository.findByEmail(email).orElse(null);
//
//            if (member != null) {
//                // memberId를 사용하여 필요한 작업 수행
//                long memberId = member.getMemberId();
//                request.setAttribute("memberId", memberId);
//                //이제 컨트롤러에서 request.getAttribute("memberId")를 사용하여 memberId를 가져올 수 있습니다.
//
//                return true; // 계속 진행하도록 true 반환
//            }
//        }
//        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
//        return false; // 요청 중단
//    }
//}