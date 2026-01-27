>[!abstract] This page is specifically for Designing AST

>[!info] Callout to Gramma
>![[Minion Gramma]]

The **Key** is that nodes in AST are action. 
Leaf would be `<number>`, `<identifier>` and some of reserve keywords. 
Internal node would be some of the reserve keyword.

With this, we can narrow the nods to only those reserved keyword, `<number>` and`<identifier>`

This would be the leaf node
`<number>, <identifier>, <direction>`([[HexDir]])`, ally, opponent, done`

This would be internal node
`Assignment(=), Operators(+,-,*,/,%,^), move, shoot, if-else, while, nearby`

Wait, no this wouldn't be right. I feel like we should abstract the node by its functionality
We can leave the data alone(the leaf node are fine) we should focus on the functionality of the node.
here's what I see
- `move`,`shoot` is `Action`
- `if-else`,`While` is `Control`
- `ally`,`opponent`,`nearby` is `Info`

But each of them does difference, my faith in modularity says to make them all the node.
Lets look at how each node work.

after designing some node, I realize that nods above are not very useful
### Operator
- Binary operation between number
- Have 6 types
	- +
	- -
	- *
	- /
	- %
	- ^
- have 2 children, left `Expr` and right `Expr`
### Assignment
- Binary operator "=", assigning a value into binding map
- have 2 children, left `Var` and right `Expr`
### Moving
- Move in direction `Dir`
### Attacking
- Attack in direction `Dir` with damage `Expr`
### Done
- Terminate the strategy
### Info
- Look for opponent in [[HexMap]]
- Have 3 difference type
	- `ally`
	- `opponent`
	- `nearby`
		- Look for minion closest in the given `Dir`

### If
- if (`Expr`) then `Statement` else `Statement`
- have 3 children - Condition `Expr`, then `Statement` and else `Statement`
### While
- while (`Expr`) `Statement`
- have 2 children - Condition `Expr` and `Statement`
- Condition will runs for 10000 times

### Statement
- actually.. 

Actually, I need to write the damn thing down!

Yuppers, I did it.

![[Pasted image 20260127174309.png]]

This conclude all of our nodes
- [[Strategy]]
	- [[Stment]]
		- [[StmentBk]]
		- [[Assign]]
		- [[Move]]
		- [[Shoot]]
		- [[Done]]
		- [[While]]
		- [[If]]
	- [[Expr]]
		- [[Add]]
		- [[Sub]]
		- [[Mul]]
		- [[Div]]
		- [[Mod]]
		- [[Pow]]
		- [[Num]]
		- [[Var]]
		- [[Oppo]]
		- [[Ally]]
		- [[Near]]
		- [[Rand]]
