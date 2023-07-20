package com.server.total.controller;

import com.server.dto.ResponseDto;
import com.server.total.entity.Total;
import com.server.total.mapper.TotalMapper;
import com.server.total.service.TotalService;
import com.server.total.dto.TotalDto;
import com.server.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("totals")
@Validated
public class TotalController {

    private final static String TOTALS_URL = "totals";
    private final TotalService totalService;
    private final TotalMapper mapper;

    public TotalController(TotalService totalService, TotalMapper mapper) {
        this.totalService = totalService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postTotal(@Valid @RequestBody TotalDto.Post requestBody) {
        Total total = totalService.createTotal(mapper.totalPostDtoToTotal(requestBody));
        URI location = UriCreator.createUri(TOTALS_URL, total.getTotalId());
        return new ResponseEntity<>(TotalDto.Response.response(total), HttpStatus.CREATED);
    }

    @PutMapping("/{memberId}")
    public ResponseEntity putTrade(@PathVariable("memberId") @Positive long memberId,
                                   @Valid @RequestBody TotalDto.Put requestBody) {
        Total total = totalService.updateTotal(mapper.totalPutDtoToTotal(requestBody.addTotalId(memberId)));
        return new ResponseEntity(new ResponseDto.SingleResponseDto<>(mapper.totalToResponseDto(total)),
                HttpStatus.OK);
    }



}
