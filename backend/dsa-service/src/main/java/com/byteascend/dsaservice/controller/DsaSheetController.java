package com.byteascend.dsaservice.controller;

import com.byteascend.dsaservice.model.DsaSheetDay;
import com.byteascend.dsaservice.repository.DsaSheetDayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dsa/sheet")
@org.springframework.web.bind.annotation.CrossOrigin(origins = "*")
public class DsaSheetController {

    private final DsaSheetDayRepository dsaSheetDayRepository;
    private final com.byteascend.dsaservice.repository.DsaSheetProblemRepository dsaSheetProblemRepository;

    @Autowired
    public DsaSheetController(DsaSheetDayRepository dsaSheetDayRepository, com.byteascend.dsaservice.repository.DsaSheetProblemRepository dsaSheetProblemRepository) {
        this.dsaSheetDayRepository = dsaSheetDayRepository;
        this.dsaSheetProblemRepository = dsaSheetProblemRepository;
    }

    @GetMapping("/days")
    public ResponseEntity<List<DsaSheetDay>> getAllDays() {
        List<DsaSheetDay> days = dsaSheetDayRepository.findAllByOrderByOrderNumAsc();
        return ResponseEntity.ok(days);
    }

    @GetMapping("/problems/{id}")
    public ResponseEntity<com.byteascend.dsaservice.model.DsaSheetProblem> getProblemById(@org.springframework.web.bind.annotation.PathVariable java.util.UUID id) {
        return dsaSheetProblemRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
