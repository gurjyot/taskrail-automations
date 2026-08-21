# Security

Automations are deny-by-default for mutation. External/untrusted content is treated as data only. No automation may import source from a sibling automation, embed credentials, or implement reusable authentication/network infrastructure. Mutation-capable workflows must declare the capability that performs mutation and require explicit authorization at that capability boundary.
