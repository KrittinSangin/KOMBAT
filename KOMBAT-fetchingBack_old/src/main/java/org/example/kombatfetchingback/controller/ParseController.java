package org.example.kombatfetchingback.controller;

import lombok.RequiredArgsConstructor;
import org.example.kombatfetchingback.kombat_backend.Parser.Exceptions.LexicalError;
import org.example.kombatfetchingback.kombat_backend.Parser.Exceptions.SyntaxError;
import org.example.kombatfetchingback.kombat_backend.Parser.LL1StrategyParser;
import org.example.kombatfetchingback.kombat_backend.Parser.StrategyTokenizer;
import org.example.kombatfetchingback.model.ParseReadyMessage;
import org.example.kombatfetchingback.repository.ReadyOnParse;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;



@RestController
@RequestMapping("/parse")
@RequiredArgsConstructor
public class ParseController {


    @PostMapping("/send")
    public boolean parse(@RequestBody String message) {
        new ReadyOnParse();
        LL1StrategyParser parser = new LL1StrategyParser(new StrategyTokenizer(message));
        try {
            parser.parse();
        } catch (SyntaxError e) {
            return false;
        } catch (LexicalError | NoSuchElementException s) {
            IO.println(s.getMessage());
            return false;
        }
           return true;
    }

    @PostMapping("/ready")
    public boolean ready(@RequestBody ParseReadyMessage message) {
        ReadyOnParse.handleUser(message);
        return true;
    }
    @GetMapping("/check")
    public boolean check() {
        return ReadyOnParse.checkBothReady();
    }
}
