package com.server.total;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TotalRepository extends JpaRepository<Total, Long> {
}
