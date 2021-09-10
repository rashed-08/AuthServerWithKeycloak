package com.web.shop.controller;

import com.web.shop.dto.ResponseMessage;
import com.web.shop.model.User;
import com.web.shop.service.KeycloackUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin
public class UserController {

    @Autowired
    private KeycloackUserService userService;

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        Object[] objects = userService.createUser(user);
        int status = (int) objects[0];
        ResponseMessage message = (ResponseMessage) objects[1];
        return ResponseEntity.status(status).body(message);
    }
}
