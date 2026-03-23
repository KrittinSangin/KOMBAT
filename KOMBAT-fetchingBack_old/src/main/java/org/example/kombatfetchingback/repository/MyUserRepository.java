package org.example.kombatfetchingback.repository;

import lombok.Getter;
import org.example.kombatfetchingback.model.UserModel;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Repository
public class MyUserRepository {
    private Map<UUID, UserModel> users = new HashMap<>();
    @Getter
    private int userCount = 0;
  
    public UUID addUser(String username) {
        UserModel userModel = new UserModel(username,UUID.randomUUID());
        users.put(userModel.getUserID(),userModel);
        return userModel.getUserID();
    }

  
    public UserModel getUserByID(UUID id) {
        return users.get(id);
    }


    public void increaseUserCount() {
        userCount++;
    }

  
    public void decreaseUserCount() {
        userCount--;
    }

  

}