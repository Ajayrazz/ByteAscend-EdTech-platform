package com.byteascend.userservice.security;

import com.byteascend.userservice.model.Role;
import com.byteascend.userservice.model.User;
import com.byteascend.userservice.repository.RoleRepository;
import com.byteascend.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @org.springframework.context.annotation.Lazy
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        
        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = authToken.getPrincipal();
        
        String email = "";
        String name = "";
        String provider = "LOCAL";
        
        if (authToken.getAuthorizedClientRegistrationId().equals("google")) {
            email = oAuth2User.getAttribute("email");
            name = oAuth2User.getAttribute("name");
            provider = "GOOGLE";
        } else if (authToken.getAuthorizedClientRegistrationId().equals("github")) {
            // GitHub might have email as null if private, handle if needed, usually we request 'user:email' scope
            email = oAuth2User.getAttribute("email");
            if (email == null) {
                // fallback if email is missing (for demo purposes)
                email = oAuth2User.getAttribute("login") + "@github.com";
            }
            name = oAuth2User.getAttribute("name");
            if (name == null) {
                name = oAuth2User.getAttribute("login");
            }
            provider = "GITHUB";
        }

        Optional<User> userOptional = userRepository.findByEmail(email);
        User user;
        
        if (userOptional.isPresent()) {
            user = userOptional.get();
            // Update provider if they previously signed up with local, optional logic.
        } else {
            user = new User();
            user.setEmail(email);
            user.setFullName(name);
            user.setProvider(provider);
            // Random password for OAuth users so they can't login via local provider easily
            user.setPasswordHash(passwordEncoder.encode(UUID.randomUUID().toString()));
            
            Set<Role> roles = new HashSet<>();
            Role userRole = roleRepository.findByName("ROLE_FREE")
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
            user.setRoles(roles);
            
            user = userRepository.save(user);
        }

        // Generate JWT
        String token = jwtUtils.generateJwtTokenFromUser(user);

        // Redirect to Frontend
        String frontendRedirectUrl = "http://localhost:3000/oauth2/redirect?token=" + token;
        getRedirectStrategy().sendRedirect(request, response, frontendRedirectUrl);
    }
}
