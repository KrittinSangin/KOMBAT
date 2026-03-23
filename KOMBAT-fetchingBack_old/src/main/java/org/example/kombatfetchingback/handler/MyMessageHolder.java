package org.example.kombatfetchingback.handler;



public class MyMessageHolder implements MessageHolder {
    public boolean isSuccess = false;
    public String Message = "";
    public MyMessageHolder(boolean b, String Message) {
        this.isSuccess = b;
        this.Message = Message;
    }
}
