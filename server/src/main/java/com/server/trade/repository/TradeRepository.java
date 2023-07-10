package com.server.trade.repository;

import com.server.trade.entity.Trade;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface TradeRepository extends JpaRepository<Trade, Long> {

//    @Query(value = "select distinct o from Trade o " +
//            " join fetch o.orderItems oi " +
//            " join fetch oi.item i " +
//            "where o.memberId = :memberId " +
//            "and o.createdDate between :startDate and :endDate", countQuery = "select count(o) from Order o")
    Page<Trade> findByDateBetween(LocalDate startDate, LocalDate endDate, Pageable pageable);

}
