package com.fieldservicemanagement.field_service_management.controller;

import com.fieldservicemanagement.field_service_management.entity.WorkOrderStatusHistory;
import com.fieldservicemanagement.field_service_management.service.WorkOrderStatusHistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/work-order-status-history")
public class WorkOrderStatusHistoryController {

    private final WorkOrderStatusHistoryService workOrderStatusHistoryService;

    public WorkOrderStatusHistoryController(WorkOrderStatusHistoryService workOrderStatusHistoryService) {
        this.workOrderStatusHistoryService = workOrderStatusHistoryService;
    }

    @GetMapping("/work-order/{workOrderId}")
    public ResponseEntity<List<WorkOrderStatusHistory>> getByWorkOrderId(@PathVariable Long workOrderId) {
        return ResponseEntity.ok(workOrderStatusHistoryService.getByWorkOrderId(workOrderId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkOrderStatusHistory> getById(@PathVariable Long id) {
        return ResponseEntity.ok(workOrderStatusHistoryService.getById(id));
    }

    @PostMapping
    public ResponseEntity<WorkOrderStatusHistory> create(@RequestBody WorkOrderStatusHistory history) {
        return ResponseEntity.status(org.springframework.http.HttpStatus.CREATED).body(workOrderStatusHistoryService.create(history));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        workOrderStatusHistoryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}