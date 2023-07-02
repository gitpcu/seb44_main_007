package com.server.fixed;

import com.server.exception.BusinessLogicException;
import com.server.exception.ExceptionCode;
import com.server.trade.entity.Trade;
import com.server.utils.CustomBeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FixedService {
    private final FixedRepository fixedRepository;
    private final CustomBeanUtils<Trade> beanUtils;

    public FixedService(FixedRepository fixedRepository, CustomBeanUtils<Trade> beanUtils) {
        this.fixedRepository = fixedRepository;
        this.beanUtils = beanUtils;
    }

    public Fixed createFixed(Fixed fixed) {
        Fixed saveFixed = fixedRepository.save(fixed);
        return saveFixed;
    }


    public Fixed updateFixed(Fixed fixed) {
        Fixed findFixed = findFixed(fixed.getFixedId());
        return fixedRepository.save(findFixed);
    }

    @Transactional(readOnly = true)
    Fixed findFixed(long fixedId) {
        Fixed findFixed = fixedRepository.findById(fixedId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.FIXED_NOT_FOUND));
        return findFixed;
    }



    @Transactional(readOnly = true)
    Page<Fixed> findFixeds(int page, int size) {
        return fixedRepository.findAll(PageRequest.of(page, size, Sort.by("date").descending()));
    } //todo 정렬기준 고려하기

    public void deleteFixed(long fixedId) {
        fixedRepository.deleteById(fixedId);
    }





}