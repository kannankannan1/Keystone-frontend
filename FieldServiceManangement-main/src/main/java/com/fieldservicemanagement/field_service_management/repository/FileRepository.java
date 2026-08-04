package com.fieldservicemanagement.field_service_management.repository;

import com.fieldservicemanagement.field_service_management.entity.FileAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileRepository extends JpaRepository<FileAttachment, Long> {
    List<FileAttachment> findByWorkOrderId(Long workOrderId);
    void deleteByWorkOrderId(Long workOrderId);
}