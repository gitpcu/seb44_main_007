package com.server.auth;

import com.server.auth.jwt.JwtTokenizer;
import com.server.auth.redis.RedisService;
import com.server.member.entity.Member;
import com.server.member.repository.MemberRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final RedisService redisService;
    private final MemberRepository memberRepository;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, RedisService redisService, MemberRepository memberRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.redisService = redisService;
        this.memberRepository = memberRepository;
    }



    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("JwtVerificationFilter.doFilterInternal");
        try {
            String refreshToken = request.getHeader("Refresh");
            if (refreshToken == null){
                throw new RuntimeException("not valid : do not have token");
            }
            String username = jwtTokenizer.getName(refreshToken);
            if (redisService.getData(username) == null){
                throw new RuntimeException("not valid : not in DB");
            }
            Map<String, Object> claims = verifyJws(request, response);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            try {
//                request.setAttribute("exception", ee);
                String refreshToken = request.getHeader("Refresh");
                String newAccessToken = null;
                if (isRefreshTokenValid(refreshToken)) {
                    newAccessToken = generateNewAccessToken(refreshToken);
                    response.setHeader("Authorization", "Bearer " + newAccessToken);
                }
                Map<String, Object> claims = jwtTokenizer.getClaims(newAccessToken, jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey())).getBody();
                setAuthenticationToContext(claims);
                filterChain.doFilter(request, response);
                return;
            } catch (ExpiredJwtException ee2) {
                throw new IllegalStateException("token expired");
            }
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }
        filterChain.doFilter(request, response);
    }

    private String generateNewAccessToken(String refreshToken) {
        String username = jwtTokenizer.getName(refreshToken);
        Member member = memberRepository.findByEmail(username).get();

        Map<String, Object> newClaims = new HashMap<>();

        newClaims.put("username", member.getEmail());
        newClaims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.generateAccessToken(newClaims, subject, expiration, base64EncodedSecretKey);
        return accessToken;
    }

    private boolean isRefreshTokenValid(String refreshToken) {
        Jws<Claims> claims = jwtTokenizer.getClaims(refreshToken, jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()));
        if (claims.getBody().getExpiration().before(new Date())){
            return false;
        }
        return true;
    }

    private boolean isTokenExpired(String accessToken) {
        try {
            jwtTokenizer.getClaims(accessToken, jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()));
        } catch (ExpiredJwtException e) {
            return true;
        }
        return false;
    }

    private String extractAccessToken(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }
    private String extractRefreshToken(HttpServletRequest request) {
        return request.getHeader("Refresh");
    }

    private Map<String, Object> verifyJws(HttpServletRequest request, HttpServletResponse response) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("username");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List) claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");  // (6-1)
        return authorization == null || !authorization.startsWith("Bearer ");
    }
}