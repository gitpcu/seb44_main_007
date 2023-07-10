package com.server.trade.service;

import com.server.advice.BusinessLogicException;
import com.server.advice.ExceptionCode;
import com.server.auth.jwt.JwtTokenizer;
import com.server.member.entity.Member;
import com.server.member.repository.MemberRepository;
import com.server.trade.entity.Trade;
import com.server.trade.repository.TradeRepository;
import com.server.utils.CustomBeanUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;




@Service
@Transactional
public class TradeService {
    private final TradeRepository tradeRepository;
    private final MemberRepository memberRepository;
    private final CustomBeanUtils<Trade> beanUtils;
    private final JwtTokenizer jwtTokenizer;


    public TradeService(TradeRepository tradeRepository, MemberRepository memberRepository, CustomBeanUtils<Trade> beanUtils, JwtTokenizer jwtTokenizer) {
        this.tradeRepository = tradeRepository;
        this.memberRepository = memberRepository;
        this.beanUtils = beanUtils;
        this.jwtTokenizer = jwtTokenizer;
    }

//    public Trade createTrade(Trade trade) { //임보크에러가 떠서 수정중인코드
//        return tradeRepository.save(trade);
//    }


    public Trade createTrade(String token, Trade trade) {

        Jws<Claims> claims = jwtTokenizer.getClaims(token, jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()));
        Claims claims1 = claims.getBody();
        String email = (String) claims1.get("username");
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        trade.setMember(member);
        try{return tradeRepository.save(trade);}
        catch (Exception e) {
            Throwable cause = e.getCause();
            if (cause != null) {
                System.out.println("Cause: " + cause.getMessage());
                System.out.println(e.getMessage());
            }
        }
        return tradeRepository.save(trade);
    }


    public Trade updateTrade(String token, Trade trade) {
        Jws<Claims> claims = jwtTokenizer.getClaims(token, jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()));
        Claims claims1 = claims.getBody();
        String email = (String) claims1.get("username");
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        trade.setMember(member);

        Trade findTrade = findTrade(trade.getTradeId());
        setTradeInfo(findTrade, trade);

        try {
            return tradeRepository.save(findTrade);
        }
        catch (Exception e) {
            Throwable cause = e.getCause();
            if (cause != null) {
                System.out.println("Cause: " + cause.getMessage());
                System.out.println(e.getMessage());
            }
        }
        return tradeRepository.save(findTrade);
    }

    private void setTradeInfo(Trade findTrade, Trade trade) {
        Optional.ofNullable(trade.getType())
                .ifPresent(type -> findTrade.setType(type));
        Optional.ofNullable(trade.getTradeName())
                .ifPresent(tradeName -> findTrade.setTradeName(tradeName));
        Optional.ofNullable(trade.getAmount())
                .ifPresent(amount -> findTrade.setAmount(amount));
        Optional.ofNullable(trade.getNote())
                .ifPresent(note -> findTrade.setNote(note));
        Optional.ofNullable(trade.getDate())
                .ifPresent(date -> findTrade.setDate(date));
        Optional.ofNullable(trade.getCategory())
                .ifPresent(category -> findTrade.setCategory(category));
    }

    @Transactional(readOnly = true)
    public Trade findTrade(long tradeId) {
        Trade findTrade = tradeRepository.findById(tradeId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.TRADE_NOT_FOUND));
        return findTrade;
    }


    @Transactional(readOnly = true)
    public Page<Trade> findTradesByDateRange(String token, LocalDate startDate, LocalDate endDate, Pageable pageable) {
        try {
            Jws<Claims> claims = jwtTokenizer.getClaims(token, jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()));
            Claims claims1 = claims.getBody();
            String email = (String) claims1.get("username");
            Member member = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

            System.out.println("==================왜안될까1===========");
            return tradeRepository.findByDateBetween(startDate, endDate, pageable);
        } catch (Exception e) {
            Throwable cause = e.getCause();
            if (cause != null) {
                System.out.println("Cause: " + cause.getMessage());
                System.out.println(e.getMessage());
                System.out.println("==================왜안될까2===========");
            }
            System.out.println("==================왜안될까3===========");
            throw new BusinessLogicException(ExceptionCode.TRADE_NOT_FOUND);
        }
    }

    public void deleteTrade(long tradeId){
        tradeRepository.deleteById(tradeId);
    }




}
