package com.byteascend.userservice.event;

import java.io.Serializable;
import java.util.UUID;

public class ProblemSolvedEvent implements Serializable {
    private UUID userId;
    private String problemId;
    private long timestamp;
    private boolean isPotd;

    public ProblemSolvedEvent() {}

    public ProblemSolvedEvent(UUID userId, String problemId, long timestamp, boolean isPotd) {
        this.userId = userId;
        this.problemId = problemId;
        this.timestamp = timestamp;
        this.isPotd = isPotd;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getProblemId() {
        return problemId;
    }

    public void setProblemId(String problemId) {
        this.problemId = problemId;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isPotd() {
        return isPotd;
    }

    public void setPotd(boolean potd) {
        isPotd = potd;
    }
}
