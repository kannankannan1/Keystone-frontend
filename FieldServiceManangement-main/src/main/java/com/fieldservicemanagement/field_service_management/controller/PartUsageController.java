package com.fieldservicemanagement.field_service_management.controller;

import com.fieldservicemanagement.field_service_management.entity.PartUsage;
import com.fieldservicemanagement.field_service_management.service.PartUsageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/part-usages")
public class PartUsageController {

    private final PartUsageService partUsageService;

    public PartUsageController(PartUsageService partUsageService) {
        this.partUsageService = partUsageService;
    }

    @GetMapping("/work-order/{workOrderId}")
    public ResponseEntity<List<PartUsage>> getByWorkOrderId(@PathVariable Long workOrderId) {
        return ResponseEntity.ok(partUsageService.getByWorkOrderId(workOrderId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PartUsage> getById(@PathVariable Long id) {
        return ResponseEntity.ok(partUsageService.getById(id));
    }

    @PostMapping
    public ResponseEntity<PartUsage> create(@RequestBody PartUsage partUsage) {
        return ResponseEntity.status(org.springframework.http.HttpStatus.CREATED).body(partUsageService.create(partUsage));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PartUsage> update(@PathVariable Long id, @RequestBody PartUsage partUsage) {
        return ResponseEntity.ok(partUsageService.update(id, partUsage));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        partUsageService.delete(id);
        return ResponseEntity.noContent().build();
    }
}