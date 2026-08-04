package com.fieldservicemanagement.field_service_management.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "part_usage")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PartUsage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "unit_cost")
    private Double unitCost;

    private String notes;

    @ManyToOne
    @JoinColumn(name = "work_order_id")
    private WorkOrder workOrder;

    @ManyToOne
    @JoinColumn(name = "part_id")
    private Part part;

    @JsonProperty("workOrderId")
    public Long getWorkOrderId() {
        return workOrder != null ? workOrder.getId() : null;
    }

    @JsonProperty("partId")
    public Long getPartId() {
        return part != null ? part.getId() : null;
    }
}