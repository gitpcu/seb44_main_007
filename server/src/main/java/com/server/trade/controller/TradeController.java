package com.server.trade.controller;

import com.server.dto.ResponseDto;
import com.server.member.repository.MemberRepository;
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
//    private CustomUserDetailsService userDetailsService;
    private MemberRepository memberRepository;
    private TradeMapper mapper;

    public TradeController(TradeService tradeService, TradeMapper mapper) {
        this.tradeService = tradeService;
        this.mapper = mapper;
    }


    @PostMapping //태양님과 고친 코드
    public ResponseEntity postTrade(@RequestHeader("Authorization") String tokenHeader, @Valid @RequestBody TradeDto.Post requestBody) {
        String token = tokenHeader.replace("Bearer ", "");
        Trade trade = tradeService.createTrade(token, mapper.tradePostDtoToTrade(requestBody));
        URI location = UriCreator.createUri(TRADES_URL, trade.getTradeId());
        return new ResponseEntity<>(TradeDto.Response.response(trade), HttpStatus.CREATED);
    }





//    @PostMapping //임보크에러가 걸리는 인터셉터 구현중인 코드
//    public ResponseEntity postTrade(@RequestHeader("Authorization") String tokenHeader,
//                                    @Valid @RequestBody TradeDto.Post requestBody,
//                                    HttpServletRequest request) {
//        long memberId = (long) request.getAttribute("memberId");
//        requestBody.setMemberId(memberId);
//
//        Trade trade = mapper.tradePostDtoToTrade(requestBody);
//        Trade createdTrade = tradeService.createTrade(trade);
//        URI location = UriCreator.createUri(TRADES_URL, createdTrade.getTradeId());
//        return new ResponseEntity<>(TradeDto.Response.response(createdTrade), HttpStatus.CREATED);
//    }





    @PutMapping("/{tradeId}")
    public ResponseEntity putTrade(@RequestHeader("Authorization") String tokenHeader,
                                   @PathVariable("tradeId") @Positive long tradeId,
                                   @Valid @RequestBody TradeDto.Put requestBody) {
        String token = tokenHeader.replace("Bearer ", "");
        Trade trade = tradeService.updateTrade(token, mapper.tradePutDtoToTrade(requestBody.addTradeId(tradeId)));
        return new ResponseEntity(new ResponseDto.SingleResponseDto<>(mapper.tradeToResponseDto(trade)),
                HttpStatus.OK);
    }

    @GetMapping("/{tradeId}")
    public ResponseEntity getTrade(@RequestHeader("Authorization") String tokenHeader,
                                   @PathVariable("tradeId") @Positive long tradeId) {
        String token = tokenHeader.replace("Bearer ", "");
        Trade trade = tradeService.findTrade(tradeId);
        return new ResponseEntity<>(new ResponseDto.SingleResponseDto<>(TradeDto.Response.response(trade)), HttpStatus.OK);
    }


    @GetMapping //localhost:8080/trades?size=10&page=1&startDate=2023-07-01&endDate=2023-07-07
    public ResponseEntity getTradesByDate(@RequestHeader("Authorization") String tokenHeader,
                                          @Positive @RequestParam(defaultValue = "1") int page,
                                          @Positive @RequestParam(defaultValue = "10") int size,
//                                          @RequestParam(defaultValue = "days") String tab,
                                          @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                          @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        String token = tokenHeader.replace("Bearer ", "");

        Pageable pageable;
        Page<Trade> tradePage;

        pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "date"));

//        if (tab.equals("days")) {
//            pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "date"));
//        } else {
//            throw new IllegalArgumentException("Invalid sort parameter");
//        }

        tradePage = tradeService.findTradesByDateRange(token, startDate, endDate, pageable);
        List<Trade> trades = tradePage.getContent();
        List<TradeDto.ListElement> tradeInfoList = TradeDto.getList(trades);


        return new ResponseEntity<>(new ResponseDto.MultiResponseDto<>(tradeInfoList, tradePage), HttpStatus.OK);
    }



//    @GetMapping //그냥응답
//    public ResponseEntity getTrades(@Positive @RequestParam int page,
//                                  @Positive @RequestParam(defaultValue = "6") int size) {
//        Page<Trade> pageInfo = tradeService.findTrades(page -1, size);
//        List<Trade> trades = pageInfo.getContent();
//        List<TradeDto.ListElement> tradeInfoList = TradeDto.getList(trades);
//        return new ResponseEntity<>(new ResponseDto.MultiResponseDto<>(tradeInfoList, pageInfo), HttpStatus.OK);
//    }

    @DeleteMapping("/{tradeId}")
    public ResponseEntity deleteTag(@PathVariable("tradeId") @Positive Long tradeId) {
        tradeService.deleteTrade(tradeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
















}
