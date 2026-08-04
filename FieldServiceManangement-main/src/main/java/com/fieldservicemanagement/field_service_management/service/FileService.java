package com.fieldservicemanagement.field_service_management.service;

import com.fieldservicemanagement.field_service_management.entity.FileAttachment;
import com.fieldservicemanagement.field_service_management.entity.WorkOrder;
import com.fieldservicemanagement.field_service_management.entity.Users;
import com.fieldservicemanagement.field_service_management.repository.FileRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class FileService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${file.base-url}")
    private String baseUrl;

    private final FileRepository fileRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public void initUploadDir() {
        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to initialize upload directory", e);
        }
    }

    public FileAttachment uploadFile(MultipartFile file, Long workOrderId, Users uploadedBy) {
        try {
            String originalFileName = file.getOriginalFilename();
            String fileName = UUID.randomUUID().toString() + "_" + originalFileName;
            String filePath = uploadDir + "/" + fileName;
            String fileUrl = baseUrl + "/files/" + fileName;

            Path targetPath = Paths.get(filePath);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            FileAttachment attachment = FileAttachment.builder()
                    .fileName(fileName)
                    .originalName(originalFileName)
                    .fileType(file.getContentType())
                    .fileSize(file.getSize())
                    .filePath(filePath)
                    .fileUrl(fileUrl)
                    .createdAt(LocalDateTime.now())
                    .build();

            if (workOrderId != null) {
                WorkOrder workOrder = new WorkOrder();
                workOrder.setId(workOrderId);
                attachment.setWorkOrder(workOrder);
            }

            if (uploadedBy != null) {
                attachment.setUploadedBy(uploadedBy);
            }

            return fileRepository.save(attachment);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }

    public List<FileAttachment> getFilesByWorkOrder(Long workOrderId) {
        return fileRepository.findByWorkOrderId(workOrderId);
    }

    public Resource downloadFile(String fileName) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(fileName);
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
            throw new RuntimeException("File not found: " + fileName);
        } catch (MalformedURLException e) {
            throw new RuntimeException("File not found", e);
        }
    }

    public void deleteFile(Long fileId) {
        FileAttachment attachment = fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found with id: " + fileId));
        try {
            Files.deleteIfExists(Paths.get(attachment.getFilePath()));
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file", e);
        }
        fileRepository.delete(attachment);
    }

    public void deleteFilesByWorkOrder(Long workOrderId) {
        List<FileAttachment> files = fileRepository.findByWorkOrderId(workOrderId);
        for (FileAttachment file : files) {
            try {
                Files.deleteIfExists(Paths.get(file.getFilePath()));
            } catch (IOException e) {
                throw new RuntimeException("Failed to delete file", e);
            }
        }
        fileRepository.deleteByWorkOrderId(workOrderId);
    }
}