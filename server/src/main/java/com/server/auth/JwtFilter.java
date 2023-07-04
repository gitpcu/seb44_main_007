package com.server.auth;

import com.server.auth.JwtUtils;
import com.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.http.HttpHeaders;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

    private final MemberService memberService;
    private final String secretKey;


    @Override //jwt가 통과하면서 암호가 열림
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

       final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
       log.info("authorization : {}", authorization); //로그로 확인하게 함

        if(authorization==null || !authorization.startsWith("Bearer ")){
            log.info("authorization 이 없거나 잘못보냈습니다.");
            filterChain.doFilter(request, response);
            return;
        }

        //토큰꺼내기
        String token = authorization.split(" ")[1];
        //expired 되었는지
        if(JwtUtils.isExpired(token, secretKey)) {
            log.info("token 이 만료되었습니다.");
            filterChain.doFilter(request, response);
            return;
        }


        //UserName 토큰에서 꺼내기 추후에 디비에서 꺼내오게
        String userName = JwtUtils.getUserName(token, secretKey);
        log.info("userName:{}",userName);

        //권한부여
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userName, null, List.of(new SimpleGrantedAuthority("USER")));
        //Detail을 넣어준다
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken); //인증 합격도장 꾹 찍기
        filterChain.doFilter(request, response);
    }
}
