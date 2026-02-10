package com.ey.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ey.dto.request.LoginRequest;
import com.ey.dto.request.SignupRequest;
import com.ey.entity.Customer;
import com.ey.entity.UserRole;
import com.ey.enums.Role;
import com.ey.repository.CustomerRepository;
import com.ey.repository.UserRoleRepository;
import com.ey.security.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
    private PasswordEncoder passwordEncoder;
	
	@Autowired
    private CustomerRepository customerRepository;
	
	@Autowired
    private UserRoleRepository userRoleRepository;
	
	@Autowired
    private JwtUtil jwtUtil;

    

    @PostMapping("/admin/signup")
    public ResponseEntity<String> signupAdmin(@RequestBody SignupRequest request) {
        return registerUser(request, Role.ADMIN);
    }

    @PostMapping("/buyer/signup")
    public ResponseEntity<String> signupBuyer(@RequestBody SignupRequest request) {
        return registerUser(request, Role.BUYER);
    }

    @PostMapping("/seller/signup")
    public ResponseEntity<String> signupSeller(@RequestBody SignupRequest request) {
        return registerUser(request, Role.SELLER);
    }

    private ResponseEntity<String> registerUser(SignupRequest request, Role role) {

        if (customerRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Email already registered: " + request.getEmail());
        }

        Customer customer = new Customer();
        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setCity(request.getCity());
        customer.setAddress(request.getAddress());
        customer.setPassword(passwordEncoder.encode(request.getPassword())); // hash password
        Customer savedCustomer = customerRepository.save(customer);

        UserRole userRole = new UserRole();
        userRole.setCustomerId(savedCustomer.getId());
        userRole.setRoleName(role.name());
        userRoleRepository.save(userRole);

        String token = jwtUtil.generateToken(savedCustomer.getEmail(), role.name());
        return new ResponseEntity<>(token, HttpStatus.CREATED);
    }

  

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {

        Optional<Customer> customerOpt = customerRepository.findByEmail(request.getEmail());
        if (customerOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        Customer customer = customerOpt.get();

        if (!passwordEncoder.matches(request.getPassword(), customer.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        Optional<UserRole> roleOpt = userRoleRepository.findByCustomerId(customer.getId()).stream().findFirst();
        String role = roleOpt.map(UserRole::getRoleName).orElse(Role.BUYER.name());

        String token = jwtUtil.generateToken(customer.getEmail(), role);
        return ResponseEntity.ok(token);
    }
}
