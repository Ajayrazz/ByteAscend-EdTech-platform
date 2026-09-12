package com.byteascend.lmsservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "lessons")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = false)
    @JsonIgnore
    private Module module;

    @Column(nullable = false)
    private String title;

    @Column(name = "youtube_embed_id", length = 100)
    private String youtubeEmbedId;

    @Column(name = "article_markdown", columnDefinition = "TEXT")
    private String articleMarkdown;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;

    @Column(name = "is_free_preview")
    @Builder.Default
    private Boolean isFreePreview = false;
}
