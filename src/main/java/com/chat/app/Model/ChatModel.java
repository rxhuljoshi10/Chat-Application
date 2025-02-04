package com.chat.app.Model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



public class ChatModel {
    private String sender;
    private String content;

    public ChatModel() {
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
