package com.byteascend.dsaservice.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class PotdService {
    private List<Map<String, Object>> allProblems = new ArrayList<>();

    @PostConstruct
    public void init() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            InputStream is = new ClassPathResource("dsa-curriculum.json").getInputStream();
            List<Map<String, Object>> days = mapper.readValue(is, new TypeReference<List<Map<String, Object>>>() {});
            
            for (Map<String, Object> day : days) {
                List<Map<String, Object>> problems = (List<Map<String, Object>>) day.get("problems");
                allProblems.addAll(problems);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Map<String, Object> getProblemOfTheDay() {
        if (allProblems.isEmpty()) return null;
        // Use epoch day to ensure it changes at midnight UTC
        long epochDay = LocalDate.now().toEpochDay();
        int index = (int) (epochDay % allProblems.size());
        return allProblems.get(index);
    }
}
