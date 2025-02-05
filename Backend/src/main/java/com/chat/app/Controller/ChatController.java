package com.chat.app.Controller;

import com.chat.app.Model.ChatModel;
import com.chat.app.Repository.ChatRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/messages")
public class ChatController {

    @Autowired
    private ChatRepo chatRepo;

    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public ChatModel sendMessage(@Payload ChatModel message) {
        System.out.println("Received message from: " + message.getSender());
        chatRepo.save(message);
        return message;
    }

    @GetMapping
    public List<ChatModel> getAllMessages(){
        return chatRepo.findAll();
    }
}
