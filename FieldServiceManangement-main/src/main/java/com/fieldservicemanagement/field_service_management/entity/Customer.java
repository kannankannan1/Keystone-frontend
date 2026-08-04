package com.fieldservicemanagement.field_service_management.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "customer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "contact_name")
    private String contactName;

    @Column(unique = true)
    private String email;

    private String phone;

    private String address;

    @OneToMany(mappedBy = "customer")
    private List<Site> sites;

    @OneToMany(mappedBy = "customer")
    private List<WorkOrder> workOrders;
}