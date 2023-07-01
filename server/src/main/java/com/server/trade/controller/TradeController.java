package com.server.trade.controller;

import com.server.trade.dto.TradeDto;
import com.server.trade.entity.Trade;
import com.server.trade.mapper.TradeMapper;
import com.server.trade.service.TradeService;
import com.server.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;
import java.time.LocalDate;

@RestController
@RequestMapping("trades")
@Validated
public class TradeController {
    private final static String TRADES_URL = "trades";
    private TradeService tradeService;
    private TradeMapper mapper;

    public TradeController(TradeService tradeService, TradeMapper mapper) {
        this.tradeService = tradeService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postTrade(@Valid @RequestBody TradeDto.Post requestBody) {
        Trade trade = tradeService.createTrade(mapper.tradePostDtoToTrade(requestBody));
        URI location = UriCreator.createUri(TRADES_URL, trade.getTradeId());

//        return ResponseEntity.created(location).build();
        return new ResponseEntity<>(TradeDto.Response.response(trade), HttpStatus.CREATED);
    }













}
