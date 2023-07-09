package com.server.trade.repository;

import com.server.trade.entity.Trade;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface TradeRepository extends JpaRepository<Trade, Long> {
    Page<Trade> findByDateBetween(LocalDate startDate, LocalDate endDate, Pageable pageable);

}
