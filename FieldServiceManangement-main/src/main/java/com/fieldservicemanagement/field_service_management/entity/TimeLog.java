package com.fieldservicemanagement.field_service_management.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "time_log")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimeLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer minutes;

    private String note;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    private Integer duration;

    private String description;

    @Column(name = "logged_at")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "work_order_id")
    private WorkOrder workOrder;

    @ManyToOne
    @JoinColumn(name = "technician_id")
    private Users technician;

    @JsonProperty("workOrderId")
    public Long getWorkOrderId() {
        return workOrder != null ? workOrder.getId() : null;
    }

    @JsonProperty("userId")
    public Long getUserId() {
        return technician != null ? technician.getId() : null;
    }
}