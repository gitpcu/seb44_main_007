package com.server.trade.service;

import com.server.exception.BusinessLogicException;
import com.server.exception.ExceptionCode;
import com.server.trade.entity.Trade;
import com.server.trade.repository.TradeRepository;
import com.server.utils.CustomBeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class TradeService {
    private final TradeRepository tradeRepository;
    private final CustomBeanUtils<Trade> beanUtils;

    public TradeService(TradeRepository tradeRepository, CustomBeanUtils<Trade> beanUtils) {
        this.tradeRepository = tradeRepository;
        this.beanUtils = beanUtils;
    }

    public Trade createTrade(Trade trade) {
        Trade savedTrade = tradeRepository.save(trade);
        return savedTrade;

    }

    public Trade updateTrade(Trade trade) {
        Trade findTrade = findTrade(trade.getTradeId());
        setTradeInfo(findTrade, trade);
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



    public Page<Trade> findTradesByDateRange(LocalDate startDate, LocalDate endDate, Pageable pageable) {
        return tradeRepository.findByDateBetween(startDate, endDate, pageable);
    }

    public void deleteTrade(long tradeId){
        tradeRepository.deleteById(tradeId);
    }




//    @Transactional(readOnly = true) //getMapping
//    public Page<Trade> findTrades(Pageable pageable) {
//        return tradeRepository.findAll(pageable);
//    }
//
//    @Transactional(readOnly = true) //getMapping
//    public Page<Trade> findTrades(int page, int size) {
//        return tradeRepository.findAll(PageRequest.of(page, size, Sort.by("date").descending()));
//    }


}
