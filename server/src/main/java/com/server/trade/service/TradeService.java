package com.server.trade.service;

import com.server.trade.entity.Trade;
import com.server.trade.repository.TradeRepository;
import org.springframework.stereotype.Service;

@Service
public class TradeService {
    private final TradeRepository tradeRepository;

    public TradeService(TradeRepository tradeRepository) {
        this.tradeRepository = tradeRepository;
    }

    public Trade createTrade(Trade trade) {
        Trade savedTrade = tradeRepository.save(trade);
        return savedTrade;

    }
}
