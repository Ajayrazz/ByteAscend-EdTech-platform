package com.byteascend.dsaservice.controller;

import com.byteascend.dsaservice.service.PotdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dsa/potd")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PotdController {

    @Autowired
    private PotdService potdService;

    @GetMapping
    public ResponseEntity<?> getPotd() {
        Map<String, Object> potd = potdService.getProblemOfTheDay();
        if (potd != null) {
            return ResponseEntity.ok(potd);
        }
        return ResponseEntity.notFound().build();
    }
}
