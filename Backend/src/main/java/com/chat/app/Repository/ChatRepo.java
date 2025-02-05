package com.chat.app.Repository;

import com.chat.app.Model.ChatModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

@Component
public interface ChatRepo extends MongoRepository<ChatModel, String>{
}
