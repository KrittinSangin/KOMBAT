package org.example.kombatfetchingback.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@AllArgsConstructor
@Getter
@Setter
public class UserModel {
    private String username;
    private UUID userID;
}
