package com.fieldservicemanagement.field_service_management.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String email;

    private String role;

    @Column(name = "password_hash")
    private String passwordHash;

    private String phone;

    private String avatar;

    @Column(name = "created_at")
    private java.time.LocalDateTime createdAt;

    @Column(name = "updated_at")
    private java.time.LocalDateTime updatedAt;

    @OneToMany(mappedBy = "assignedTo")
    private List<WorkOrder> assignedWorkOrders;

    @OneToMany(mappedBy = "technician")
    private List<TimeLog> timeLogs;

    @OneToMany(mappedBy = "changedBy")
    private List<WorkOrderStatusHistory> statusHistory;

    public String getName() {
        return firstName + " " + lastName;
    }
}