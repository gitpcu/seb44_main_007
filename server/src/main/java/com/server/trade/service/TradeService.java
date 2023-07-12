package com.server.trade.service;

import com.server.advice.BusinessLogicException;
import com.server.advice.ExceptionCode;
import com.server.member.service.MemberService;
import com.server.trade.entity.Trade;
import com.server.trade.repository.TradeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;




@Service
@Transactional
public class TradeService {
    private final TradeRepository tradeRepository;
    private final MemberService memberService;

    public TradeService(TradeRepository tradeRepository, MemberService memberService) {
        this.tradeRepository = tradeRepository;
        this.memberService = memberService;
    }

    public Trade createTrade(Trade trade) {
       return tradeRepository.save(trade);
    }


    public Trade updateTrade(Trade trade) {
        Trade findTrade = findDistinctTradeId(trade.getTradeId());

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

        return tradeRepository.save(findTrade);
    }

    @Transactional(readOnly = true)
   public Trade findTrade(long tradeId) {
        Trade findTrade = tradeRepository.findById(tradeId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.TRADE_NOT_FOUND));
        return findTrade;
   }


    public List<Trade> findTrades(LocalDate startDate, LocalDate endDate) {
        return tradeRepository.findByDateBetween(startDate, endDate);
    }


    public void deleteTrade(Long tradeId) {
        Trade trade = findTrade(tradeId);
        tradeRepository.delete(trade);
    }


    public Trade findDistinctTradeId(long tradeId) {
        Optional<Trade> optionalTrade = tradeRepository.findById(tradeId);
        Trade trade = optionalTrade.orElseThrow(() -> new BusinessLogicException(ExceptionCode.TRADE_NOT_FOUND));
        return trade;
    }





}
