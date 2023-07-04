package com.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity //모든요청에 권한을 확인하게되기
public class AuthenticationConfig {
}
