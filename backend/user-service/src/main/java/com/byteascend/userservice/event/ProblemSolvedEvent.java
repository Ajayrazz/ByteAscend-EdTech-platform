package com.byteascend.userservice.event;

import java.io.Serializable;
import java.util.UUID;

public class ProblemSolvedEvent implements Serializable {
    private UUID userId;
    private String problemId;
    private long timestamp;

    public ProblemSolvedEvent() {}

    public ProblemSolvedEvent(UUID userId, String problemId, long timestamp) {
        this.userId = userId;
        this.problemId = problemId;
        this.timestamp = timestamp;
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
}
