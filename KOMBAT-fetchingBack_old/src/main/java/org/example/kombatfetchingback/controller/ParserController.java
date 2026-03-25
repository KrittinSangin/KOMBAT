package org.example.kombatfetchingback.controller;

import lombok.RequiredArgsConstructor;
import org.example.kombatfetchingback.kombat_backend.Parser.Exceptions.LexicalError;
import org.example.kombatfetchingback.kombat_backend.Parser.Exceptions.SyntaxError;
import org.example.kombatfetchingback.kombat_backend.Parser.LL1StrategyParser;
import org.example.kombatfetchingback.kombat_backend.Parser.StrategyTokenizer;
import org.example.kombatfetchingback.model.ParseReadyMessage;
import org.example.kombatfetchingback.model.StrategyFileDTO;
import org.example.kombatfetchingback.repository.ReadyOnParse;
import org.example.kombatfetchingback.repository.StrategyRepository;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;



@RestController
@RequestMapping("/parse")
@RequiredArgsConstructor
public class ParserController
{
	private final StrategyRepository strategyRepository;

    @PostMapping("/send")
    public boolean checkCorrect(@RequestBody String message) {
        new ReadyOnParse();
        LL1StrategyParser parser = new LL1StrategyParser(new StrategyTokenizer(message));
        try {
            parser.parse();
        } catch (SyntaxError e) {
            return false;
        } catch (LexicalError | NoSuchElementException s) {
//            IO.println(s.getMessage());
            return false;
        }
           return true;
    }

	@PutMapping("/submit")
	public boolean saveAsAST(@RequestBody StrategyFileDTO dto) {
		LL1StrategyParser parser = new LL1StrategyParser(new StrategyTokenizer(dto.strategy()));
		try {
			strategyRepository.put(dto.name(),parser.parse());
		} catch (RuntimeException e) {
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
