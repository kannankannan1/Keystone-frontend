package com.fieldservicemanagement.field_service_management.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "part")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Part {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String sku;

    @Column(name = "unit_cost")
    private BigDecimal unitCost;

    @Column(name = "stock")
    private Integer stock;

    @OneToMany(mappedBy = "part")
    private List<PartUsage> partUsages;
}