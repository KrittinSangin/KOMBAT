The configuration file contains many parameters that can be adjusted to balance the game.  Each parameter value must be representable in Java's [long data type](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html).

Each parameter specification is of the form \<name\>=\<value\>.  The meanings of parameter names are as follows:
- spawn_cost: the cost of spawning a new minion
- hex_purchase_cost: the cost of purchasing a hex to make it spawnable
- init_budget: the initial budget
- init_hp: the initial HP for a newly spawned minion
- turn_budget: the amount of additional budget for each turn
- max_budget: maximum allowable budget
- interest_pct: interest rate percentage
- max_turns: maximum turns allowed per game
- max_spawns: maximum number of spawns allowed per player per game

The order of names in the configuration file need not follow the list above.

### Sample configuration file
```python
spawn_cost        = 100
hex_purchase_cost = 1000
init_budget       = 10000
init_hp           = 100
turn_budget       = 90
max_budget        = 23456
interest_pct      = 5
max_turns         = 69
max_spawns        = 47
```

# Implementing configuration file
Configuration File data is inside [[Config]] record. This config would be created by [[ConfigReader]] and passed into the [[Game]] at construction.
