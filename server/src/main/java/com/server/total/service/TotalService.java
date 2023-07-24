package com.server.total.service;

import com.server.advice.BusinessLogicException;
import com.server.advice.ExceptionCode;
import com.server.total.entity.Total;
import com.server.total.repository.TotalRepository;
import com.server.wishlist.entity.Wishlist;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class TotalService {
    private final TotalRepository totalRepository;

    public TotalService(TotalRepository totalRepository) {
        this.totalRepository = totalRepository;
    }

    public Total createTotal(Total total, Long memberId) {
        total.setMemberId(memberId);
        Total savedTotal = totalRepository.save(total);
        return savedTotal;
    }

    public Total createTotal(BigDecimal goal, Long memberId) {
        Total total = new Total();
        total.setGoal(goal);
        total.setMemberId(memberId);
        return totalRepository.save(total);
    }

    public Total updateTotal(BigDecimal goal, Long memberId) {
        Total findTotal = findVerifiedTotal(memberId);
        findTotal.setGoal(goal);
        return totalRepository.save(findTotal);
    }

    @Transactional(readOnly = true)
    public List<Total> findTotal(Long memberId) {
        return totalRepository.findByMemberId(memberId);
    }

    private Total findVerifiedTotal(Long memberId) {
        return totalRepository.findByMemberId(memberId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TOTAL_NOT_FOUND));
    }


}
