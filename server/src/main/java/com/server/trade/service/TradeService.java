package com.server.trade.service;

import com.server.advice.BusinessLogicException;
import com.server.advice.ExceptionCode;
import com.server.trade.entity.Trade;
import com.server.trade.repository.TradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class TradeService {

    private final TradeRepository tradeRepository;
    public Trade createTrade(Trade trade) {
        return tradeRepository.save(trade);
    }

    public Trade updateTrade (Trade trade, Long memberId) {
        Trade findTrade = findVerifiedTrade(trade.getTradeId());
        if(!findTrade.getMemberId().equals(memberId)){
            throw new BusinessLogicException(ExceptionCode.TRADE_MEMBER_NOT_MATCH);
        }
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
    public Trade findTrade(Long tradeId, Long memberId) {
        Trade trade = findVerifiedTrade(tradeId);
        if (!trade.getMemberId().equals(memberId)) {
            throw new BusinessLogicException(ExceptionCode.TRADE_MEMBER_NOT_MATCH);
        }
        return trade;
    }

    @Transactional(readOnly = true)
    public List<Trade> findTrades(LocalDate startDate, LocalDate endDate, Long memberId) {
        return tradeRepository.findByMemberIdAndDateBetween(memberId, startDate, endDate);
    }

    public void deleteTrade(Long tradeId, Long memberId) {
        Trade findTrade = findVerifiedTrade(tradeId);
        if (!findTrade.getMemberId().equals(memberId)) {
            throw new BusinessLogicException(ExceptionCode.TRADE_MEMBER_NOT_MATCH);
        }
        tradeRepository.delete(findTrade);
    }

    // 해당 거래가 있는지 조회
    private Trade findVerifiedTrade(Long tradeId) {
        Optional<Trade> optionalTrade = tradeRepository.findById(tradeId);
        if(optionalTrade.isEmpty()){
            throw new BusinessLogicException(ExceptionCode.TRADE_NOT_FOUND);
        }
        return optionalTrade.get();
    }

}
