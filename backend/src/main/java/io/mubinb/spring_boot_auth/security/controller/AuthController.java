package io.mubinb.spring_boot_auth.security.controller;

import io.mubinb.spring_boot_auth.security.dto.AuthenticationRequest;
import io.mubinb.spring_boot_auth.security.dto.AuthenticationResponse;
import io.mubinb.spring_boot_auth.security.repository.UserRepository;
import io.mubinb.spring_boot_auth.security.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;


    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow();
        var jwt = jwtService.generateToken(user);
        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }
}
