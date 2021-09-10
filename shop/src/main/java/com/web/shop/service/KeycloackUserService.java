package com.web.shop.service;

import com.web.shop.dto.ResponseMessage;
import com.web.shop.model.User;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Response;
import java.util.Arrays;

@Service
public class KeycloackUserService {

    @Value("${keycloak.auth-server-url}")
    private String serverUrl;
    @Value("${keycloak.realm}")
    private String realm;

    public Object[] createUser(User user) {
        ResponseMessage message = new ResponseMessage();
        int status = 0;
        try {
            UsersResource userResource = getUserResource();
            UserRepresentation userRepresentation = new UserRepresentation();
            userRepresentation.setUsername(user.getUsername());
            userRepresentation.setEmail(user.getEmail());
            userRepresentation.setFirstName(user.getFirstName());
            userRepresentation.setLastName(user.getLastName());
            userRepresentation.setEnabled(true);
            Response result = userResource.create(userRepresentation);
            status = result.getStatus();

            if (status == 201) {
                String path = result.getLocation().getPath();
                String userId = path.substring(path.lastIndexOf("/")+1);
                CredentialRepresentation passwordCredential = new CredentialRepresentation();
                passwordCredential.setTemporary(false);
                passwordCredential.setType(user.getPassword());
                passwordCredential.setValue(user.getPassword());
                userResource.get(userId).resetPassword(passwordCredential);

                RealmResource realmResource = getRealmResource();
                RoleRepresentation roleRepresentation = realmResource.roles().get("realm-user").toRepresentation();
                realmResource.users().get(userId).roles().realmLevel().add(Arrays.asList(roleRepresentation));
                message.setMessage("User created successfully");
            } else if (status == 409) {
                message.setMessage("Username already exist");
            } else {
                message.setMessage("Something is wrong");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new Object[]{status, message};
    }

    private RealmResource getRealmResource() {
        Keycloak keycloak = KeycloakBuilder
                .builder()
                .serverUrl(serverUrl)
                .realm("master")
                .username("admin")
                .password("admin")
                .clientId("admin-cli")
                .resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build()).build();

        return keycloak.realm(realm);
    }

    private UsersResource getUserResource() {
        RealmResource realmResource = getRealmResource();
        return realmResource.users();
    }
}
