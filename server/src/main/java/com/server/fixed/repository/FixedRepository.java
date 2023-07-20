package com.server.fixed.repository;


import com.server.fixed.entity.Fixed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FixedRepository extends JpaRepository<Fixed, Long> {
}