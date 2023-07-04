package com.server.trade.controller;

import com.server.response.MultiResponseDto;
import com.server.response.SingleResponseDto;
import com.server.trade.dto.TradeDto;
import com.server.trade.entity.Trade;
import com.server.trade.mapper.TradeMapper;
import com.server.trade.service.TradeService;
import com.server.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.time.LocalDate;
import java.util.List;


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

    @PatchMapping("/{tradeId}")
    public ResponseEntity patchTrade(@PathVariable("tradeId") @Positive long tradeId,
                                     @Valid @RequestBody TradeDto.Patch requestBody) {
        Trade trade = tradeService.updateTrade(mapper.tradePatchDtoToTrade(requestBody.addTradeId(tradeId)));
        return new ResponseEntity(new SingleResponseDto<>(mapper.tradeToResponseDto(trade)),
                HttpStatus.OK);
    }

    @GetMapping("/{tradeId}")
    public ResponseEntity getTrade(@PathVariable("tradeId") @Positive long tradeId) {
        Trade trade = tradeService.findTrade(tradeId);
        return new ResponseEntity<>(new SingleResponseDto<>(TradeDto.Response.response(trade)), HttpStatus.OK);
    }


    @GetMapping //localhost:8080/trades?size=10&page=1&startDate=2023-07-01&endDate=2023-07-07
    public ResponseEntity<?> getTradesByDate(@Positive @RequestParam(defaultValue = "1") int page,
                                             @Positive @RequestParam(defaultValue = "10") int size,
                                             @RequestParam(defaultValue = "days") String tab,
                                             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        Pageable pageable;
        Page<Trade> tradePage;

        if (tab.equals("days")) {
            pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "date"));
        } else {
            throw new IllegalArgumentException("Invalid sort parameter");
        }

        tradePage = tradeService.findTradesByDateRange(startDate, endDate, pageable);
        List<Trade> trades = tradePage.getContent();
        List<TradeDto.ListElement> tradeInfoList = TradeDto.getList(trades);

        return new ResponseEntity<>(new MultiResponseDto<>(tradeInfoList, tradePage), HttpStatus.OK);
    }



//    @GetMapping //그냥응답
//    public ResponseEntity getTrades(@Positive @RequestParam int page,
//                                  @Positive @RequestParam(defaultValue = "6") int size) {
//        Page<Trade> pageInfo = tradeService.findTrades(page -1, size);
//        List<Trade> trades = pageInfo.getContent();
//        List<TradeDto.ListElement> tradeInfoList = TradeDto.getList(trades);
//        return new ResponseEntity<>(new MultiResponseDto<>(tradeInfoList, pageInfo), HttpStatus.OK);
//    }

    @DeleteMapping("/{tradeId}")
    public ResponseEntity deleteTag(@PathVariable("tradeId") @Positive Long tradeId) {
        tradeService.deleteTrade(tradeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
















}
