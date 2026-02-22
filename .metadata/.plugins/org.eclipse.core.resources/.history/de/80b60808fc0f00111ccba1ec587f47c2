// src/test/java/com/ey/controller/AuthControllerTest.java
package com.ey.controller;

import com.ey.entity.Customer;
import com.ey.entity.UserRole;
import com.ey.enums.Role;
import com.ey.repository.CustomerRepository;
import com.ey.repository.UserRoleRepository;
import com.ey.security.JwtUtil;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false) // ⬅️ disables Spring Security filters for this slice test
class AuthControllerTest {

    @Autowired
    MockMvc mvc;

    @MockBean
    PasswordEncoder passwordEncoder;

    @MockBean
    CustomerRepository customerRepository;

    @MockBean
    UserRoleRepository userRoleRepository;

    @MockBean
    JwtUtil jwtUtil;

    @Test
    void login_ok_returnsRawToken() throws Exception {
        Customer c = new Customer();
        c.setId(1L);
        c.setEmail("user@test.com");
        c.setPassword("hashed");

        Mockito.when(customerRepository.findByEmail("user@test.com"))
                .thenReturn(Optional.of(c));
        Mockito.when(passwordEncoder.matches("pass", "hashed"))
                .thenReturn(true);

        UserRole ur = new UserRole();
        ur.setCustomerId(1L);
        ur.setRoleName(Role.BUYER.name());
        Mockito.when(userRoleRepository.findByCustomerId(1L)).thenReturn(List.of(ur));

        Mockito.when(jwtUtil.generateToken("user@test.com", Role.BUYER.name()))
                .thenReturn("dummy.jwt.token");

        mvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"user@test.com\",\"password\":\"pass\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string("dummy.jwt.token"));
    }

    @Test
    void login_wrongPassword_401() throws Exception {
        Customer c = new Customer();
        c.setId(1L);
        c.setEmail("user@test.com");
        c.setPassword("hashed");

        Mockito.when(customerRepository.findByEmail("user@test.com"))
                .thenReturn(Optional.of(c));
        Mockito.when(passwordEncoder.matches("wrong", "hashed"))
                .thenReturn(false);

        mvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"user@test.com\",\"password\":\"wrong\"}"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void login_unknownEmail_401() throws Exception {
        Mockito.when(customerRepository.findByEmail(anyString()))
                .thenReturn(Optional.empty());

        mvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"nouser@test.com\",\"password\":\"pass\"}"))
                .andExpect(status().isUnauthorized());
    }
}