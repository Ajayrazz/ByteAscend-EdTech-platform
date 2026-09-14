package com.byteascend.dsaservice.repository;

import com.byteascend.dsaservice.model.DsaSheetDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DsaSheetDayRepository extends JpaRepository<DsaSheetDay, UUID> {
    List<DsaSheetDay> findAllByOrderByOrderNumAsc();
}
