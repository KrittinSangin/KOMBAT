A parser for reading [[Configuration File]].
This class sole purpose is to create [[Config]] object from [[Configuration File]]. 
Can be implement easily with pattern matching.

```mermaid
classDiagram
Engine *-- ConfigReader
class ConfigReader{
	Config ReadConfigurationFile(File file)
}
```
[[Configuration File]]
[[Config]]
