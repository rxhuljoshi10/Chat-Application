package com.chat.app.Controller;

import com.chat.app.Model.ChatModel;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public ChatModel sendMessage(@Payload ChatModel message) {  // ✅ Ensure payload is read properly
        System.out.println("Received message from: " + message.getSender()); // ✅ Debugging output
        return message;
    }
}
