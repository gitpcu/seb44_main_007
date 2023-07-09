package com.server.auth.config;


import com.server.auth.CustomAuthorityUtils;
import com.server.auth.Handler.*;
import com.server.auth.filter.JwtAuthenticationFilter;

import com.server.auth.filter.JwtVerificationFilter;
import com.server.auth.jwt.JwtTokenizer;
import com.server.member.repository.MemberRepository;
import com.server.auth.redis.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;


import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils; // 추가
    private final RedisService redisService;
    private final MemberRepository memberRepository;

    @Value("${spring.security.oauth2.client.registration.google.clientId}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.clientSecret}")
    private String clientSecret;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin() // (1)
                .and()
                .csrf().disable()        // (2)
                .cors().configurationSource(corsConfigurationSource()) //3
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()  // (4)
                .httpBasic().disable()   // (5)
                .exceptionHandling()
                .authenticationEntryPoint(new UserAuthenticationEntryPoint())  // (1) 추가
                .accessDeniedHandler(new UserAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
//                .authorizeHttpRequests(authorize -> authorize
////                        .antMatchers(HttpMethod.GET, "/member/**").permitAll()
////                        .antMatchers(HttpMethod.POST, "/member/signup").permitAll()
////                        .antMatchers(HttpMethod.PUT, "/member/edit/**").hasRole("USER")
////                        .antMatchers(HttpMethod.DELETE, "/member/**").hasRole("USER")
//                        .antMatchers(HttpMethod.GET, "/trade/**").hasRole("USER")
//                        .anyRequest().permitAll()
//                )
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll()
                )

                .logout()
                .logoutUrl("/auth/logout")
                .addLogoutHandler(new UserLogoutHandler(redisService, jwtTokenizer))
                .logoutSuccessUrl("/");
//                .and()
//                .oauth2Login(oauth2 -> oauth2
//                        .successHandler(new OAuth2UserSuccessHandler(JwtTokenizer, authorityUtils, userService))
//                );
        return http.build();
    }

    //우리가 구현한 JwtAuthenticationFilter를 등록하는 역할
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {  // (2-2)
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);  // (2-3)

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, redisService);  // (2-4)
            jwtAuthenticationFilter.setFilterProcessesUrl("/login");          // (2-5)
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler());  // (3) 추가
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailtureHandler());  // (4) 추가

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils, redisService, memberRepository);  // (2) 추가

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);// (2-6)
//                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class); // (2)
        }
    }



    public void addCorsMapptings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET","POST", "PATCH", "DELETE","OPTIONS")
                .allowedHeaders("*")
                .exposedHeaders("Authorization");
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE","OPTIONS"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.addExposedHeader("Authorization");

        source.registerCorsConfiguration("/**", configuration);         // 주의 사항: 콘텐츠 표시 오류로 인해 '/**'를 '\/**'로 표기했으니 실제 코드 구현 시에는 '\(역슬래시)'를 빼 주세요.

        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }




}