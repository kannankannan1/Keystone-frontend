package com.fieldservicemanagement.field_service_management.controller;

import com.fieldservicemanagement.field_service_management.entity.TimeLog;
import com.fieldservicemanagement.field_service_management.entity.WorkOrder;
import com.fieldservicemanagement.field_service_management.repository.WorkOrderRepository;
import com.fieldservicemanagement.field_service_management.service.TimeLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/time-logs")
public class TimeLogController {

    private final TimeLogService timeLogService;
    private final WorkOrderRepository workOrderRepository;

    public TimeLogController(TimeLogService timeLogService, WorkOrderRepository workOrderRepository) {
        this.timeLogService = timeLogService;
        this.workOrderRepository = workOrderRepository;
    }

    @GetMapping("/work-order/{workOrderId}")
    public ResponseEntity<List<TimeLog>> getByWorkOrderId(@PathVariable Long workOrderId) {
        return ResponseEntity.ok(timeLogService.getByWorkOrderId(workOrderId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TimeLog> getById(@PathVariable Long id) {
        return ResponseEntity.ok(timeLogService.getById(id));
    }

    @PostMapping("/work-order/{workOrderId}")
    public ResponseEntity<TimeLog> create(@PathVariable Long workOrderId, @RequestBody TimeLog timeLog) {
        WorkOrder workOrder = workOrderRepository.findById(workOrderId)
                .orElseThrow(() -> new NoSuchElementException("WorkOrder not found with id: " + workOrderId));
        timeLog.setWorkOrder(workOrder);
        return ResponseEntity.status(org.springframework.http.HttpStatus.CREATED).body(timeLogService.create(timeLog));
    }

    @PatchMapping("/{id}/stop")
    public ResponseEntity<TimeLog> stop(@PathVariable Long id) {
        return ResponseEntity.ok(timeLogService.stopTimeLog(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        timeLogService.delete(id);
        return ResponseEntity.noContent().build();
    }
}