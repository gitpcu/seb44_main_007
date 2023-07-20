package com.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity //모든요청에 권한을 확인하게되기
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()            // 토큰으로 인증할거니까
                .csrf().disable()                 // csrf비활성화 추후에 풀어서 토큰 검증시켜야함
                .cors()
                .and()
                .formLogin()                      // 폼로그인방식으로 지정
                .loginPage("/auths/login-form")   // 템플릿페이지로 설정
                .loginProcessingUrl("/process_login")    //로그인 수행할URL 지정
                .failureUrl("/auths/login-form?error")   //로그인실패시 수행할 URl
                .and()                           // 메서드체인
                .logout()                        // LogoutConfigurer를 리턴
                .logoutUrl("/logout")            // 로그아웃URL
                .logoutSuccessUrl("/home")       // 수행후 보여줄 URL
                .and()
                .exceptionHandling().accessDeniedPage("/auths/access-denied")   //권한이 없는데 접근하면 403에러 처리 페이지
                .and()
                .authorizeHttpRequests()  //권한확인 접근허용할지확인할거다!라고 선언, 람다표현식으로 requestURI에 대한 접근권한을 부여
                .antMatchers("/login", "/join").permitAll()          //로그인은 항상 접근가능
                .antMatchers("/orders/**").hasRole("ADMIN")        //룰별로 접근가능한 url지정(orders로시작하는 모든URl접근가능)
                .antMatchers("/members/my-page").hasRole("USER")   //룰별로 접근가능한 url지정
                .antMatchers(HttpMethod.POST,"answers").authenticated() // 예시로 넣어둠. 답글은 인증필요
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //jwt 사용하는경우에 사용
                .and();


        return http.build();

    }



    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }


}
