package com.ey.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ey.entity.UserRole;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    List<UserRole> findByCustomerId(Long customerId);
}
