package org.example.kombatfetchingback.controller;


import lombok.RequiredArgsConstructor;
import org.example.kombatfetchingback.handler.MessageHolder;
import org.example.kombatfetchingback.handler.MyDataHandler;
import org.example.kombatfetchingback.handler.MyMessageHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/data")
@RequiredArgsConstructor
public class DataController {

    private final MyDataHandler dataHandler;



    @PostMapping("/send/{id}")
    public MessageHolder init(@PathVariable String id) {
        return  dataHandler.initializeWebSocket(id);
    }

    @PostMapping("/join")
    public MessageHolder joinTestData(@RequestBody String id) {

//        IO.println("ABALNABAK" + id);
        return dataHandler.handleJoinRequest(id);
    }
    @PostMapping("/config")
    public String configFIle(@RequestBody String config){
        IO.print(config);
        //Post mapping data config returned here! Code: definable
        return "yeah";
    }
}
