package Parser;

import Games.HexDir;
import Games.Strategy;
import Parser.AST.*;
import Parser.Exceptions.SyntaxError;

import java.util.*;

public class LL1StrategyParser implements Parser<Strategy>
{
	private static final Map<String, HexDir> DIR_WORDS_MAP = new HashMap<>();


	StrategyTokenizer tkz;

	public LL1StrategyParser(StrategyTokenizer tkz)
	{
		if (DIR_WORDS_MAP.isEmpty()) populateDIR_WORDS();
		this.tkz = tkz;
	}

	private void populateDIR_WORDS()
	{
		DIR_WORDS_MAP.put("up",HexDir.up);
		DIR_WORDS_MAP.put("upright",HexDir.upRight);
		DIR_WORDS_MAP.put("downright",HexDir.downRight);
		DIR_WORDS_MAP.put("down",HexDir.down);
		DIR_WORDS_MAP.put("downleft",HexDir.downLeft);
		DIR_WORDS_MAP.put("upleft",HexDir.upLeft);
	}

	@Override
	public Strategy parse() throws SyntaxError
	{
		if (!tkz.hasNextToken()) throw new SyntaxError("Empty Strategy");
		return parseStrategy();
	}

	private Strategy parseStrategy() throws SyntaxError
	{
		List<Stment> stments = new ArrayList<>();
		while (tkz.hasNextToken())
		{
			stments.add(parstStment());
		}

		return new Strategy(stments);
	}

	private Stment parstStment() throws SyntaxError
	{
		if (tkz.peek("if"))
		{
			return parseIf();
		}
		else if (tkz.peek("while"))
		{
			return parseWhile();
		}
		else if (tkz.peek("{"))
		{
			return parseStmentBk();
		}
		else
		{
			return parseCommand();
		}
	}

	private Stment parseCommand() throws SyntaxError
	{
		if (isIdentifier(tkz.peek()))
		{
			return parseAssign();
		}
		else
		{
			return parseAction();
		}
	}

	private Stment parseAssign() throws SyntaxError
	{
		String name = tkz.consume();
		tkz.consume("=");
		Expr val = parseE();
		return new Assign(name,val);
	}

	private Stment parseAction() throws SyntaxError
	{
		if (tkz.peek("done"))
		{
			tkz.consume("done");
			return new Done();
		}
		else if (tkz.peek("move"))
		{
			return parseMove();
		}
		else if (tkz.peek("shoot"))
		{
			return parseShoot();
		}

		throw new SyntaxError("invalid statement");
	}

	private Stment parseMove() throws SyntaxError
	{
		tkz.consume("move");
		HexDir dir = parseDir();
		return new Move(dir);
	}

	private Stment parseShoot() throws SyntaxError
	{
		tkz.consume("shoot");
		HexDir dir = parseDir();
		Expr cost = parseE();
		return new Shoot(dir,cost);
	}

	private Stment parseStmentBk() throws SyntaxError
	{
		tkz.consume("{");
		List<Stment> stments = new ArrayList<>();
		while (!tkz.peek("}"))
		{
			stments.add(parstStment());
		}
		tkz.consume("}");
		return new StmentBk(stments);
	}

	private Stment parseIf() throws SyntaxError
	{
		tkz.consume("if");
		tkz.consume("(");
		Expr cond = parseE();
		tkz.consume(")");
		tkz.consume("then");
		Stment then_ = parstStment();
		tkz.consume("else");
		Stment else_ = parstStment();

		return new AST_If(cond,then_,else_);
	}

	private Stment parseWhile() throws SyntaxError
	{
		tkz.consume("while");
		tkz.consume("(");
		Expr cond = parseE();
		tkz.consume(")");
		Stment body = parstStment();
		return new AST_While(cond, body);
	}

	private Expr parseE() throws SyntaxError
	{
		Expr v = parseT();
		while (tkz.peek("+") ||
			tkz.peek("-"))
		{
			if (tkz.peek("+"))
			{
				tkz.consume();
				v = new Add(v,parseT());
			}
			else if (tkz.peek("-"))
			{
				tkz.consume();
				v = new Sub(v,parseT());
			}
		}
		return v;
	}

	private Expr parseT() throws SyntaxError
	{
		Expr v = parseF();
		while (tkz.peek("*") ||
			tkz.peek("/") ||
			tkz.peek("%"))
		{
			if (tkz.peek("*"))
			{
				tkz.consume();
				v = new Mul(v,parseF());
			}
			else if (tkz.peek("/"))
			{
				tkz.consume();
				v = new Div(v,parseF());
			}
			else if (tkz.peek("%"))
			{
				tkz.consume();
				v = new Mod(v,parseF());
			}
		}
		return v;
	}

	private Expr parseF() throws SyntaxError
	{
		Expr v = parseP();
		while (tkz.peek("^"))
		{
			tkz.consume();
			v = new Pow(parseF(),v);
		}
		return v;
	}

	private Expr parseP() throws SyntaxError
	{
		if (tkz.peek().matches("\\d+")) return new Num(Integer.parseInt(tkz.consume()));
		else if (isIdentifier(tkz.peek())) return new Var(tkz.consume());
		else if (tkz.peek("("))
		{
			tkz.consume("(");
			Expr v = parseE();
			tkz.consume(")");
			return v;
		}
		else
		{
			return parseInfo();
		}
	}

	private Expr parseInfo() throws SyntaxError
	{
		if (tkz.peek("ally"))
		{
			tkz.consume("ally");
			return new Ally();
		}
		else if (tkz.peek("opponent"))
		{
			tkz.consume("opponent");
			return new Oppo();
		}
		else if (tkz.peek("nearby"))
		{
			tkz.consume("nearby");
			HexDir dir = parseDir();
			return new Near(dir);
		}
		throw new SyntaxError("invalid expression");
	}

	private HexDir parseDir() throws SyntaxError
	{
		String token = tkz.consume();
		if (!DIR_WORDS_MAP.containsKey(token)) throw new SyntaxError("invalid direction");
		return DIR_WORDS_MAP.get(token);
	}

	private boolean isIdentifier(String s)
	{
		return Character.isAlphabetic(s.toCharArray()[0]) && Arrays.stream(Strategy.RESERVE_WORDS).noneMatch((key) -> key.equals(s));
	}



}
